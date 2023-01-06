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
  ListPortfolioPage3,
  PortfolioPage3,
  PortfolioPage4,
} from 'src/common/entities/page.model';
import { PortfolioPage3Service } from '../services/page3.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage4Service } from '../services/page4.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage3)
export class PortfolioPage3Resolver {
  constructor(
    private readonly page3Service: PortfolioPage3Service,
    private readonly page4Service: PortfolioPage4Service,
    // private readonly productService: PortfolioProductService,
  ) { }

  @Mutation(() => PortfolioPage3, { name: 'portfolioCreatePage3' })
  createPage(@Args('input') input: CreatePage) {
    return this.page3Service.create(input);
  }

  @Mutation(() => PortfolioPage3, { name: 'portfolioUpdatePage3' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page3Service.update(input);
  }

  @Mutation(() => PortfolioPage3, { name: 'portfolioUpdateImagePage3' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page3Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage3' })
  deletePage(@Args('id') id: string) {
    this.page4Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page3Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages3' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page4Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page3Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages3' })
  deleteAllPages() {
    this.page4Service.deleteAll();
    // this.productService.deleteAll();
    return this.page3Service.deleteAll();
  }

  @Query(() => PortfolioPage3, { name: 'portfolioGetPage3' })
  findPage(@Args('id') id: string) {
    return this.page3Service.findOne(id);
  }

  @Query(() => PortfolioPage3, { name: 'portfolioGetPage3BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page3Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage3], { name: 'portfolioGetPages3' })
  findPages() {
    return this.page3Service.findAll();
  }

  @Query(() => [PortfolioPage3], { name: 'portfolioGetPages3ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page3Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage3], { name: 'portfolioGetPages3BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page3Service.findBySiteId(siteId);
  }

  @Query(() => ListPortfolioPage3, { name: 'portfolioGetPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage3> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page3Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage3) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage4], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage3) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
