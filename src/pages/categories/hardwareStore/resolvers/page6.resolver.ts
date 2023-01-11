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
  ListHardwareStorePage6,
  HardwareStorePage6,
  HardwareStorePage7,
} from 'src/common/entities/page.model';
import { HardwareStorePage6Service } from '../services/page6.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage7Service } from '../services/page7.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage6)
export class HardwareStorePage6Resolver {
  constructor(
    private readonly page6Service: HardwareStorePage6Service,
    private readonly page7Service: HardwareStorePage7Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage6, { name: 'hardwareStoreCreatePage6' })
  createPage(@Args('input') input: CreatePage) {
    return this.page6Service.create(input);
  }

  @Mutation(() => HardwareStorePage6, { name: 'hardwareStoreUpdatePage6' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page6Service.update(input);
  }

  @Mutation(() => HardwareStorePage6, { name: 'hardwareStoreUpdateImagePage6' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page6Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage6' })
  deletePage(@Args('id') id: string) {
    this.page7Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page6Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages6' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page7Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page6Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages6' })
  deleteAllPages() {
    this.page7Service.deleteAll();
    this.productService.deleteAll();
    return this.page6Service.deleteAll();
  }

  @Query(() => HardwareStorePage6, { name: 'hardwareStoreGetPage6' })
  findPage(@Args('id') id: string) {
    return this.page6Service.findOne(id);
  }

  @Query(() => HardwareStorePage6, { name: 'hardwareStoreGetPage6BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page6Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage6], { name: 'hardwareStoreGetPages6' })
  findPages() {
    return this.page6Service.findAll();
  }

  @Query(() => [HardwareStorePage6], { name: 'hardwareStoreGetPages6ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page6Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage6], { name: 'hardwareStoreGetPages6BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page6Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage6], { name: 'hardwareStoreGetPages6ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page6Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage6, { name: 'hardwareStoreGetPages6WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage6> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page6Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage6) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage7], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage6) {
    return this.page7Service.findByParentId(_id.toString());
  }
}
