import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PortfolioSite, ListPortfolioSite, Site } from 'src/common/entities/site.model';
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
import { PortfolioSiteService } from './category.service';
import { page0 } from 'src/common/functions/pages';
import { PortfolioPage0 } from 'src/common/entities/page.model';
// import { PortfolioPage0Service } from 'src/pages/categories/portfolio/services/page0.service';
// import { PortfolioUserService } from 'src/users/categories/portfolio/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
// import { PortfolioAdoptionService } from 'src/products/categories/portfolio/portfolio-adoption/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
// import { PortfolioAdoption, PortfolioProduct } from 'src/common/entities/product.model';
import { PortfolioUser } from 'src/common/entities/user.model';
import { PortfolioArticle } from 'src/common/entities/article.model';
import { PortfolioPage0Service } from 'src/pages/categories/portfolio/services/page0.service';
import { PortfolioUserService } from 'src/users/categories/portfolio/category.service';
import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Resolver(() => PortfolioSite)
export class PortfolioSiteResolver {
  constructor(
    private readonly siteService: PortfolioSiteService,
    private readonly pageService: PortfolioPage0Service,
    private readonly userService: PortfolioUserService,
    private readonly articleService: PortfolioArticleService,
    // private readonly productService: PortfolioProductService,
    // private readonly adoptionService: PortfolioAdoptionService,
  ) {}

  @Mutation(() => PortfolioSite, { name: 'portfolioCreateSite' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.pageService.create(page0(document._id.toString(), input.uid));
    return document;
  }

  @Mutation(() => PortfolioSite, { name: 'portfolioUpdateSite' })
  update(@Args('input') input: UpdateSite) {
    return this.siteService.update(input);
  }

  @Mutation(() => PortfolioSite, { name: 'portfolioUpdateDbSite' })
  updateDB(@Args('input') input: UpdateDB) {
    return this.siteService.updateDB(input);
  }

  @Mutation(() => PortfolioSite, { name: 'portfolioUpdateAdminSite' })
  updateAdminDB(@Args('input') input: UpdateAdminSite) {
    return this.siteService.updateAdmin(input);
  }

  @Mutation(() => PortfolioSite, { name: 'portfolioUpdateImageSite' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.siteService.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeleteSite' })
  deleteOne(@Args('id', { type: () => String }) id: string) {
    this.pageService.deleteManyBySiteId([id]);
    return this.siteService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteSites' })
  deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.pageService.deleteManyBySiteId(ids);
    return this.siteService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllSites' })
  deleteAll() {
    this.pageService.deleteAll();
    return this.siteService.deleteAll();
  }

  @Query(() => PortfolioSite, { name: 'portfolioGetSite' })
  async findOne(@Args('id') id: string) {
    return await this.siteService.findOne(id);
  }

  @Query(() => [PortfolioSite], { name: 'portfolioGetSites' })
  findAll() {
    return this.siteService.findAll();
  }

  @Query(() => [PortfolioSite], { name: 'portafolioGetSitesByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput
  ) {
    return this.siteService.findByParentIdByPagination(listInput);
  }

  @Query(() => ListPortfolioSite, { name: 'portfolioGetSitesWithCursor' })
  async portfolioGetSitesWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListPortfolioSite> {
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

  @ResolveField('pages', () => [PortfolioPage0], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: PortfolioSite) {
    return this.pageService.findByParentId(_id.toString());
  }

  @ResolveField('users', () => [PortfolioUser], { nullable: 'itemsAndList' })
  getUsers(@Parent() { _id }: PortfolioSite) {
    return this.userService.findBySiteId(_id.toString());
  }

  // @ResolveField('products', () => [PortfolioProduct], { nullable: 'itemsAndList' })
  // getProducts(@Parent() { _id }: PortfolioSite) {
  //   return this.productService.findBySiteId(_id.toString());
  // }
  
  // @ResolveField('adoptions', () => [PortfolioAdoption], { nullable: 'itemsAndList' })
  // getAdoptions(@Parent() { _id }: PortfolioSite) {
  //   return this.adoptionService.findBySiteId(_id.toString());
  // }

  @ResolveField('articles', () => [PortfolioArticle], { nullable: 'itemsAndList' })
  getArticles(@Parent() { _id }: PortfolioSite) {
    return this.articleService.findBySiteId(_id.toString());
  }
}
