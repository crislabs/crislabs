import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PetCommentService } from 'src/comments/categories/pet/category.service';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdatePriceProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from 'src/common/dto/product.input';
import { UpdateImageProduct } from 'src/common/dto/site.input';
import { PetComment } from 'src/common/entities/comment.model';
import { ListPetProduct, PetProduct } from 'src/common/entities/product.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PetProductService } from './category.service';

@Resolver(() => PetProduct)
export class PetProductResolver {
  constructor(
    private readonly productService: PetProductService,
    private readonly commentService: PetCommentService,
  ) {}

  @Mutation(() => PetProduct, { name: 'petCreateProduct' })
  create(@Args('input') input: CreateProduct) {
    return this.productService.create(input);
  }

  @Mutation(() => PetProduct, { name: 'petUpdateProduct' })
  update(@Args('input') input: UpdateProduct) {
    return this.productService.update(input);
  }
  @Mutation(() => PetProduct, { name: 'petUpdateDetailProduct' })
  updateDetail(@Args('input') input: UpdateDetailProduct) {
    return this.productService.updateDetail(input);
  }
  @Mutation(() => PetProduct, { name: 'petUpdatePriceProduct' })
  updatePrice(@Args('input') input: UpdatePriceProduct) {
    return this.productService.updatePrice(input);
  }
  @Mutation(() => PetProduct, { name: 'petUpdateSpecsProduct' })
  updateSpecs(@Args('input') input: UpdateSpecsProduct) {
    return this.productService.updateSpecs(input);
  }
  @Mutation(() => PetProduct, { name: 'petUpdateTagsProduct' })
  updateTags(@Args('input') input: UpdateTagsProduct) {
    return this.productService.updateTags(input);
  }
  @Mutation(() => PetProduct, { name: 'petUpdateLikesProduct' })
  updateLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateLikes(input);
  }
  @Mutation(() => PetProduct, { name: 'petUpdateDisLikesProduct' })
  updateDisLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateDisLikes(input);
  }

  @Mutation(() => PetProduct, {
    name: 'petUpdateImageProduct',
  })
  updateImage(@Args('input') input: UpdateImageProduct) {
    return this.productService.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeleteProduct' })
  deletePage(@Args('id') id: string) {
    return this.productService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeleteProducts' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.productService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllProducts' })
  deleteAllPages() {
    return this.productService.deleteAll();
  }

  @Query(() => PetProduct, { name: 'petGetProduct' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => PetProduct, { name: 'petGetProductBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.productService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetProduct], { name: 'petGetProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => [PetProduct], { name: 'petGetProductsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.productService.findBySiteId(siteId);
  }

  @Query(() => [PetProduct], { name: 'petGetProductsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.productService.findByParentId(parentId);
  }


  @Query(() => ListPetProduct, { name: 'petGetProductsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetProduct> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.productService.findByCursor(
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

  @ResolveField('comments', () => [PetComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: PetProduct) {
    return this.commentService.findByParentId(_id.toString());
  }
}
