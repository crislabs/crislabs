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
  ListHardwareStorePage1,
  HardwareStorePage1,
  HardwareStorePage2,
} from 'src/common/entities/page.model';
import { HardwareStorePage1Service } from '../services/page1.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';
import { HardwareStorePage2Service } from '../services/page2.service';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage1)
export class HardwareStorePage1Resolver {
  constructor(
    private readonly page1Service: HardwareStorePage1Service,
    private readonly page2Service: HardwareStorePage2Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage1, { name: 'hardwareStoreCreatePage1' })
  createPage(@Args('input') input: CreatePage) {
    return this.page1Service.create(input);
  }

  @Mutation(() => HardwareStorePage1, { name: 'hardwareStoreUpdatePage1' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page1Service.update(input);
  }

  @Mutation(() => HardwareStorePage1, { name: 'hardwareStoreUpdateImagePage1' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page1Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage1' })
  deletePage(@Args('id') id: string) {
    this.page2Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page1Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages1' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page2Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page1Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages1' })
  deleteAllPages() {
    this.page2Service.deleteAll();
    this.productService.deleteAll();
    return this.page1Service.deleteAll();
  }

  @Query(() => HardwareStorePage1, { name: 'hardwareStoreGetPage1' })
  findPage(@Args('id') id: string) {
    return this.page1Service.findOne(id);
  }

  @Query(() => HardwareStorePage1, { name: 'hardwareStoreGetPage1BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page1Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage1], { name: 'hardwareStoreGetPages1' })
  findPages() {
    return this.page1Service.findAll();
  }

  @Query(() => [HardwareStorePage1], { name: 'hardwareStoreGetPages1BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page1Service.findBySiteId(siteId);
  }


  @Query(() => [HardwareStorePage1], { name: 'hardwareStoreGetPages1ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page1Service.findByParentId(parentId);
  }

  @Query(() => ListHardwareStorePage1, { name: 'hardwareStoreGetPages1WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage1> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page1Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage1) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [HardwareStorePage2], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage1) {
    // const { type } = dataPage as DataPage;
    // const { slug } = type as Type;
    return this.page2Service.findByParentId(_id.toString());
    // if (slug === 'category') {
    // } else {
    //   return null;
    // }
  }
}
