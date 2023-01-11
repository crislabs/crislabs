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
  ListPortfolioPage8,
  PortfolioPage8,
  PortfolioPage9,
} from 'src/common/entities/page.model';
import { PortfolioPage8Service } from '../services/page8.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage9Service } from '../services/page9.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage8)
export class PortfolioPage8Resolver {
  constructor(
    private readonly page8Service: PortfolioPage8Service,
    private readonly page9Service: PortfolioPage9Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage8, { name: 'portfolioCreatePage8' })
  createPage(@Args('input') input: CreatePage) {
    return this.page8Service.create(input);
  }

  @Mutation(() => PortfolioPage8, { name: 'portfolioUpdatePage8' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page8Service.update(input);
  }

  @Mutation(() => PortfolioPage8, { name: 'portfolioUpdateImagePage8' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page8Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage8' })
  deletePage(@Args('id') id: string) {
    this.page9Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page8Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages8' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page9Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page8Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages8' })
  deleteAllPages() {
    this.page9Service.deleteAll();
    // this.productService.deleteAll();
    return this.page8Service.deleteAll();
  }

  @Query(() => PortfolioPage8, { name: 'portfolioGetPage8' })
  findPage(@Args('id') id: string) {
    return this.page8Service.findOne(id);
  }

  @Query(() => PortfolioPage8, { name: 'portfolioGetPage8BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page8Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage8], { name: 'portfolioGetPages8' })
  findPages() {
    return this.page8Service.findAll();
  }

  @Query(() => [PortfolioPage8], { name: 'portfolioGetPages8ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page8Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage8], { name: 'portfolioGetPages8BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page8Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage8], { name: 'portfolioGetPages8ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page8Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage8, { name: 'portfolioGetPages8WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage8> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page8Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage8) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage9], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage8) {
    return this.page9Service.findByParentId(_id.toString());
  }
}
