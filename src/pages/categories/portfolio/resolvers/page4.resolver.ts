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
  ListPortfolioPage4,
  PortfolioPage4,
  PortfolioPage5,
} from 'src/common/entities/page.model';
import { PortfolioPage4Service } from '../services/page4.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage5Service } from '../services/page5.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage4)
export class PortfolioPage4Resolver {
  constructor(
    private readonly page4Service: PortfolioPage4Service,
    private readonly page5Service: PortfolioPage5Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage4, { name: 'portfolioCreatePage4' })
  createPage(@Args('input') input: CreatePage) {
    return this.page4Service.create(input);
  }

  @Mutation(() => PortfolioPage4, { name: 'portfolioUpdatePage4' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page4Service.update(input);
  }

  @Mutation(() => PortfolioPage4, { name: 'portfolioUpdateImagePage4' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page4Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage4' })
  deletePage(@Args('id') id: string) {
    this.page5Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page4Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages4' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page5Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page4Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages4' })
  deleteAllPages() {
    this.page5Service.deleteAll();
    // this.productService.deleteAll();
    return this.page4Service.deleteAll();
  }

  @Query(() => PortfolioPage4, { name: 'portfolioGetPage4' })
  findPage(@Args('id') id: string) {
    return this.page4Service.findOne(id);
  }

  @Query(() => PortfolioPage4, { name: 'portfolioGetPage4BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page4Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage4], { name: 'portfolioGetPages4' })
  findPages() {
    return this.page4Service.findAll();
  }

  @Query(() => [PortfolioPage4], { name: 'portfolioGetPages4ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page4Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage4], { name: 'portfolioGetPages4BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page4Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage4], { name: 'portfolioGetPages4ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page4Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage4, { name: 'portfolioGetPages4WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage4> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page4Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage4) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [PortfolioPage5], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage4) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
