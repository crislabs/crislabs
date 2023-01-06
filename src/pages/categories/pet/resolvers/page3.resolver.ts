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
  ListPetPage3,
  PetPage3,
  PetPage4,
} from 'src/common/entities/page.model';
import { PetPage3Service } from '../services/page3.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PetProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';
import { PetPage4Service } from '../services/page4.service';
// import { PetProductService } from 'src/products/categories/pet/pet-product/category.service';

@Resolver(() => PetPage3)
export class PetPage3Resolver {
  constructor(
    private readonly page3Service: PetPage3Service,
    private readonly page4Service: PetPage4Service,
    private readonly productService: PetProductService,
  ) { }

  @Mutation(() => PetPage3, { name: 'petCreatePage3' })
  createPage(@Args('input') input: CreatePage) {
    return this.page3Service.create(input);
  }

  @Mutation(() => PetPage3, { name: 'petUpdatePage3' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page3Service.update(input);
  }

  @Mutation(() => PetPage3, { name: 'petUpdateImagePage3' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page3Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeletePage3' })
  deletePage(@Args('id') id: string) {
    this.page4Service.deleteManyByParentId([id]);
    this.productService.deleteManyByParentId([id]);
    return this.page3Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeletePages3' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page4Service.deleteManyByParentId(ids);
    this.productService.deleteManyByParentId(ids);
    return this.page3Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllPages3' })
  deleteAllPages() {
    this.page4Service.deleteAll();
    this.productService.deleteAll();
    return this.page3Service.deleteAll();
  }

  @Query(() => PetPage3, { name: 'petGetPage3' })
  findPage(@Args('id') id: string) {
    return this.page3Service.findOne(id);
  }

  @Query(() => PetPage3, { name: 'petGetPage3BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page3Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetPage3], { name: 'petGetPages3' })
  findPages() {
    return this.page3Service.findAll();
  }

  @Query(() => [PetPage3], { name: 'petGetPages3ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page3Service.findByParentId(parentId);
  }

  @Query(() => [PetPage3], { name: 'petGetPages3BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page3Service.findBySiteId(siteId);
  }


  @Query(() => ListPetPage3, { name: 'petGetPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetPage3> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page3Service.findByCursor(
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
  getProduct(@Parent() { _id, dataPage }: PetPage3) {
    const { type } = dataPage as DataPage;
    if (type === 'pet') {
      return this.productService.findByParentId(_id.toString());
    } else {
      return null;
    }
  }

  @ResolveField('pages', () => [PetPage4], { nullable: 'itemsAndList' })
  getPages(@Parent() { _id, dataPage }: PetPage3) {
    return this.page4Service.findByParentId(_id.toString());
  }
}
