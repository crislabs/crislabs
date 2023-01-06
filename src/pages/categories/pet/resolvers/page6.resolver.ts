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
  ListPetPage6,
  PetPage6,
  PetPage7,
} from 'src/common/entities/page.model';
import { PetPage6Service } from '../services/page6.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage7Service } from '../services/page7.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage6)
export class PetPage6Resolver {
  constructor(
    private readonly page6Service: PetPage6Service,
    private readonly page7Service: PetPage7Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage6, { name: 'petCreatePage6' })
  createPage(@Args('input') input: CreatePage) {
    return this.page6Service.create(input);
  }

  @Mutation(() => PetPage6, { name: 'petUpdatePage6' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page6Service.update(input);
  }

  @Mutation(() => PetPage6, { name: 'petUpdateImagePage6' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page6Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage6' })
  deletePage(@Args('id') id: string) {
    this.page7Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page6Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages6' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page7Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page6Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages6' })
  deleteAllPages() {
    this.page7Service.deleteAll();
    this.productService.deleteAll();
    return this.page6Service.deleteAll();
  }

  @Query(() => PetPage6, { name: 'petGetPage6' })
  findPage(@Args('id') id: string) {
    return this.page6Service.findOne(id);
  }

  @Query(() => PetPage6, { name: 'petGetPage6BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page6Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage6], { name: 'petGetPages6' })
  findPages() {
    return this.page6Service.findAll();
  }

  @Query(() => [PetPage6], { name: 'petGetPages6ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page6Service.findByParentId(parentId);
  }

  @Query(() => [PetPage6], { name: 'petGetPages6BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page6Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage6, { name: 'petGetPages6WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage6> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page6Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage6) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage7], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage6) {
    return this.page7Service.findByParentId(_id.toString());
  }
}
