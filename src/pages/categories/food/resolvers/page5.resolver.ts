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
  ListFoodPage5,
  FoodPage5,
  FoodPage6,
} from 'src/common/entities/page.model';
import { FoodPage5Service } from '../services/page5.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage6Service } from '../services/page6.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage5)
export class FoodPage5Resolver {
  constructor(
    private readonly page5Service: FoodPage5Service,
    private readonly page6Service: FoodPage6Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage5, { name: 'foodCreatePage5' })
  createPage(@Args('input') input: CreatePage) {
    return this.page5Service.create(input);
  }

  @Mutation(() => FoodPage5, { name: 'foodUpdatePage5' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page5Service.update(input);
  }

  @Mutation(() => FoodPage5, { name: 'foodUpdateImagePage5' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page5Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage5' })
  deletePage(@Args('id') id: string) {
    this.page6Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page5Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages5' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page6Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page5Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages5' })
  deleteAllPages() {
    this.page6Service.deleteAll();
    this.productService.deleteAll();
    return this.page5Service.deleteAll();
  }

  @Query(() => FoodPage5, { name: 'foodGetPage5' })
  findPage(@Args('id') id: string) {
    return this.page5Service.findOne(id);
  }

  @Query(() => FoodPage5, { name: 'foodGetPage5BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page5Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage5], { name: 'foodGetPages5' })
  findPages() {
    return this.page5Service.findAll();
  }

  @Query(() => [FoodPage5], { name: 'foodGetPages5ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page5Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage5], { name: 'foodGetPages5BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page5Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage5], { name: 'foodGetPages5ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page5Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage5, { name: 'foodGetPages5WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage5> {
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

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: FoodPage5) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage6], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage5) {
    return this.page6Service.findByParentId(_id.toString());
  }
}
