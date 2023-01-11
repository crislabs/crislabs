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
  ListHardwareStorePage12,
  HardwareStorePage12,
} from 'src/common/entities/page.model';
import { HardwareStorePage12Service } from '../services/page12.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { HardwareStoreProductService } from 'src/products/categories/hardwareStore/hardwareStore/category.service';

@Resolver(() => HardwareStorePage12)
export class HardwareStorePage12Resolver {
  constructor(
    private readonly page12Service: HardwareStorePage12Service,
    private readonly productService: HardwareStoreProductService,
  ) {}

  @Mutation(() => HardwareStorePage12, { name: 'hardwareStoreCreatePage12' })
  createPage(@Args('input') input: CreatePage) {
    return this.page12Service.create(input);
  }

  @Mutation(() => HardwareStorePage12, { name: 'hardwareStoreUpdatePage12' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page12Service.update(input);
  }

  @Mutation(() => HardwareStorePage12, { name: 'hardwareStoreUpdateImagePage12' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page12Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeletePage12' })
  deletePage(@Args('id') id: string) {
    return this.page12Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeletePages12' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page12Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllPages12' })
  deleteAllPages() {
    return this.page12Service.deleteAll();
  }

  @Query(() => HardwareStorePage12, { name: 'hardwareStoreGetPage12' })
  findPage(@Args('id') id: string) {
    return this.page12Service.findOne(id);
  }

  @Query(() => HardwareStorePage12, { name: 'hardwareStoreGetPage12BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page12Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStorePage12], { name: 'hardwareStoreGetPages12' })
  findPages() {
    return this.page12Service.findAll();
  }

  @Query(() => [HardwareStorePage12], { name: 'hardwareStoreGetPages12ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page12Service.findByParentId(parentId);
  }

  @Query(() => [HardwareStorePage12], { name: 'hardwareStoreGetPages12BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page12Service.findBySiteId(siteId);
  }

  @Query(() => [HardwareStorePage12], { name: 'hardwareStoreGetPages12ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page12Service.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStorePage12, { name: 'hardwareStoreGetPages12WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStorePage12> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page12Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: HardwareStorePage12) {
    const { type } = dataPage as DataPage;
    if (type === 'hardwareStore') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
