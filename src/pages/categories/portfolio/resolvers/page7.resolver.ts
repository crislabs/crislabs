import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  DataPage,
  ListPortfolioPage7,
  PortfolioPage7,
  PortfolioPage8,
} from 'src/common/entities/page.model';
import { PortfolioPage7Service } from '../services/page7.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage8Service } from '../services/page8.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage7)
export class PortfolioPage7Resolver {
  constructor(
    private readonly page7Service: PortfolioPage7Service,
    private readonly page8Service: PortfolioPage8Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage7, { name: 'portfolioCreatePage7' })
  createPage(@Args('input') input: CreatePage) {
    return this.page7Service.create(input);
  }

  @Mutation(() => PortfolioPage7, { name: 'portfolioUpdatePage7' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page7Service.update(input);
  }

  @Mutation(() => PortfolioPage7, { name: 'portfolioUpdateImagePage7' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page7Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage7' })
  deletePage(@Args('id') id: string) {
    this.page8Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page7Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages7' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page8Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page7Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages7' })
  deleteAllPages() {
    this.page8Service.deleteAll();
    // this.productService.deleteAll();
    return this.page7Service.deleteAll();
  }


  @Query(() => PortfolioPage7, { name: 'portfolioGetPage7' })
  findPage(@Args('id') id: string) {
    return this.page7Service.findOne(id);
  }

  @Query(() => PortfolioPage7, { name: 'portfolioGetPage7BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page7Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage7], { name: 'portfolioGetPages7' })
  findPages() {
    return this.page7Service.findAll();
  }

  @Query(() => [PortfolioPage7], { name: 'portfolioGetPages7ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page7Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage7], { name: 'portfolioGetPages7BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page7Service.findBySiteId(siteId);
  }

  @Query(() => ListPortfolioPage7, { name: 'portfolioGetPages7WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage7> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page7Service.findByCursor(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  // @ResolveField('products', () => [PortfolioProduct], { nullable: 'itemsAndList' })
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage7) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage8], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage7) {
    return this.page8Service.findByParentId(_id.toString());
  }
}
