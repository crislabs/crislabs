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
  ListPortfolioPage6,
  PortfolioPage6,
  PortfolioPage7,
} from 'src/common/entities/page.model';
import { PortfolioPage6Service } from '../services/page6.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
import { PortfolioPage7Service } from '../services/page7.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage6)
export class PortfolioPage6Resolver {
  constructor(
    private readonly page6Service: PortfolioPage6Service,
    private readonly page7Service: PortfolioPage7Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage6, { name: 'portfolioCreatePage6' })
  createPage(@Args('input') input: CreatePage) {
    return this.page6Service.create(input);
  }

  @Mutation(() => PortfolioPage6, { name: 'portfolioUpdatePage6' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page6Service.update(input);
  }

  @Mutation(() => PortfolioPage6, { name: 'portfolioUpdateImagePage6' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page6Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage6' })
  deletePage(@Args('id') id: string) {
    this.page7Service.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    return this.page6Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages6' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page7Service.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    return this.page6Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages6' })
  deleteAllPages() {
    this.page7Service.deleteAll();
    // this.productService.deleteAll();
    return this.page6Service.deleteAll();
  }

  @Query(() => PortfolioPage6, { name: 'portfolioGetPage6' })
  findPage(@Args('id') id: string) {
    return this.page6Service.findOne(id);
  }

  @Query(() => PortfolioPage6, { name: 'portfolioGetPage6BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page6Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage6], { name: 'portfolioGetPages6' })
  findPages() {
    return this.page6Service.findAll();
  }

  @Query(() => [PortfolioPage6], { name: 'portfolioGetPages6ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page6Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage6], { name: 'portfolioGetPages6BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page6Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage6], { name: 'portfolioGetPages6ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page6Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage6, { name: 'portfolioGetPages6WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage6> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page6Service.findByCursor(
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
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage6) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [PortfolioPage7], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage6) {
    return this.page7Service.findByParentId(_id.toString());
  }
}
