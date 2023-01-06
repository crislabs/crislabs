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
  ListPetPage9,
  PetPage10,
  PetPage9,
} from 'src/common/entities/page.model';
import { PetPage9Service } from '../services/page9.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage10Service } from '../services/page10.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage9)
export class PetPage9Resolver {
  constructor(
    private readonly page9Service: PetPage9Service,
    private readonly page10Service: PetPage10Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage9, { name: 'petCreatePage9' })
  createPage(@Args('input') input: CreatePage) {
    return this.page9Service.create(input);
  }

  @Mutation(() => PetPage9, { name: 'petUpdatePage9' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page9Service.update(input);
  }

  @Mutation(() => PetPage9, { name: 'petUpdateImagePage9' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page9Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage9' })
  deletePage(@Args('id') id: string) {
    this.page10Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page9Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages9' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page10Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page9Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages9' })
  deleteAllPages() {
    this.page10Service.deleteAll();
    this.productService.deleteAll();
    return this.page9Service.deleteAll();
  }

  @Query(() => PetPage9, { name: 'petGetPage9' })
  findPage(@Args('id') id: string) {
    return this.page9Service.findOne(id);
  }

  @Query(() => PetPage9, { name: 'petGetPage9BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page9Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage9], { name: 'petGetPages9' })
  findPages() {
    return this.page9Service.findAll();
  }

  @Query(() => [PetPage9], { name: 'petGetPages9ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page9Service.findByParentId(parentId);
  }

  @Query(() => [PetPage9], { name: 'petGetPages9BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page9Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage9, { name: 'petGetPages9WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage9> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page9Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage9) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage10], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage9) {
    return this.page10Service.findByParentId(_id.toString());
  }
}
