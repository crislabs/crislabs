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
  ListFoodPage6,
  FoodPage6,
  FoodPage7,
} from 'src/common/entities/page.model';
import { FoodPage6Service } from '../services/page6.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage7Service } from '../services/page7.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage6)
export class FoodPage6Resolver {
  constructor(
    private readonly page6Service: FoodPage6Service,
    private readonly page7Service: FoodPage7Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage6, { name: 'foodCreatePage6' })
  createPage(@Args('input') input: CreatePage) {
    return this.page6Service.create(input);
  }

  @Mutation(() => FoodPage6, { name: 'foodUpdatePage6' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page6Service.update(input);
  }

  @Mutation(() => FoodPage6, { name: 'foodUpdateImagePage6' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page6Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage6' })
  deletePage(@Args('id') id: string) {
    this.page7Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page6Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages6' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page7Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page6Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages6' })
  deleteAllPages() {
    this.page7Service.deleteAll();
    this.productService.deleteAll();
    return this.page6Service.deleteAll();
  }

  @Query(() => FoodPage6, { name: 'foodGetPage6' })
  findPage(@Args('id') id: string) {
    return this.page6Service.findOne(id);
  }

  @Query(() => FoodPage6, { name: 'foodGetPage6BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page6Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage6], { name: 'foodGetPages6' })
  findPages() {
    return this.page6Service.findAll();
  }

  @Query(() => [FoodPage6], { name: 'foodGetPages6ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page6Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage6], { name: 'foodGetPages6BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page6Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage6], { name: 'foodGetPages6ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page6Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage6, { name: 'foodGetPages6WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage6> {
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

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: FoodPage6) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage7], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage6) {
    return this.page7Service.findByParentId(_id.toString());
  }
}
