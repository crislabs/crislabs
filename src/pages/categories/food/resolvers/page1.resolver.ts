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
  ListFoodPage1,
  FoodPage1,
  FoodPage2,
} from 'src/common/entities/page.model';
import { FoodPage1Service } from '../services/page1.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';
import { FoodPage2Service } from '../services/page2.service';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage1)
export class FoodPage1Resolver {
  constructor(
    private readonly page1Service: FoodPage1Service,
    private readonly page2Service: FoodPage2Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage1, { name: 'foodCreatePage1' })
  createPage(@Args('input') input: CreatePage) {
    return this.page1Service.create(input);
  }

  @Mutation(() => FoodPage1, { name: 'foodUpdatePage1' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page1Service.update(input);
  }

  @Mutation(() => FoodPage1, { name: 'foodUpdateImagePage1' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page1Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage1' })
  deletePage(@Args('id') id: string) {
    this.page2Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page1Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages1' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page2Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page1Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages1' })
  deleteAllPages() {
    this.page2Service.deleteAll();
    this.productService.deleteAll();
    return this.page1Service.deleteAll();
  }

  @Query(() => FoodPage1, { name: 'foodGetPage1' })
  findPage(@Args('id') id: string) {
    return this.page1Service.findOne(id);
  }

  @Query(() => FoodPage1, { name: 'foodGetPage1BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page1Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage1], { name: 'foodGetPages1' })
  findPages() {
    return this.page1Service.findAll();
  }

  @Query(() => [FoodPage1], { name: 'foodGetPages1BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page1Service.findBySiteId(siteId);
  }


  @Query(() => [FoodPage1], { name: 'foodGetPages1ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page1Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage1], { name: 'foodGetPages1ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page1Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListFoodPage1, { name: 'foodGetPages1WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage1> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page1Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: FoodPage1) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [FoodPage2], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage1) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page2Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
}
