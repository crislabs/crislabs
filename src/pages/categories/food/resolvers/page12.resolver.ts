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
  ListFoodPage12,
  FoodPage12,
} from 'src/common/entities/page.model';
import { FoodPage12Service } from '../services/page12.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';

@Resolver(() => FoodPage12)
export class FoodPage12Resolver {
  constructor(
    private readonly page12Service: FoodPage12Service,
    private readonly productService: FoodProductService,
  ) {}

  @Mutation(() => FoodPage12, { name: 'foodCreatePage12' })
  createPage(@Args('input') input: CreatePage) {
    return this.page12Service.create(input);
  }

  @Mutation(() => FoodPage12, { name: 'foodUpdatePage12' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page12Service.update(input);
  }

  @Mutation(() => FoodPage12, { name: 'foodUpdateImagePage12' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page12Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage12' })
  deletePage(@Args('id') id: string) {
    return this.page12Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages12' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page12Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages12' })
  deleteAllPages() {
    return this.page12Service.deleteAll();
  }

  @Query(() => FoodPage12, { name: 'foodGetPage12' })
  findPage(@Args('id') id: string) {
    return this.page12Service.findOne(id);
  }

  @Query(() => FoodPage12, { name: 'foodGetPage12BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page12Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage12], { name: 'foodGetPages12' })
  findPages() {
    return this.page12Service.findAll();
  }

  @Query(() => [FoodPage12], { name: 'foodGetPages12ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page12Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage12], { name: 'foodGetPages12BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page12Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage12], { name: 'foodGetPages12ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page12Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage12, { name: 'foodGetPages12WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage12> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page12Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: FoodPage12) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
