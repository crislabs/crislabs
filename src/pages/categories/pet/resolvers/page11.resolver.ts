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
  ListPetPage11,
  PetPage11,
  PetPage12,
} from 'src/common/entities/page.model';
import { PetPage11Service } from '../services/page11.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage12Service } from '../services/page12.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage11)
export class PetPage11Resolver {
  constructor(
    private readonly page11Service: PetPage11Service,
    private readonly page12Service: PetPage12Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage11, { name: 'petCreatePage11' })
  createPage(@Args('input') input: CreatePage) {
    return this.page11Service.create(input);
  }

  @Mutation(() => PetPage11, { name: 'petUpdatePage11' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page11Service.update(input);
  }

  @Mutation(() => PetPage11, { name: 'petUpdateImagePage11' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page11Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage11' })
  deletePage(@Args('id') id: string) {
    this.page12Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page11Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages11' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page12Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page11Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages11' })
  deleteAllPages() {
    this.page12Service.deleteAll();
    this.productService.deleteAll();
    return this.page11Service.deleteAll();
  }

  @Query(() => PetPage11, { name: 'petGetPage11' })
  findPage(@Args('id') id: string) {
    return this.page11Service.findOne(id);
  }

  @Query(() => PetPage11, { name: 'petGetPage11BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page11Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage11], { name: 'petGetPages11' })
  findPages() {
    return this.page11Service.findAll();
  }

  @Query(() => [PetPage11], { name: 'petGetPages11ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page11Service.findByParentId(parentId);
  }

  @Query(() => [PetPage11], { name: 'petGetPages11BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page11Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage11, { name: 'petGetPages11WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage11> {
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

  @ResolveField('products', () => [PetProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: PetPage11) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
  @ResolveField('pages', () => [PetPage12], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage11) {
    return this.page12Service.findByParentId(_id.toString());
  }
}
