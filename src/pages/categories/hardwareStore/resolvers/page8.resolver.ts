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
  ListHardwareStorePage8,
  HardwareStorePage8,
  HardwareStorePage9,
} from 'src/common/entities/page.model';
import { HardwareStorePage8Service } from '../services/page8.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage9Service } from '../services/page9.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage8)
export class HardwareStorePage8Resolver {
  constructor(
    private readonly page8Service: HardwareStorePage8Service,
    private readonly page9Service: HardwareStorePage9Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage8, { name: 'hardwareStoreCreatePage8' })
  createPage(@Args('input') input: CreatePage) {
    return this.page8Service.create(input);
  }

  @Mutation(() => HardwareStorePage8, { name: 'hardwareStoreUpdatePage8' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page8Service.update(input);
  }

  @Mutation(() => HardwareStorePage8, { name: 'hardwareStoreUpdateImagePage8' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page8Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage8' })
  deletePage(@Args('id') id: string) {
    this.page9Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page8Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages8' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page9Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page8Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages8' })
  deleteAllPages() {
    this.page9Service.deleteAll();
    this.productService.deleteAll();
    return this.page8Service.deleteAll();
  }

  @Query(() => HardwareStorePage8, { name: 'hardwareStoreGetPage8' })
  findPage(@Args('id') id: string) {
    return this.page8Service.findOne(id);
  }

  @Query(() => HardwareStorePage8, { name: 'hardwareStoreGetPage8BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page8Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage8], { name: 'hardwareStoreGetPages8' })
  findPages() {
    return this.page8Service.findAll();
  }

  @Query(() => [HardwareStorePage8], { name: 'hardwareStoreGetPages8ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page8Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage8], { name: 'hardwareStoreGetPages8BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page8Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage8], { name: 'hardwareStoreGetPages8ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page8Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage8, { name: 'hardwareStoreGetPages8WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage8> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page8Service.findByCursor(
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

  @ResolveField('products', () => [HardwareStoreProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage8) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage9], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage8) {
    return this.page9Service.findByParentId(_id.toString());
  }
}
