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
  ListFoodPage0,
  FoodPage0,
  FoodPage1,
} from 'src/common/entities/page.model';
import { FoodPage0Service } from '../services/page0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { FoodProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { FoodAdoptionService } from 'src/products/categories/food/food-adoption/category.service';
// import { FoodProductService } from 'src/products/categories/food/food/category.service';
// import { FoodArticleService } from 'src/articles/categories/food/category.service';
import { FoodArticle } from 'src/common/entities/article.model';
import { FoodPage1Service } from '../services/page1.service';

import { FoodArticleService } from 'src/articles/categories/food/category.service';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HttpExceptionFilter } from 'src/common/aspects/http-exception.filter';

@Resolver(() => FoodPage0)
export class FoodPage0Resolver {
  constructor(
    private readonly page0Service: FoodPage0Service,
    private readonly page1Service: FoodPage1Service,
    // private readonly adoptionService: FoodAdoptionService,
    private readonly productService: FoodProductService,
    private readonly articleService: FoodArticleService,
  ) {}

  @Mutation(() => FoodPage0, { name: 'foodCreatePage0' })
  createPage(@Args('input') input: CreatePage) {
    return this.page0Service.create(input);
  }

  @Mutation(() => FoodPage0, { name: 'foodUpdatePage0' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page0Service.update(input);
  }

  @Mutation(() => FoodPage0, { name: 'foodUpdateImagePage0' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page0Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeletePage0' })
  deletePage(@Args('id') id: string) {
    this.page1Service.deleteManyByParentId([id]);
    // this.adoptionService.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    this.articleService.deleteManyByParentId([id]);
    return this.page0Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    this.page1Service.deleteManyByParentId(ids);
    // this.adoptionService.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    this.articleService.deleteManyByParentId(ids);
    return this.page0Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllPages0' })
  deleteAllPages() {
    this.page1Service.deleteAll();
    // this.adoptionService.deleteAll();
    this.productService.deleteAll();
    this.articleService.deleteAll();
    return this.page0Service.deleteAll();
  }

  @Query(() => FoodPage0, { name: 'foodGetPage0' })
  findPage(@Args('id') id: string) {
    return this.page0Service.findOne(id);
  }

  @Query(() => FoodPage0, { name: 'foodGetPage0BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page0Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodPage0], { name: 'foodGetPages0' })
  findPages() {
    return this.page0Service.findAll();
  }

  @Query(() => [FoodPage0], { name: 'foodGetPages0ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page0Service.findByParentId(parentId);
  }

  @Query(() => [FoodPage0], { name: 'foodGetPages0BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page0Service.findBySiteId(siteId);
  }

  @Query(() => [FoodPage0], { name: 'foodGetPages0ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page0Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodPage0, { name: 'foodGetPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodPage0> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page0Service.findByCursor(
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

  // @ResolveField('adoptions', () => [FoodAdoption], { nullable: 'itemsAndList' })
  // getAdoption(@Parent() { _id, dataPage }: FoodPage0) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'adoption') {
  //     return this.adoptionService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [FoodPage1], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: FoodPage0) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page1Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: FoodPage0) {
    const { type } = dataPage as DataPage;
    if (type === 'food') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('articles', () => [FoodArticle], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id, dataPage }: FoodPage0) {
    const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    if (type === 'blog') {
      return this.articleService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
