import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FoodSite, ListFoodSite, Site } from 'src/common/entities/site.model';
import {
  CreateSite,
  UpdateAdminSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from 'src/common/dto/site.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { FoodSiteService } from './category.service';
import { FoodPage0Service } from 'src/pages/categories/food/services/page0.service';
import { page0 } from 'src/common/functions/pages';
import { FoodPage0 } from 'src/common/entities/page.model';

import { FoodArticleService } from 'src/articles/categories/food/category.service';
import { FoodUser } from 'src/common/entities/user.model';
import { FoodProduct } from 'src/common/entities/product.model';
import { FoodArticle } from 'src/common/entities/article.model';
import { FoodUserService } from 'src/users/categories/food/category.service';
import { FoodProductService } from 'src/products/categories/food/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Resolver(() => FoodSite)
export class FoodSiteResolver {
  constructor(
    private readonly siteService: FoodSiteService,
    private readonly pageService: FoodPage0Service,
    private readonly userService: FoodUserService,
    private readonly productService: FoodProductService,
    // private readonly adoptionService: FoodAdoptionService,
    private readonly articleService: FoodArticleService,
  ) {}

  @Mutation(() => FoodSite, { name: 'foodCreateSite' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.pageService.create(page0(document._id.toString(), input.uid));
    return document;
  }

  @Mutation(() => FoodSite, { name: 'foodUpdateSite' })
  update(@Args('input') input: UpdateSite) {
    return this.siteService.update(input);
  }

  @Mutation(() => FoodSite, { name: 'foodUpdateDbSite' })
  updateDB(@Args('input') input: UpdateDB) {
    return this.siteService.updateDB(input);
  }

  @Mutation(() => FoodSite, { name: 'foodUpdateAdminSite' })
  updateAdminDB(@Args('input') input: UpdateAdminSite) {
    return this.siteService.updateAdmin(input);
  }

  @Mutation(() => FoodSite, { name: 'foodUpdateImageSite' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.siteService.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeleteSite' })
  deleteOne(@Args('id', { type: () => String }) id: string) {
    this.pageService.deleteManyBySiteId([id]);
    return this.siteService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeleteSites' })
  deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.pageService.deleteManyBySiteId(ids);
    return this.siteService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllSites' })
  deleteAll() {
    this.pageService.deleteAll();
    return this.siteService.deleteAll();
  }

  @Query(() => FoodSite, { name: 'foodGetSite' })
  async findOne(@Args('id') id: string) {
    return await this.siteService.findOne(id);
  }

  @Query(() => [FoodSite], { name: 'foodGetSites' })
  findAll() {
    return this.siteService.findAll();
  }

  @Query(() => [FoodSite], { name: 'foodGetSitesByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput
  ) {
    return this.siteService.findByParentIdByPagination(listInput);
  }

  @Query(() => ListFoodSite, { name: 'foodGetSitesWithCursor' })
  async foodGetSitesWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListFoodSite> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.siteService.findByCursor({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('pages', () => [FoodPage0], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: FoodSite) {
    return this.pageService.findByParentId(_id.toString());
  }

  @ResolveField('users', () => [FoodUser], { nullable: 'itemsAndList' })
  getUsers(@Parent() { _id }: FoodSite) {
    return this.userService.findBySiteId(_id.toString());
  }

  @ResolveField('products', () => [FoodProduct], { nullable: 'itemsAndList' })
  getProducts(@Parent() { _id }: FoodSite) {
    return this.productService.findBySiteId(_id.toString());
  }
  
  // @ResolveField('adoptions', () => [FoodAdoption], { nullable: 'itemsAndList' })
  // getAdoptions(@Parent() { _id }: FoodSite) {
  //   return this.adoptionService.findBySiteId(_id.toString());
  // }

  @ResolveField('articles', () => [FoodArticle], { nullable: 'itemsAndList' })
  getArticles(@Parent() { _id }: FoodSite) {
    return this.articleService.findBySiteId(_id.toString());
  }
}
