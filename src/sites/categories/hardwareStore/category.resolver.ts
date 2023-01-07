import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { HardwareStoreSite, ListHardwareStoreSite, Site } from 'src/common/entities/site.model';
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
import { HardwareStoreSiteService } from './category.service';
import { HardwareStorePage0Service } from 'src/pages/categories/hardwareStore/services/page0.service';
import { page0 } from 'src/common/functions/pages';
import { HardwareStorePage0 } from 'src/common/entities/page.model';

import { HardwareStoreArticleService } from 'src/articles/categories/hardwareStore/category.service';
import { HardwareStoreUser } from 'src/common/entities/user.model';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { HardwareStoreArticle } from 'src/common/entities/article.model';
import { HardwareStoreUserService } from 'src/users/categories/hardwareStore/category.service';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';

@Resolver(() => HardwareStoreSite)
export class HardwareStoreSiteResolver {
  constructor(
    private readonly siteService: HardwareStoreSiteService,
    private readonly pageService: HardwareStorePage0Service,
    private readonly userService: HardwareStoreUserService,
    private readonly productService: HardwareStoreProductService,
    // private readonly adoptionService: HardwareStoreAdoptionService,
    private readonly articleService: HardwareStoreArticleService,
  ) {}

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreCreateSite' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.pageService.create(page0(document._id.toString(), input.uid));
    return document;
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateSite' })
  update(@Args('input') input: UpdateSite) {
    return this.siteService.update(input);
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateDbSite' })
  updateDB(@Args('input') input: UpdateDB) {
    return this.siteService.updateDB(input);
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateAdminSite' })
  updateAdminDB(@Args('input') input: UpdateAdminSite) {
    return this.siteService.updateAdmin(input);
  }

  @Mutation(() => HardwareStoreSite, { name: 'hardwareStoreUpdateImageSite' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.siteService.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteSite' })
  deleteOne(@Args('id', { type: () => String }) id: string) {
    this.pageService.deleteManyBySiteId([id]);
    return this.siteService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeleteSites' })
  deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.pageService.deleteManyBySiteId(ids);
    return this.siteService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllSites' })
  deleteAll() {
    this.pageService.deleteAll();
    return this.siteService.deleteAll();
  }

  @Query(() => HardwareStoreSite, { name: 'hardwareStoreGetSite' })
  async findOne(@Args('id') id: string) {
    return await this.siteService.findOne(id);
  }

  @Query(() => [HardwareStoreSite], { name: 'hardwareStoreGetSites' })
  findAll() {
    return this.siteService.findAll();
  }

  @Query(() => ListHardwareStoreSite, { name: 'hardwareStoreGetSitesWithCursor' })
  async hardwareStoreGetSitesWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListHardwareStoreSite> {
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

  @ResolveField('pages', () => [HardwareStorePage0], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: HardwareStoreSite) {
    return this.pageService.findByParentId(_id.toString());
  }

  @ResolveField('users', () => [HardwareStoreUser], { nullable: 'itemsAndList' })
  getUsers(@Parent() { _id }: HardwareStoreSite) {
    return this.userService.findBySiteId(_id.toString());
  }

  @ResolveField('products', () => [HardwareStoreProduct], { nullable: 'itemsAndList' })
  getProducts(@Parent() { _id }: HardwareStoreSite) {
    return this.productService.findBySiteId(_id.toString());
  }
  
  // @ResolveField('adoptions', () => [HardwareStoreAdoption], { nullable: 'itemsAndList' })
  // getAdoptions(@Parent() { _id }: HardwareStoreSite) {
  //   return this.adoptionService.findBySiteId(_id.toString());
  // }

  @ResolveField('articles', () => [HardwareStoreArticle], { nullable: 'itemsAndList' })
  getArticles(@Parent() { _id }: HardwareStoreSite) {
    return this.articleService.findBySiteId(_id.toString());
  }
}
