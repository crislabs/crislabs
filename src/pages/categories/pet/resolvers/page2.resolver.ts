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
  ListPetPage2,
  PetPage2,
  PetPage3,
} from 'src/common/entities/page.model';
import { PetPage2Service } from '../services/page2.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage3Service } from '../services/page3.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage2)
export class PetPage2Resolver {
  constructor(
    private readonly page2Service: PetPage2Service,
    private readonly page3Service: PetPage3Service,
    private readonly productService: PetProductService,
  ) {}

  @Mutation(() => PetPage2, { name: 'petCreatePage2' })
  createPage(@Args('input') input: CreatePage) {
    return this.page2Service.create(input);
  }

  @Mutation(() => PetPage2, { name: 'petUpdatePage2' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page2Service.update(input);
  }

  @Mutation(() => PetPage2, { name: 'petUpdateImagePage2' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page2Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage2' })
  deletePage(@Args('id') id: string) {
    this.page3Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page2Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages2' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page3Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page2Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages2' })
  deleteAllPages() {
    this.page3Service.deleteAll();
    this.productService.deleteAll();
    return this.page2Service.deleteAll();
  }

  @Query(() => PetPage2, { name: 'petGetPage2' })
  findPage(@Args('id') id: string) {
    return this.page2Service.findOne(id);
  }

  @Query(() => PetPage2, { name: 'petGetPage2BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page2Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage2], { name: 'petGetPages2' })
  findPages() {
    return this.page2Service.findAll();
  }

  @Query(() => [PetPage2], { name: 'petGetPages2ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page2Service.findByParentId(parentId);
  }

  @Query(() => [PetPage2], { name: 'petGetPages2BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page2Service.findBySiteId(siteId);
  }


  @Query(() => ListPetPage2, { name: 'petGetPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage2> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page2Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage2) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage3], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage2) {
    return this.page3Service.findByParentId(_id.toString());
  }
}
