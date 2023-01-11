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
  ListHardwareStorePage11,
  HardwareStorePage11,
  HardwareStorePage12,
} from 'src/common/entities/page.model';
import { HardwareStorePage11Service } from '../services/page11.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage12Service } from '../services/page12.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage11)
export class HardwareStorePage11Resolver {
  constructor(
    private readonly page11Service: HardwareStorePage11Service,
    private readonly page12Service: HardwareStorePage12Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage11, { name: 'hardwareStoreCreatePage11' })
  createPage(@Args('input') input: CreatePage) {
    return this.page11Service.create(input);
  }

  @Mutation(() => HardwareStorePage11, { name: 'hardwareStoreUpdatePage11' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page11Service.update(input);
  }

  @Mutation(() => HardwareStorePage11, { name: 'hardwareStoreUpdateImagePage11' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page11Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage11' })
  deletePage(@Args('id') id: string) {
    this.page12Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page11Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages11' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page12Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page11Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages11' })
  deleteAllPages() {
    this.page12Service.deleteAll();
    this.productService.deleteAll();
    return this.page11Service.deleteAll();
  }

  @Query(() => HardwareStorePage11, { name: 'hardwareStoreGetPage11' })
  findPage(@Args('id') id: string) {
    return this.page11Service.findOne(id);
  }

  @Query(() => HardwareStorePage11, { name: 'hardwareStoreGetPage11BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page11Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage11], { name: 'hardwareStoreGetPages11' })
  findPages() {
    return this.page11Service.findAll();
  }

  @Query(() => [HardwareStorePage11], { name: 'hardwareStoreGetPages11ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page11Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage11], { name: 'hardwareStoreGetPages11BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page11Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage11], { name: 'hardwareStoreGetPages11ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page11Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage11, { name: 'hardwareStoreGetPages11WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage11> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page11Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage11) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [HardwareStorePage12], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage11) {
    return this.page12Service.findByParentId(_id.toString());
  }
}
