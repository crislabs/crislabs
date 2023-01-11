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
  ListPortfolioPage11,
  PortfolioPage11,
  PortfolioPage12,
} from 'src/common/entities/page.model';
import { PortfolioPage11Service } from '../services/page11.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage12Service } from '../services/page12.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage11)
export class PortfolioPage11Resolver {
  constructor(
    private readonly page11Service: PortfolioPage11Service,
    private readonly page12Service: PortfolioPage12Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage11, { name: 'portfolioCreatePage11' })
  createPage(@Args('input') input: CreatePage) {
    return this.page11Service.create(input);
  }

  @Mutation(() => PortfolioPage11, { name: 'portfolioUpdatePage11' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page11Service.update(input);
  }

  @Mutation(() => PortfolioPage11, { name: 'portfolioUpdateImagePage11' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page11Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage11' })
  deletePage(@Args('id') id: string) {
    this.page12Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page11Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages11' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page12Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page11Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages11' })
  deleteAllPages() {
    this.page12Service.deleteAll();
    // this.productService.deleteAll();
    return this.page11Service.deleteAll();
  }

  @Query(() => PortfolioPage11, { name: 'portfolioGetPage11' })
  findPage(@Args('id') id: string) {
    return this.page11Service.findOne(id);
  }

  @Query(() => PortfolioPage11, { name: 'portfolioGetPage11BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page11Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage11], { name: 'portfolioGetPages11' })
  findPages() {
    return this.page11Service.findAll();
  }

  @Query(() => [PortfolioPage11], { name: 'portfolioGetPages11ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page11Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage11], { name: 'portfolioGetPages11BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page11Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage11], { name: 'portfolioGetPages11ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page11Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage11, { name: 'portfolioGetPages11WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage11> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page11Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage11) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage12], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage11) {
    return this.page12Service.findByParentId(_id.toString());
  }
}
