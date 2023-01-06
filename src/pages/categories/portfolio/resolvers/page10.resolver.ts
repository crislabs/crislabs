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
  ListPortfolioPage10,
  PortfolioPage10,
  PortfolioPage11,
} from 'src/common/entities/page.model';
import { PortfolioPage10Service } from '../services/page10.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage11Service } from '../services/page11.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage10)
export class PortfolioPage10Resolver {
  constructor(
    private readonly page10Service: PortfolioPage10Service,
    private readonly page11Service: PortfolioPage11Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage10, { name: 'portfolioCreatePage10' })
  createPage(@Args('input') input: CreatePage) {
    return this.page10Service.create(input);
  }

  @Mutation(() => PortfolioPage10, { name: 'portfolioUpdatePage10' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page10Service.update(input);
  }

  @Mutation(() => PortfolioPage10, { name: 'portfolioUpdateImagePage10' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page10Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage10' })
  deletePage(@Args('id') id: string) {
    this.page11Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page10Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages10' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page11Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page10Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages10' })
  deleteAllPages() {
    this.page11Service.deleteAll();
    // this.productService.deleteAll();
    return this.page10Service.deleteAll();
  }

  @Query(() => PortfolioPage10, { name: 'portfolioGetPage10' })
  findPage(@Args('id') id: string) {
    return this.page10Service.findOne(id);
  }

  @Query(() => PortfolioPage10, { name: 'portfolioGetPage10BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page10Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage10], { name: 'portfolioGetPages10' })
  findPages() {
    return this.page10Service.findAll();
  }

  @Query(() => [PortfolioPage10], { name: 'portfolioGetPages10ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page10Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage10], { name: 'portfolioGetPages10BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page10Service.findBySiteId(siteId);
  }

  @Query(() => ListPortfolioPage10, { name: 'portfolioGetPages10WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage10> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page10Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage10) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [PortfolioPage11], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage10) {
    return this.page11Service.findByParentId(_id.toString());
  }
}
