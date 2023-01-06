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
  ListPetPage8,
  PetPage8,
  PetPage9,
} from 'src/common/entities/page.model';
import { PetPage8Service } from '../services/page8.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage9Service } from '../services/page9.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage8)
export class PetPage8Resolver {
  constructor(
    private readonly page8Service: PetPage8Service,
    private readonly page9Service: PetPage9Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage8, { name: 'petCreatePage8' })
  createPage(@Args('input') input: CreatePage) {
    return this.page8Service.create(input);
  }

  @Mutation(() => PetPage8, { name: 'petUpdatePage8' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page8Service.update(input);
  }

  @Mutation(() => PetPage8, { name: 'petUpdateImagePage8' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page8Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage8' })
  deletePage(@Args('id') id: string) {
    this.page9Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page8Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages8' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page9Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page8Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages8' })
  deleteAllPages() {
    this.page9Service.deleteAll();
    this.productService.deleteAll();
    return this.page8Service.deleteAll();
  }

  @Query(() => PetPage8, { name: 'petGetPage8' })
  findPage(@Args('id') id: string) {
    return this.page8Service.findOne(id);
  }

  @Query(() => PetPage8, { name: 'petGetPage8BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page8Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage8], { name: 'petGetPages8' })
  findPages() {
    return this.page8Service.findAll();
  }

  @Query(() => [PetPage8], { name: 'petGetPages8ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page8Service.findByParentId(parentId);
  }

  @Query(() => [PetPage8], { name: 'petGetPages8BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page8Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage8, { name: 'petGetPages8WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage8> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page8Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage8) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage9], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage8) {
    return this.page9Service.findByParentId(_id.toString());
  }
}
