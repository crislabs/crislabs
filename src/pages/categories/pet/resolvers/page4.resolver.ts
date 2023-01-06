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
  ListPetPage4,
  PetPage4,
  PetPage5,
} from 'src/common/entities/page.model';
import { PetPage4Service } from '../services/page4.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage5Service } from '../services/page5.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage4)
export class PetPage4Resolver {
  constructor(
    private readonly page4Service: PetPage4Service,
    private readonly page5Service: PetPage5Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage4, { name: 'petCreatePage4' })
  createPage(@Args('input') input: CreatePage) {
    return this.page4Service.create(input);
  }

  @Mutation(() => PetPage4, { name: 'petUpdatePage4' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page4Service.update(input);
  }

  @Mutation(() => PetPage4, { name: 'petUpdateImagePage4' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page4Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage4' })
  deletePage(@Args('id') id: string) {
    this.page5Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page4Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages4' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page5Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page4Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages4' })
  deleteAllPages() {
    this.page5Service.deleteAll();
    this.productService.deleteAll();
    return this.page4Service.deleteAll();
  }

  @Query(() => PetPage4, { name: 'petGetPage4' })
  findPage(@Args('id') id: string) {
    return this.page4Service.findOne(id);
  }

  @Query(() => PetPage4, { name: 'petGetPage4BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page4Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage4], { name: 'petGetPages4' })
  findPages() {
    return this.page4Service.findAll();
  }

  @Query(() => [PetPage4], { name: 'petGetPages4ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page4Service.findByParentId(parentId);
  }

  @Query(() => [PetPage4], { name: 'petGetPages4BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page4Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage4, { name: 'petGetPages4WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage4> {
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

  @ResolveField('products', () => [PetProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: PetPage4) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [PetPage5], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage4) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
