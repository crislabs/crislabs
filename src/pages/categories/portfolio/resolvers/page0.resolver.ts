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
  ListPortfolioPage0,
  PortfolioPage0,
  PortfolioPage1,
} from 'src/common/entities/page.model';
import { PortfolioPage0Service } from '../services/page0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioAdoption, PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioAdoptionService } from 'src/products/categories/portfolio/portfolio-adoption/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
import { PortfolioArticle } from 'src/common/entities/article.model';
import { PortfolioPage1Service } from '../services/page1.service';
import { UseFilters } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PortfolioAdoptionService } from 'src/products/categories/portfolio/portfolio-adoption/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
// import { HttpExceptionFilter } from 'src/common/aspects/http-exception.filter';

@Resolver(() => PortfolioPage0)
export class PortfolioPage0Resolver {
  constructor(
    private readonly page0Service: PortfolioPage0Service,
    private readonly page1Service: PortfolioPage1Service,
    // private readonly adoptionService: PortfolioAdoptionService,
    // private readonly productService: PortfolioProductService,
    // private readonly articleService: PortfolioArticleService,
  ) {}

  @Mutation(() => PortfolioPage0, { name: 'portfolioCreatePage0' })
  createPage(@Args('input') input: CreatePage) {
    return this.page0Service.create(input);
  }

  @Mutation(() => PortfolioPage0, { name: 'portfolioUpdatePage0' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page0Service.update(input);
  }

  @Mutation(() => PortfolioPage0, { name: 'portfolioUpdateImagePage0' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page0Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage0' })
  deletePage(@Args('id') id: string) {
    this.page1Service.deleteManyByParentId([id]);
    // this.adoptionService.deleteManyByParentId([id]);
    // this.productService.deleteManyByParentId([id]);
    // this.articleService.deleteManyByParentId([id]);
    return this.page0Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    this.page1Service.deleteManyByParentId(ids);
    // this.adoptionService.deleteManyByParentId(ids);
    // this.productService.deleteManyByParentId(ids);
    // this.articleService.deleteManyByParentId(ids);
    return this.page0Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages0' })
  deleteAllPages() {
    this.page1Service.deleteAll();
    // this.adoptionService.deleteAll();
    // this.productService.deleteAll();
    // this.articleService.deleteAll();
    return this.page0Service.deleteAll();
  }

  @Query(() => PortfolioPage0, { name: 'portfolioGetPage0' })
  findPage(@Args('id') id: string) {
    return this.page0Service.findOne(id);
  }

  @Query(() => PortfolioPage0, { name: 'portfolioGetPage0BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page0Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage0], { name: 'portfolioGetPages0' })
  findPages() {
    return this.page0Service.findAll();
  }

  @Query(() => [PortfolioPage0], { name: 'portfolioGetPages0ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
  ) {
    return this.page0Service.findByParentId(parentId);
  }
  @Query(() => [PortfolioPage0], { name: 'portfolioGetPages0BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page0Service.findBySiteId(siteId);
  }

  @Query(() => [PortfolioPage0], { name: 'portfolioGetPages0ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page0Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListPortfolioPage0, { name: 'portfolioGetPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage0> {
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

  // @ResolveField('adoptions', () => [PortfolioAdoption], { nullable: 'itemsAndList' })
  // getAdoption(@Parent() { _id, dataPage }: PortfolioPage0) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'adoption') {
  //     return this.adoptionService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [PortfolioPage1], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PortfolioPage0) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page1Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
  // @ResolveField('products', () => [PortfolioProduct], { nullable: 'itemsAndList' })
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage0) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  // @ResolveField('articles', () => [PortfolioArticle], { nullable: 'itemsAndList' })
  // getArticle(@Parent() { _id, dataPage }: PortfolioPage0) {
  //   const { type } = dataPage as DataPage;
  //   // const { slug } = type as Type;
  //   if (type === 'blog') {
  //     return this.articleService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
}
