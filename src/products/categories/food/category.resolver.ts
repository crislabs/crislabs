import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { FoodCommentService } from 'src/comments/categories/food/category.service';
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
import { FoodComment } from 'src/common/entities/comment.model';
import { ListFoodProduct, FoodProduct } from 'src/common/entities/product.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { FoodProductService } from './category.service';

@Resolver(() => FoodProduct)
export class FoodProductResolver {
  constructor(
    private readonly productService: FoodProductService,
    private readonly commentService: FoodCommentService,
  ) {}

  @Mutation(() => FoodProduct, { name: 'foodCreateProduct' })
  create(@Args('input') input: CreateProduct) {
    return this.productService.create(input);
  }

  @Mutation(() => FoodProduct, { name: 'foodUpdateProduct' })
  update(@Args('input') input: UpdateProduct) {
    return this.productService.update(input);
  }
  @Mutation(() => FoodProduct, { name: 'foodUpdateDetailProduct' })
  updateDetail(@Args('input') input: UpdateDetailProduct) {
    return this.productService.updateDetail(input);
  }
  @Mutation(() => FoodProduct, { name: 'foodUpdatePriceProduct' })
  updatePrice(@Args('input') input: UpdatePriceProduct) {
    return this.productService.updatePrice(input);
  }
  @Mutation(() => FoodProduct, { name: 'foodUpdateSpecsProduct' })
  updateSpecs(@Args('input') input: UpdateSpecsProduct) {
    return this.productService.updateSpecs(input);
  }
  @Mutation(() => FoodProduct, { name: 'foodUpdateTagsProduct' })
  updateTags(@Args('input') input: UpdateTagsProduct) {
    return this.productService.updateTags(input);
  }
  @Mutation(() => FoodProduct, { name: 'foodUpdateLikesProduct' })
  updateLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateLikes(input);
  }
  @Mutation(() => FoodProduct, { name: 'foodUpdateDisLikesProduct' })
  updateDisLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateDisLikes(input);
  }

  @Mutation(() => FoodProduct, {
    name: 'foodUpdateImageProduct',
  })
  updateImage(@Args('input') input: UpdateImageProduct) {
    return this.productService.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeleteProduct' })
  deletePage(@Args('id') id: string) {
    return this.productService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeleteProducts' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.productService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllProducts' })
  deleteAllPages() {
    return this.productService.deleteAll();
  }

  @Query(() => FoodProduct, { name: 'foodGetProduct' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => FoodProduct, { name: 'foodGetProductBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.productService.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodProduct], { name: 'foodGetProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => [FoodProduct], { name: 'foodGetProductsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.productService.findBySiteId(siteId);
  }

  @Query(() => [FoodProduct], { name: 'foodGetProductsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.productService.findByParentId(parentId);
  }

  @Query(() => [FoodProduct], { name: 'foodGetProductsByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.productService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodProduct, { name: 'foodGetProductsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodProduct> {
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

  @ResolveField('comments', () => [FoodComment], { nullable: 'itemsAndList' })
  getCommentss(@Parent() { _id }: FoodProduct) {
    return this.commentService.findByParentId(_id.toString());
  }
}
