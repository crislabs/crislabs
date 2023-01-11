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
  ListFoodPage11,
  FoodPage11,
  FoodPage12,
} from 'src/common/entities/page.model';
import { FoodPage11Service } from '../services/page11.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage12Service } from '../services/page12.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage11)
export class FoodPage11Resolver {
  constructor(
    private readonly page11Service: FoodPage11Service,
    private readonly page12Service: FoodPage12Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage11, { name: 'foodCreatePage11' })
  createPage(@Args('input') input: CreatePage) {
    return this.page11Service.create(input);
  }

  @Mutation(() => FoodPage11, { name: 'foodUpdatePage11' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page11Service.update(input);
  }

  @Mutation(() => FoodPage11, { name: 'foodUpdateImagePage11' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page11Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage11' })
  deletePage(@Args('id') id: string) {
    this.page12Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page11Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages11' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page12Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page11Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages11' })
  deleteAllPages() {
    this.page12Service.deleteAll();
    this.productService.deleteAll();
    return this.page11Service.deleteAll();
  }

  @Query(() => FoodPage11, { name: 'foodGetPage11' })
  findPage(@Args('id') id: string) {
    return this.page11Service.findOne(id);
  }

  @Query(() => FoodPage11, { name: 'foodGetPage11BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page11Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage11], { name: 'foodGetPages11' })
  findPages() {
    return this.page11Service.findAll();
  }

  @Query(() => [FoodPage11], { name: 'foodGetPages11ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page11Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage11], { name: 'foodGetPages11BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page11Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage11], { name: 'foodGetPages11ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page11Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage11, { name: 'foodGetPages11WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage11> {
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

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: FoodPage11) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [FoodPage12], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage11) {
    return this.page12Service.findByParentId(_id.toString());
  }
}
