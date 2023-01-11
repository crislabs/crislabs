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
  ListFoodPage3,
  FoodPage3,
  FoodPage4,
} from 'src/common/entities/page.model';
import { FoodPage3Service } from '../services/page3.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { FoodPage4Service } from '../services/page4.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage3)
export class FoodPage3Resolver {
  constructor(
    private readonly page3Service: FoodPage3Service,
    private readonly page4Service: FoodPage4Service,
    private readonly productService: FoodProductService,
  ) { }

  @Mutation(() => FoodPage3, { name: 'foodCreatePage3' })
  createPage(@Args('input') input: CreatePage) {
    return this.page3Service.create(input);
  }

  @Mutation(() => FoodPage3, { name: 'foodUpdatePage3' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page3Service.update(input);
  }

  @Mutation(() => FoodPage3, { name: 'foodUpdateImagePage3' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page3Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage3' })
  deletePage(@Args('id') id: string) {
    this.page4Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page3Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages3' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page4Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page3Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages3' })
  deleteAllPages() {
    this.page4Service.deleteAll();
    this.productService.deleteAll();
    return this.page3Service.deleteAll();
  }

  @Query(() => FoodPage3, { name: 'foodGetPage3' })
  findPage(@Args('id') id: string) {
    return this.page3Service.findOne(id);
  }

  @Query(() => FoodPage3, { name: 'foodGetPage3BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page3Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage3], { name: 'foodGetPages3' })
  findPages() {
    return this.page3Service.findAll();
  }

  @Query(() => [FoodPage3], { name: 'foodGetPages3ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page3Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage3], { name: 'foodGetPages3BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page3Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage3], { name: 'foodGetPages3ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page3Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListFoodPage3, { name: 'foodGetPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage3> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page3Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: FoodPage3) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [FoodPage4], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage3) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
