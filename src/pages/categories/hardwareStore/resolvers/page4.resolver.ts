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
  ListHardwareStorePage4,
  HardwareStorePage4,
  HardwareStorePage5,
} from 'src/common/entities/page.model';
import { HardwareStorePage4Service } from '../services/page4.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage5Service } from '../services/page5.service';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage4)
export class HardwareStorePage4Resolver {
  constructor(
    private readonly page4Service: HardwareStorePage4Service,
    private readonly page5Service: HardwareStorePage5Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage4, { name: 'hardwareStoreCreatePage4' })
  createPage(@Args('input') input: CreatePage) {
    return this.page4Service.create(input);
  }

  @Mutation(() => HardwareStorePage4, { name: 'hardwareStoreUpdatePage4' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page4Service.update(input);
  }

  @Mutation(() => HardwareStorePage4, { name: 'hardwareStoreUpdateImagePage4' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page4Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage4' })
  deletePage(@Args('id') id: string) {
    this.page5Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page4Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages4' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page5Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page4Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages4' })
  deleteAllPages() {
    this.page5Service.deleteAll();
    this.productService.deleteAll();
    return this.page4Service.deleteAll();
  }

  @Query(() => HardwareStorePage4, { name: 'hardwareStoreGetPage4' })
  findPage(@Args('id') id: string) {
    return this.page4Service.findOne(id);
  }

  @Query(() => HardwareStorePage4, { name: 'hardwareStoreGetPage4BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page4Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage4], { name: 'hardwareStoreGetPages4' })
  findPages() {
    return this.page4Service.findAll();
  }

  @Query(() => [HardwareStorePage4], { name: 'hardwareStoreGetPages4ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page4Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage4], { name: 'hardwareStoreGetPages4BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page4Service.findBySiteId(siteId);
  }

  @Query(() => ListHardwareStorePage4, { name: 'hardwareStoreGetPages4WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage4> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page4Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage4) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [HardwareStorePage5], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage4) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
