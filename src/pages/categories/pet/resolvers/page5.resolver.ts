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
  ListPetPage5,
  PetPage5,
  PetPage6,
} from 'src/common/entities/page.model';
import { PetPage5Service } from '../services/page5.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage6Service } from '../services/page6.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage5)
export class PetPage5Resolver {
  constructor(
    private readonly page5Service: PetPage5Service,
    private readonly page6Service: PetPage6Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage5, { name: 'petCreatePage5' })
  createPage(@Args('input') input: CreatePage) {
    return this.page5Service.create(input);
  }

  @Mutation(() => PetPage5, { name: 'petUpdatePage5' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page5Service.update(input);
  }

  @Mutation(() => PetPage5, { name: 'petUpdateImagePage5' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page5Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage5' })
  deletePage(@Args('id') id: string) {
    this.page6Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page5Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages5' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page6Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page5Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages5' })
  deleteAllPages() {
    this.page6Service.deleteAll();
    this.productService.deleteAll();
    return this.page5Service.deleteAll();
  }

  @Query(() => PetPage5, { name: 'petGetPage5' })
  findPage(@Args('id') id: string) {
    return this.page5Service.findOne(id);
  }

  @Query(() => PetPage5, { name: 'petGetPage5BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page5Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage5], { name: 'petGetPages5' })
  findPages() {
    return this.page5Service.findAll();
  }

  @Query(() => [PetPage5], { name: 'petGetPages5ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page5Service.findByParentId(parentId);
  }

  @Query(() => [PetPage5], { name: 'petGetPages5BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page5Service.findBySiteId(siteId);
  }

  @Query(() => ListPetPage5, { name: 'petGetPages5WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage5> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page5Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage5) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage6], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage5) {
    return this.page6Service.findByParentId(_id.toString());
  }
}
