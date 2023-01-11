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
  ListFoodPage2,
  FoodPage2,
  FoodPage3,
} from 'src/common/entities/page.model';
import { FoodPage2Service } from '../services/page2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage3Service } from '../services/page3.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage2)
export class FoodPage2Resolver {
  constructor(
    private readonly page2Service: FoodPage2Service,
    private readonly page3Service: FoodPage3Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage2, { name: 'foodCreatePage2' })
  createPage(@Args('input') input: CreatePage) {
    return this.page2Service.create(input);
  }

  @Mutation(() => FoodPage2, { name: 'foodUpdatePage2' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page2Service.update(input);
  }

  @Mutation(() => FoodPage2, { name: 'foodUpdateImagePage2' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page2Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage2' })
  deletePage(@Args('id') id: string) {
    this.page3Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page2Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages2' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page3Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page2Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages2' })
  deleteAllPages() {
    this.page3Service.deleteAll();
    this.productService.deleteAll();
    return this.page2Service.deleteAll();
  }

  @Query(() => FoodPage2, { name: 'foodGetPage2' })
  findPage(@Args('id') id: string) {
    return this.page2Service.findOne(id);
  }

  @Query(() => FoodPage2, { name: 'foodGetPage2BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page2Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage2], { name: 'foodGetPages2' })
  findPages() {
    return this.page2Service.findAll();
  }

  @Query(() => [FoodPage2], { name: 'foodGetPages2ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page2Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage2], { name: 'foodGetPages2BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page2Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage2], { name: 'foodGetPages2ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page2Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListFoodPage2, { name: 'foodGetPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage2> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page2Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: FoodPage2) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage3], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage2) {
    return this.page3Service.findByParentId(_id.toString());
  }
}
