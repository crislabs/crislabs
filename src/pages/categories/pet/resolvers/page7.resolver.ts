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
  ListPetPage7,
  PetPage7,
  PetPage8,
} from 'src/common/entities/page.model';
import { PetPage7Service } from '../services/page7.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage8Service } from '../services/page8.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage7)
export class PetPage7Resolver {
  constructor(
    private readonly page7Service: PetPage7Service,
    private readonly page8Service: PetPage8Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage7, { name: 'petCreatePage7' })
  createPage(@Args('input') input: CreatePage) {
    return this.page7Service.create(input);
  }

  @Mutation(() => PetPage7, { name: 'petUpdatePage7' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page7Service.update(input);
  }

  @Mutation(() => PetPage7, { name: 'petUpdateImagePage7' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page7Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage7' })
  deletePage(@Args('id') id: string) {
    this.page8Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page7Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages7' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page8Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page7Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages7' })
  deleteAllPages() {
    this.page8Service.deleteAll();
    this.productService.deleteAll();
    return this.page7Service.deleteAll();
  }


  @Query(() => PetPage7, { name: 'petGetPage7' })
  findPage(@Args('id') id: string) {
    return this.page7Service.findOne(id);
  }

  @Query(() => PetPage7, { name: 'petGetPage7BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page7Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage7], { name: 'petGetPages7' })
  findPages() {
    return this.page7Service.findAll();
  }

  @Query(() => [PetPage7], { name: 'petGetPages7ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page7Service.findByParentId(parentId);
  }

  @Query(() => [PetPage7], { name: 'petGetPages7BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page7Service.findBySiteId(siteId);
  }

  @Query(() => [PetPage7], { name: 'petGetPages7ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page7Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListPetPage7, { name: 'petGetPages7WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage7> {
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

  @ResolveField('products', () => [PetProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: PetPage7) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage8], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage7) {
    return this.page8Service.findByParentId(_id.toString());
  }
}
