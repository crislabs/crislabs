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
  ListHardwareStorePage5,
  HardwareStorePage5,
  HardwareStorePage6,
} from 'src/common/entities/page.model';
import { HardwareStorePage5Service } from '../services/page5.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage6Service } from '../services/page6.service';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage5)
export class HardwareStorePage5Resolver {
  constructor(
    private readonly page5Service: HardwareStorePage5Service,
    private readonly page6Service: HardwareStorePage6Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage5, { name: 'hardwareStoreCreatePage5' })
  createPage(@Args('input') input: CreatePage) {
    return this.page5Service.create(input);
  }

  @Mutation(() => HardwareStorePage5, { name: 'hardwareStoreUpdatePage5' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page5Service.update(input);
  }

  @Mutation(() => HardwareStorePage5, { name: 'hardwareStoreUpdateImagePage5' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page5Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage5' })
  deletePage(@Args('id') id: string) {
    this.page6Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page5Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages5' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page6Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page5Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages5' })
  deleteAllPages() {
    this.page6Service.deleteAll();
    this.productService.deleteAll();
    return this.page5Service.deleteAll();
  }

  @Query(() => HardwareStorePage5, { name: 'hardwareStoreGetPage5' })
  findPage(@Args('id') id: string) {
    return this.page5Service.findOne(id);
  }

  @Query(() => HardwareStorePage5, { name: 'hardwareStoreGetPage5BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page5Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage5], { name: 'hardwareStoreGetPages5' })
  findPages() {
    return this.page5Service.findAll();
  }

  @Query(() => [HardwareStorePage5], { name: 'hardwareStoreGetPages5ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page5Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage5], { name: 'hardwareStoreGetPages5BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page5Service.findBySiteId(siteId);
  }

  @Query(() => ListHardwareStorePage5, { name: 'hardwareStoreGetPages5WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage5> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page5Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage5) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage6], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage5) {
    return this.page6Service.findByParentId(_id.toString());
  }
}
