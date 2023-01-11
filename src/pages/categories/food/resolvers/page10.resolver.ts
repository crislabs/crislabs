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
  ListFoodPage10,
  FoodPage10,
  FoodPage11,
} from 'src/common/entities/page.model';
import { FoodPage10Service } from '../services/page10.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage11Service } from '../services/page11.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage10)
export class FoodPage10Resolver {
  constructor(
    private readonly page10Service: FoodPage10Service,
    private readonly page11Service: FoodPage11Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage10, { name: 'foodCreatePage10' })
  createPage(@Args('input') input: CreatePage) {
    return this.page10Service.create(input);
  }

  @Mutation(() => FoodPage10, { name: 'foodUpdatePage10' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page10Service.update(input);
  }

  @Mutation(() => FoodPage10, { name: 'foodUpdateImagePage10' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page10Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage10' })
  deletePage(@Args('id') id: string) {
    this.page11Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page10Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages10' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page11Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page10Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages10' })
  deleteAllPages() {
    this.page11Service.deleteAll();
    this.productService.deleteAll();
    return this.page10Service.deleteAll();
  }

  @Query(() => FoodPage10, { name: 'foodGetPage10' })
  findPage(@Args('id') id: string) {
    return this.page10Service.findOne(id);
  }

  @Query(() => FoodPage10, { name: 'foodGetPage10BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page10Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage10], { name: 'foodGetPages10' })
  findPages() {
    return this.page10Service.findAll();
  }

  @Query(() => [FoodPage10], { name: 'foodGetPages10ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page10Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage10], { name: 'foodGetPages10BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page10Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage10], { name: 'foodGetPages10ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page10Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage10, { name: 'foodGetPages10WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage10> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page10Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: FoodPage10) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage11], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage10) {
    return this.page11Service.findByParentId(_id.toString());
  }
}
