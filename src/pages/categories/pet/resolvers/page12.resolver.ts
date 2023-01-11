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
  ListPetPage12,
  PetPage12,
} from 'src/common/entities/page.model';
import { PetPage12Service } from '../services/page12.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { ListInput } from 'src/common/pagination/dto/list.input';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage12)
export class PetPage12Resolver {
  constructor(
    private readonly page12Service: PetPage12Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage12, { name: 'petCreatePage12' })
  createPage(@Args('input') input: CreatePage) {
    return this.page12Service.create(input);
  }

  @Mutation(() => PetPage12, { name: 'petUpdatePage12' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page12Service.update(input);
  }

  @Mutation(() => PetPage12, { name: 'petUpdateImagePage12' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page12Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage12' })
  deletePage(@Args('id') id: string) {
    return this.page12Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages12' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page12Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages12' })
  deleteAllPages() {
    return this.page12Service.deleteAll();
  }

  @Query(() => PetPage12, { name: 'petGetPage12' })
  findPage(@Args('id') id: string) {
    return this.page12Service.findOne(id);
  }

  @Query(() => PetPage12, { name: 'petGetPage12BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page12Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage12], { name: 'petGetPages12' })
  findPages() {
    return this.page12Service.findAll();
  }

  @Query(() => [PetPage12], { name: 'petGetPages12ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page12Service.findByParentId(parentId);
  }

  @Query(() => [PetPage12], { name: 'petGetPages12BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page12Service.findBySiteId(siteId);
  }

  @Query(() => [PetPage12], { name: 'petGetPages12ByParentIdByPagination' })
  findPagesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.page12Service.findByParentIdByPagination(listInput,parentId);
  }


  @Query(() => ListPetPage12, { name: 'petGetPages12WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage12> {
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

  @ResolveField('products', () => [PetProduct], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, dataPage }: PetPage12) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }
}
