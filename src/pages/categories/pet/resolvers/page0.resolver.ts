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
  ListPetPage0,
  PetPage0,
  PetPage1,
} from 'src/common/entities/page.model';
import { PetPage0Service } from '../services/page0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetAdoption, PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PetAdoptionService } from 'src/products/categories/pet/pet-adoption/category.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
// import { PetArticleService } from 'src/articles/categories/pet/category.service';
import { PetArticle } from 'src/common/entities/article.model';
import { PetPage1Service } from '../services/page1.service';
import { UseFilters } from '@nestjs/common';
import { PetAdoptionService } from 'src/products/categories/pet/pet-adoption/category.service';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetArticleService } from 'src/articles/categories/pet/category.service';
// import { HttpExceptionFilter } from 'src/common/aspects/http-exception.filter';

@Resolver(() => PetPage0)
export class PetPage0Resolver {
  constructor(
    private readonly page0Service: PetPage0Service,
    private readonly page1Service: PetPage1Service,
    private readonly adoptionService: PetAdoptionService,
    private readonly productService: PetProductService,
    private readonly articleService: PetArticleService,
  ) {}

  @Mutation(() => PetPage0, { name: 'petCreatePage0' })
  createPage(@Args('input') input: CreatePage) {
    return this.page0Service.create(input);
  }

  @Mutation(() => PetPage0, { name: 'petUpdatePage0' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page0Service.update(input);
  }

  @Mutation(() => PetPage0, { name: 'petUpdateImagePage0' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page0Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage0' })
  deletePage(@Args('id') id: string) {
    this.page1Service.deleteManyByParentId([id]);
    this.adoptionService.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    this.articleService.deleteManyByParentId([id]);
    return this.page0Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    this.page1Service.deleteManyByParentId(ids);
    this.adoptionService.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    this.articleService.deleteManyByParentId(ids);
    return this.page0Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages0' })
  deleteAllPages() {
    this.page1Service.deleteAll();
    this.adoptionService.deleteAll();
    this.productService.deleteAll();
    this.articleService.deleteAll();
    return this.page0Service.deleteAll();
  }

  @Query(() => PetPage0, { name: 'petGetPage0' })
  findPage(@Args('id') id: string) {
    return this.page0Service.findOne(id);
  }

  @Query(() => PetPage0, { name: 'petGetPage0BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page0Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage0], { name: 'petGetPages0' })
  findPages() {
    return this.page0Service.findAll();
  }

  @Query(() => [PetPage0], { name: 'petGetPages0ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page0Service.findByParentId(parentId);
  }

  @Query(() => [PetPage0], { name: 'petGetPages0BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page0Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage0, { name: 'petGetPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage0> {
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

  @ResolveField('adoptions', () => [PetAdoption], { nullable: 'itemsAndList' })
  getAdoption(@Parent() { _id, dataPage }: PetPage0) {
    const { type } = dataPage as DataPage;
    if (type === 'adoption') {
      return this.adoptionService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [PetPage1], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage0) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page1Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
  @ResolveField('products', () => [PetProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: PetPage0) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('articles', () => [PetArticle], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id, dataPage }: PetPage0) {
    const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    if (type === 'blog') {
      return this.articleService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
