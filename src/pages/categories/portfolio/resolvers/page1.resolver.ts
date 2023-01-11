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
  ListPortfolioPage1,
  PortfolioPage1,
  PortfolioPage2,
} from 'src/common/entities/page.model';
import { PortfolioPage1Service } from '../services/page1.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage2Service } from '../services/page2.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage1)
export class PortfolioPage1Resolver {
  constructor(
    private readonly page1Service: PortfolioPage1Service,
    private readonly page2Service: PortfolioPage2Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage1, { name: 'portfolioCreatePage1' })
  createPage(@Args('input') input: CreatePage) {
    return this.page1Service.create(input);
  }

  @Mutation(() => PortfolioPage1, { name: 'portfolioUpdatePage1' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page1Service.update(input);
  }

  @Mutation(() => PortfolioPage1, { name: 'portfolioUpdateImagePage1' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page1Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage1' })
  deletePage(@Args('id') id: string) {
    this.page2Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page1Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages1' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page2Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page1Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages1' })
  deleteAllPages() {
    this.page2Service.deleteAll();
    // this.productService.deleteAll();
    return this.page1Service.deleteAll();
  }

  @Query(() => PortfolioPage1, { name: 'portfolioGetPage1' })
  findPage(@Args('id') id: string) {
    return this.page1Service.findOne(id);
  }

  @Query(() => PortfolioPage1, { name: 'portfolioGetPage1BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page1Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage1], { name: 'portfolioGetPages1' })
  findPages() {
    return this.page1Service.findAll();
  }

  @Query(() => [PortfolioPage1], { name: 'portfolioGetPages1ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page1Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage1], { name: 'portfolioGetPages1BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page1Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage1], { name: 'portfolioGetPages1ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page1Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage1, { name: 'portfolioGetPages1WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage1> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page1Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage1) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [PortfolioPage2], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage1) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page2Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
}
