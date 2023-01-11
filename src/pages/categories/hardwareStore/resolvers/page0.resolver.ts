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
  ListHardwareStorePage0,
  HardwareStorePage0,
  HardwareStorePage1,
} from 'src/common/entities/page.model';
import { HardwareStorePage0Service } from '../services/page0.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { HardwareStoreAdoptionService } from 'src/products/categories/hardwareStore/hardwareStore-adoption/category.service';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';
// import { HardwareStoreArticleService } from 'src/articles/categories/hardwareStore/category.service';
import { HardwareStoreArticle } from 'src/common/entities/article.model';
import { HardwareStorePage1Service } from '../services/page1.service';

import { HardwareStoreArticleService } from 'src/articles/categories/hardwareStore/category.service';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HttpExceptionFilter } from 'src/common/aspects/http-exception.filter';

@Resolver(() => HardwareStorePage0)
export class HardwareStorePage0Resolver {
  constructor(
    private readonly page0Service: HardwareStorePage0Service,
    private readonly page1Service: HardwareStorePage1Service,
    // private readonly adoptionService: HardwareStoreAdoptionService,
    private readonly productService: HardwareStoreProductService,
    private readonly articleService: HardwareStoreArticleService,
  ) {}

  @Mutation(() => HardwareStorePage0, { name: 'hardwareStoreCreatePage0' })
  createPage(@Args('input') input: CreatePage) {
    return this.page0Service.create(input);
  }

  @Mutation(() => HardwareStorePage0, { name: 'hardwareStoreUpdatePage0' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page0Service.update(input);
  }

  @Mutation(() => HardwareStorePage0, { name: 'hardwareStoreUpdateImagePage0' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page0Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage0' })
  deletePage(@Args('id') id: string) {
    this.page1Service.deleteManyByParentId([id]);
    // this.adoptionService.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    this.articleService.deleteManyByParentId([id]);
    return this.page0Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages0' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    this.page1Service.deleteManyByParentId(ids);
    // this.adoptionService.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    this.articleService.deleteManyByParentId(ids);
    return this.page0Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages0' })
  deleteAllPages() {
    this.page1Service.deleteAll();
    // this.adoptionService.deleteAll();
    this.productService.deleteAll();
    this.articleService.deleteAll();
    return this.page0Service.deleteAll();
  }

  @Query(() => HardwareStorePage0, { name: 'hardwareStoreGetPage0' })
  findPage(@Args('id') id: string) {
    return this.page0Service.findOne(id);
  }

  @Query(() => HardwareStorePage0, { name: 'hardwareStoreGetPage0BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page0Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage0], { name: 'hardwareStoreGetPages0' })
  findPages() {
    return this.page0Service.findAll();
  }

  @Query(() => [HardwareStorePage0], { name: 'hardwareStoreGetPages0ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page0Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage0], { name: 'hardwareStoreGetPages0BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page0Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage0], { name: 'hardwareStoreGetPages0ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page0Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage0, { name: 'hardwareStoreGetPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage0> {
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

  // @ResolveField('adoptions', () => [HardwareStoreAdoption], { nullable: 'itemsAndList' })
  // getAdoption(@Parent() { _id, dataPage }: HardwareStorePage0) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'adoption') {
  //     return this.adoptionService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
  @ResolveField('pages', () => [HardwareStorePage1], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage0) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page1Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
  @ResolveField('products', () => [HardwareStoreProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage0) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('articles', () => [HardwareStoreArticle], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id, dataPage }: HardwareStorePage0) {
    const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    if (type === 'blog') {
      return this.articleService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
