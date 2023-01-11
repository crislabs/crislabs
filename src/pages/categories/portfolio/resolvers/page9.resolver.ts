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
  ListPortfolioPage9,
  PortfolioPage10,
  PortfolioPage9,
} from 'src/common/entities/page.model';
import { PortfolioPage9Service } from '../services/page9.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage10Service } from '../services/page10.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage9)
export class PortfolioPage9Resolver {
  constructor(
    private readonly page9Service: PortfolioPage9Service,
    private readonly page10Service: PortfolioPage10Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage9, { name: 'portfolioCreatePage9' })
  createPage(@Args('input') input: CreatePage) {
    return this.page9Service.create(input);
  }

  @Mutation(() => PortfolioPage9, { name: 'portfolioUpdatePage9' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page9Service.update(input);
  }

  @Mutation(() => PortfolioPage9, { name: 'portfolioUpdateImagePage9' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page9Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage9' })
  deletePage(@Args('id') id: string) {
    this.page10Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page9Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages9' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page10Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page9Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages9' })
  deleteAllPages() {
    this.page10Service.deleteAll();
    // this.productService.deleteAll();
    return this.page9Service.deleteAll();
  }

  @Query(() => PortfolioPage9, { name: 'portfolioGetPage9' })
  findPage(@Args('id') id: string) {
    return this.page9Service.findOne(id);
  }

  @Query(() => PortfolioPage9, { name: 'portfolioGetPage9BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page9Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage9], { name: 'portfolioGetPages9' })
  findPages() {
    return this.page9Service.findAll();
  }

  @Query(() => [PortfolioPage9], { name: 'portfolioGetPages9ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page9Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage9], { name: 'portfolioGetPages9BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page9Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage9], { name: 'portfolioGetPages9ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page9Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage9, { name: 'portfolioGetPages9WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage9> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page9Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage9) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage10], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage9) {
    return this.page10Service.findByParentId(_id.toString());
  }
}
