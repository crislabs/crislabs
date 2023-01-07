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
  ListHardwareStorePage7,
  HardwareStorePage7,
  HardwareStorePage8,
} from 'src/common/entities/page.model';
import { HardwareStorePage7Service } from '../services/page7.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage8Service } from '../services/page8.service';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage7)
export class HardwareStorePage7Resolver {
  constructor(
    private readonly page7Service: HardwareStorePage7Service,
    private readonly page8Service: HardwareStorePage8Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage7, { name: 'hardwareStoreCreatePage7' })
  createPage(@Args('input') input: CreatePage) {
    return this.page7Service.create(input);
  }

  @Mutation(() => HardwareStorePage7, { name: 'hardwareStoreUpdatePage7' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page7Service.update(input);
  }

  @Mutation(() => HardwareStorePage7, { name: 'hardwareStoreUpdateImagePage7' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page7Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage7' })
  deletePage(@Args('id') id: string) {
    this.page8Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page7Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages7' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page8Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page7Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages7' })
  deleteAllPages() {
    this.page8Service.deleteAll();
    this.productService.deleteAll();
    return this.page7Service.deleteAll();
  }


  @Query(() => HardwareStorePage7, { name: 'hardwareStoreGetPage7' })
  findPage(@Args('id') id: string) {
    return this.page7Service.findOne(id);
  }

  @Query(() => HardwareStorePage7, { name: 'hardwareStoreGetPage7BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page7Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage7], { name: 'hardwareStoreGetPages7' })
  findPages() {
    return this.page7Service.findAll();
  }

  @Query(() => [HardwareStorePage7], { name: 'hardwareStoreGetPages7ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page7Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage7], { name: 'hardwareStoreGetPages7BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page7Service.findBySiteId(siteId);
  }

  @Query(() => ListHardwareStorePage7, { name: 'hardwareStoreGetPages7WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage7> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page7Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage7) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage8], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage7) {
    return this.page8Service.findByParentId(_id.toString());
  }
}
