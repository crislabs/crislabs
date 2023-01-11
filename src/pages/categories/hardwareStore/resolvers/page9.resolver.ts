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
  ListHardwareStorePage9,
  HardwareStorePage10,
  HardwareStorePage9,
} from 'src/common/entities/page.model';
import { HardwareStorePage9Service } from '../services/page9.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage10Service } from '../services/page10.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage9)
export class HardwareStorePage9Resolver {
  constructor(
    private readonly page9Service: HardwareStorePage9Service,
    private readonly page10Service: HardwareStorePage10Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage9, { name: 'hardwareStoreCreatePage9' })
  createPage(@Args('input') input: CreatePage) {
    return this.page9Service.create(input);
  }

  @Mutation(() => HardwareStorePage9, { name: 'hardwareStoreUpdatePage9' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page9Service.update(input);
  }

  @Mutation(() => HardwareStorePage9, { name: 'hardwareStoreUpdateImagePage9' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page9Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage9' })
  deletePage(@Args('id') id: string) {
    this.page10Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page9Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages9' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page10Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page9Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages9' })
  deleteAllPages() {
    this.page10Service.deleteAll();
    this.productService.deleteAll();
    return this.page9Service.deleteAll();
  }

  @Query(() => HardwareStorePage9, { name: 'hardwareStoreGetPage9' })
  findPage(@Args('id') id: string) {
    return this.page9Service.findOne(id);
  }

  @Query(() => HardwareStorePage9, { name: 'hardwareStoreGetPage9BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page9Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage9], { name: 'hardwareStoreGetPages9' })
  findPages() {
    return this.page9Service.findAll();
  }

  @Query(() => [HardwareStorePage9], { name: 'hardwareStoreGetPages9ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
  ) {
    return this.page9Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage9], { name: 'hardwareStoreGetPages9BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page9Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage9], { name: 'hardwareStoreGetPages9ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page9Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage9, { name: 'hardwareStoreGetPages9WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage9> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page9Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage9) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage10], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage9) {
    return this.page10Service.findByParentId(_id.toString());
  }
}
