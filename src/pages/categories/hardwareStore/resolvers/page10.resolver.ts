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
  ListHardwareStorePage10,
  HardwareStorePage10,
  HardwareStorePage11,
} from 'src/common/entities/page.model';
import { HardwareStorePage10Service } from '../services/page10.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage11Service } from '../services/page11.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage10)
export class HardwareStorePage10Resolver {
  constructor(
    private readonly page10Service: HardwareStorePage10Service,
    private readonly page11Service: HardwareStorePage11Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage10, { name: 'hardwareStoreCreatePage10' })
  createPage(@Args('input') input: CreatePage) {
    return this.page10Service.create(input);
  }

  @Mutation(() => HardwareStorePage10, { name: 'hardwareStoreUpdatePage10' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page10Service.update(input);
  }

  @Mutation(() => HardwareStorePage10, { name: 'hardwareStoreUpdateImagePage10' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page10Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage10' })
  deletePage(@Args('id') id: string) {
    this.page11Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page10Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages10' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page11Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page10Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages10' })
  deleteAllPages() {
    this.page11Service.deleteAll();
    this.productService.deleteAll();
    return this.page10Service.deleteAll();
  }

  @Query(() => HardwareStorePage10, { name: 'hardwareStoreGetPage10' })
  findPage(@Args('id') id: string) {
    return this.page10Service.findOne(id);
  }

  @Query(() => HardwareStorePage10, { name: 'hardwareStoreGetPage10BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page10Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage10], { name: 'hardwareStoreGetPages10' })
  findPages() {
    return this.page10Service.findAll();
  }

  @Query(() => [HardwareStorePage10], { name: 'hardwareStoreGetPages10ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page10Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage10], { name: 'hardwareStoreGetPages10BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page10Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage10], { name: 'hardwareStoreGetPages10ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page10Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage10, { name: 'hardwareStoreGetPages10WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage10> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page10Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage10) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage11], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage10) {
    return this.page11Service.findByParentId(_id.toString());
  }
}
