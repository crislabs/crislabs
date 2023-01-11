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
  ListPortfolioPage2,
  PortfolioPage2,
  PortfolioPage3,
} from 'src/common/entities/page.model';
import { PortfolioPage2Service } from '../services/page2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage3Service } from '../services/page3.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage2)
export class PortfolioPage2Resolver {
  constructor(
    private readonly page2Service: PortfolioPage2Service,
    private readonly page3Service: PortfolioPage3Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage2, { name: 'portfolioCreatePage2' })
  createPage(@Args('input') input: CreatePage) {
    return this.page2Service.create(input);
  }

  @Mutation(() => PortfolioPage2, { name: 'portfolioUpdatePage2' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page2Service.update(input);
  }

  @Mutation(() => PortfolioPage2, { name: 'portfolioUpdateImagePage2' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page2Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage2' })
  deletePage(@Args('id') id: string) {
    this.page3Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page2Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages2' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page3Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page2Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages2' })
  deleteAllPages() {
    this.page3Service.deleteAll();
    // this.productService.deleteAll();
    return this.page2Service.deleteAll();
  }

  @Query(() => PortfolioPage2, { name: 'portfolioGetPage2' })
  findPage(@Args('id') id: string) {
    return this.page2Service.findOne(id);
  }

  @Query(() => PortfolioPage2, { name: 'portfolioGetPage2BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page2Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage2], { name: 'portfolioGetPages2' })
  findPages() {
    return this.page2Service.findAll();
  }

  @Query(() => [PortfolioPage2], { name: 'portfolioGetPages2ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page2Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage2], { name: 'portfolioGetPages2BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page2Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage2], { name: 'portfolioGetPages2ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page2Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage2, { name: 'portfolioGetPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage2> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page2Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage2) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage3], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage2) {
    return this.page3Service.findByParentId(_id.toString());
  }
}
