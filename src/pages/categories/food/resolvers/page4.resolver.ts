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
  ListFoodPage4,
  FoodPage4,
  FoodPage5,
} from 'src/common/entities/page.model';
import { FoodPage4Service } from '../services/page4.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage5Service } from '../services/page5.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage4)
export class FoodPage4Resolver {
  constructor(
    private readonly page4Service: FoodPage4Service,
    private readonly page5Service: FoodPage5Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage4, { name: 'foodCreatePage4' })
  createPage(@Args('input') input: CreatePage) {
    return this.page4Service.create(input);
  }

  @Mutation(() => FoodPage4, { name: 'foodUpdatePage4' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page4Service.update(input);
  }

  @Mutation(() => FoodPage4, { name: 'foodUpdateImagePage4' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page4Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage4' })
  deletePage(@Args('id') id: string) {
    this.page5Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page4Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages4' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page5Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page4Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages4' })
  deleteAllPages() {
    this.page5Service.deleteAll();
    this.productService.deleteAll();
    return this.page4Service.deleteAll();
  }

  @Query(() => FoodPage4, { name: 'foodGetPage4' })
  findPage(@Args('id') id: string) {
    return this.page4Service.findOne(id);
  }

  @Query(() => FoodPage4, { name: 'foodGetPage4BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page4Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage4], { name: 'foodGetPages4' })
  findPages() {
    return this.page4Service.findAll();
  }

  @Query(() => [FoodPage4], { name: 'foodGetPages4ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page4Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage4], { name: 'foodGetPages4BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page4Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage4], { name: 'foodGetPages4ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page4Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage4, { name: 'foodGetPages4WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage4> {
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

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: FoodPage4) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [FoodPage5], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage4) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
