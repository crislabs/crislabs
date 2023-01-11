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
  ListPortfolioPage5,
  PortfolioPage5,
  PortfolioPage6,
} from 'src/common/entities/page.model';
import { PortfolioPage5Service } from '../services/page5.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage6Service } from '../services/page6.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage5)
export class PortfolioPage5Resolver {
  constructor(
    private readonly page5Service: PortfolioPage5Service,
    private readonly page6Service: PortfolioPage6Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage5, { name: 'portfolioCreatePage5' })
  createPage(@Args('input') input: CreatePage) {
    return this.page5Service.create(input);
  }

  @Mutation(() => PortfolioPage5, { name: 'portfolioUpdatePage5' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page5Service.update(input);
  }

  @Mutation(() => PortfolioPage5, { name: 'portfolioUpdateImagePage5' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page5Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage5' })
  deletePage(@Args('id') id: string) {
    this.page6Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page5Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages5' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page6Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page5Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages5' })
  deleteAllPages() {
    this.page6Service.deleteAll();
    // this.productService.deleteAll();
    return this.page5Service.deleteAll();
  }

  @Query(() => PortfolioPage5, { name: 'portfolioGetPage5' })
  findPage(@Args('id') id: string) {
    return this.page5Service.findOne(id);
  }

  @Query(() => PortfolioPage5, { name: 'portfolioGetPage5BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page5Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage5], { name: 'portfolioGetPages5' })
  findPages() {
    return this.page5Service.findAll();
  }

  @Query(() => [PortfolioPage5], { name: 'portfolioGetPages5ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page5Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage5], { name: 'portfolioGetPages5BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page5Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage5], { name: 'portfolioGetPages5ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page5Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage5, { name: 'portfolioGetPages5WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage5> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page5Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage5) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }

  @ResolveField('pages', () => [PortfolioPage6], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage5) {
    return this.page6Service.findByParentId(_id.toString());
  }
}
