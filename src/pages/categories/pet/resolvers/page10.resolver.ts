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
  ListPetPage10,
  PetPage10,
  PetPage11,
} from 'src/common/entities/page.model';
import { PetPage10Service } from '../services/page10.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage11Service } from '../services/page11.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage10)
export class PetPage10Resolver {
  constructor(
    private readonly page10Service: PetPage10Service,
    private readonly page11Service: PetPage11Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage10, { name: 'petCreatePage10' })
  createPage(@Args('input') input: CreatePage) {
    return this.page10Service.create(input);
  }

  @Mutation(() => PetPage10, { name: 'petUpdatePage10' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page10Service.update(input);
  }

  @Mutation(() => PetPage10, { name: 'petUpdateImagePage10' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page10Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage10' })
  deletePage(@Args('id') id: string) {
    this.page11Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page10Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages10' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page11Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page10Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages10' })
  deleteAllPages() {
    this.page11Service.deleteAll();
    this.productService.deleteAll();
    return this.page10Service.deleteAll();
  }

  @Query(() => PetPage10, { name: 'petGetPage10' })
  findPage(@Args('id') id: string) {
    return this.page10Service.findOne(id);
  }

  @Query(() => PetPage10, { name: 'petGetPage10BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page10Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage10], { name: 'petGetPages10' })
  findPages() {
    return this.page10Service.findAll();
  }

  @Query(() => [PetPage10], { name: 'petGetPages10ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page10Service.findByParentId(parentId);
  }

  @Query(() => [PetPage10], { name: 'petGetPages10BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page10Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage10, { name: 'petGetPages10WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage10> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page10Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage10) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage11], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage10) {
    return this.page11Service.findByParentId(_id.toString());
  }
}
