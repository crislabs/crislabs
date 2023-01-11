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
  ListHardwareStorePage3,
  HardwareStorePage3,
  HardwareStorePage4,
} from 'src/common/entities/page.model';
import { HardwareStorePage3Service } from '../services/page3.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { HardwareStorePage4Service } from '../services/page4.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage3)
export class HardwareStorePage3Resolver {
  constructor(
    private readonly page3Service: HardwareStorePage3Service,
    private readonly page4Service: HardwareStorePage4Service,
    private readonly productService: HardwareStoreProductService,
  ) { }

  @Mutation(() => HardwareStorePage3, { name: 'hardwareStoreCreatePage3' })
  createPage(@Args('input') input: CreatePage) {
    return this.page3Service.create(input);
  }

  @Mutation(() => HardwareStorePage3, { name: 'hardwareStoreUpdatePage3' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page3Service.update(input);
  }

  @Mutation(() => HardwareStorePage3, { name: 'hardwareStoreUpdateImagePage3' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page3Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage3' })
  deletePage(@Args('id') id: string) {
    this.page4Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page3Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages3' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page4Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page3Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages3' })
  deleteAllPages() {
    this.page4Service.deleteAll();
    this.productService.deleteAll();
    return this.page3Service.deleteAll();
  }

  @Query(() => HardwareStorePage3, { name: 'hardwareStoreGetPage3' })
  findPage(@Args('id') id: string) {
    return this.page3Service.findOne(id);
  }

  @Query(() => HardwareStorePage3, { name: 'hardwareStoreGetPage3BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page3Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage3], { name: 'hardwareStoreGetPages3' })
  findPages() {
    return this.page3Service.findAll();
  }

  @Query(() => [HardwareStorePage3], { name: 'hardwareStoreGetPages3ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page3Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage3], { name: 'hardwareStoreGetPages3BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page3Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage3], { name: 'hardwareStoreGetPages3ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page3Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListHardwareStorePage3, { name: 'hardwareStoreGetPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage3> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page3Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage3) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [HardwareStorePage4], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: HardwareStorePage3) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
