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
  ListFoodPage7,
  FoodPage7,
  FoodPage8,
} from 'src/common/entities/page.model';
import { FoodPage7Service } from '../services/page7.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage8Service } from '../services/page8.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage7)
export class FoodPage7Resolver {
  constructor(
    private readonly page7Service: FoodPage7Service,
    private readonly page8Service: FoodPage8Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage7, { name: 'foodCreatePage7' })
  createPage(@Args('input') input: CreatePage) {
    return this.page7Service.create(input);
  }

  @Mutation(() => FoodPage7, { name: 'foodUpdatePage7' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page7Service.update(input);
  }

  @Mutation(() => FoodPage7, { name: 'foodUpdateImagePage7' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page7Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage7' })
  deletePage(@Args('id') id: string) {
    this.page8Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page7Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages7' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page8Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page7Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages7' })
  deleteAllPages() {
    this.page8Service.deleteAll();
    this.productService.deleteAll();
    return this.page7Service.deleteAll();
  }


  @Query(() => FoodPage7, { name: 'foodGetPage7' })
  findPage(@Args('id') id: string) {
    return this.page7Service.findOne(id);
  }

  @Query(() => FoodPage7, { name: 'foodGetPage7BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page7Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage7], { name: 'foodGetPages7' })
  findPages() {
    return this.page7Service.findAll();
  }

  @Query(() => [FoodPage7], { name: 'foodGetPages7ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page7Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage7], { name: 'foodGetPages7BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page7Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage7], { name: 'foodGetPages7ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page7Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage7, { name: 'foodGetPages7WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage7> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page7Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: FoodPage7) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage8], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage7) {
    return this.page8Service.findByParentId(_id.toString());
  }
}
