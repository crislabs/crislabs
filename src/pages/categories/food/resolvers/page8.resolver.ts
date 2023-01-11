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
  ListFoodPage8,
  FoodPage8,
  FoodPage9,
} from 'src/common/entities/page.model';
import { FoodPage8Service } from '../services/page8.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage9Service } from '../services/page9.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage8)
export class FoodPage8Resolver {
  constructor(
    private readonly page8Service: FoodPage8Service,
    private readonly page9Service: FoodPage9Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage8, { name: 'foodCreatePage8' })
  createPage(@Args('input') input: CreatePage) {
    return this.page8Service.create(input);
  }

  @Mutation(() => FoodPage8, { name: 'foodUpdatePage8' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page8Service.update(input);
  }

  @Mutation(() => FoodPage8, { name: 'foodUpdateImagePage8' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page8Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage8' })
  deletePage(@Args('id') id: string) {
    this.page9Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page8Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages8' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page9Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page8Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages8' })
  deleteAllPages() {
    this.page9Service.deleteAll();
    this.productService.deleteAll();
    return this.page8Service.deleteAll();
  }

  @Query(() => FoodPage8, { name: 'foodGetPage8' })
  findPage(@Args('id') id: string) {
    return this.page8Service.findOne(id);
  }

  @Query(() => FoodPage8, { name: 'foodGetPage8BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page8Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage8], { name: 'foodGetPages8' })
  findPages() {
    return this.page8Service.findAll();
  }

  @Query(() => [FoodPage8], { name: 'foodGetPages8ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page8Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage8], { name: 'foodGetPages8BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page8Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage8], { name: 'foodGetPages8ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page8Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage8, { name: 'foodGetPages8WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage8> {
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

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: FoodPage8) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage9], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage8) {
    return this.page9Service.findByParentId(_id.toString());
  }
}
