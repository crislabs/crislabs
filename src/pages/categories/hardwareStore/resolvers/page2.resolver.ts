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
  ListHardwareStorePage2,
  HardwareStorePage2,
  HardwareStorePage3,
} from 'src/common/entities/page.model';
import { HardwareStorePage2Service } from '../services/page2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage3Service } from '../services/page3.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage2)
export class HardwareStorePage2Resolver {
  constructor(
    private readonly page2Service: HardwareStorePage2Service,
    private readonly page3Service: HardwareStorePage3Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage2, { name: 'hardwareStoreCreatePage2' })
  createPage(@Args('input') input: CreatePage) {
    return this.page2Service.create(input);
  }

  @Mutation(() => HardwareStorePage2, { name: 'hardwareStoreUpdatePage2' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page2Service.update(input);
  }

  @Mutation(() => HardwareStorePage2, { name: 'hardwareStoreUpdateImagePage2' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page2Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage2' })
  deletePage(@Args('id') id: string) {
    this.page3Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page2Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages2' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page3Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page2Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages2' })
  deleteAllPages() {
    this.page3Service.deleteAll();
    this.productService.deleteAll();
    return this.page2Service.deleteAll();
  }

  @Query(() => HardwareStorePage2, { name: 'hardwareStoreGetPage2' })
  findPage(@Args('id') id: string) {
    return this.page2Service.findOne(id);
  }

  @Query(() => HardwareStorePage2, { name: 'hardwareStoreGetPage2BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page2Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage2], { name: 'hardwareStoreGetPages2' })
  findPages() {
    return this.page2Service.findAll();
  }

  @Query(() => [HardwareStorePage2], { name: 'hardwareStoreGetPages2ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page2Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage2], { name: 'hardwareStoreGetPages2BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page2Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage2], { name: 'hardwareStoreGetPages2ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page2Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListHardwareStorePage2, { name: 'hardwareStoreGetPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage2> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page2Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage2) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage3], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage2) {
    return this.page3Service.findByParentId(_id.toString());
  }
}
