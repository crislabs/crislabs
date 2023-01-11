import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { HardwareStoreCommentService } from 'src/comments/categories/hardwareStore/category.service';
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
import { HardwareStoreComment } from 'src/common/entities/comment.model';
import { ListHardwareStoreProduct, HardwareStoreProduct } from 'src/common/entities/product.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { HardwareStoreProductService } from './category.service';

@Resolver(() => HardwareStoreProduct)
export class HardwareStoreProductResolver {
  constructor(
    private readonly productService: HardwareStoreProductService,
    private readonly commentService: HardwareStoreCommentService,
  ) {}

  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreCreateProduct' })
  create(@Args('input') input: CreateProduct) {
    return this.productService.create(input);
  }

  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdateProduct' })
  update(@Args('input') input: UpdateProduct) {
    return this.productService.update(input);
  }
  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdateDetailProduct' })
  updateDetail(@Args('input') input: UpdateDetailProduct) {
    return this.productService.updateDetail(input);
  }
  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdatePriceProduct' })
  updatePrice(@Args('input') input: UpdatePriceProduct) {
    return this.productService.updatePrice(input);
  }
  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdateSpecsProduct' })
  updateSpecs(@Args('input') input: UpdateSpecsProduct) {
    return this.productService.updateSpecs(input);
  }
  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdateTagsProduct' })
  updateTags(@Args('input') input: UpdateTagsProduct) {
    return this.productService.updateTags(input);
  }
  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdateLikesProduct' })
  updateLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateLikes(input);
  }
  @Mutation(() => HardwareStoreProduct, { name: 'hardwareStoreUpdateDisLikesProduct' })
  updateDisLikes(@Args('input') input: UpdateLikesProduct) {
    return this.productService.updateDisLikes(input);
  }

  @Mutation(() => HardwareStoreProduct, {
    name: 'hardwareStoreUpdateImageProduct',
  })
  updateImage(@Args('input') input: UpdateImageProduct) {
    return this.productService.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteProduct' })
  deletePage(@Args('id') id: string) {
    return this.productService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeleteProducts' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.productService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllProducts' })
  deleteAllPages() {
    return this.productService.deleteAll();
  }

  @Query(() => HardwareStoreProduct, { name: 'hardwareStoreGetProduct' })
  findOne(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Query(() => HardwareStoreProduct, { name: 'hardwareStoreGetProductBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.productService.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStoreProduct], { name: 'hardwareStoreGetProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => [HardwareStoreProduct], { name: 'hardwareStoreGetProductsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.productService.findBySiteId(siteId);
  }

  @Query(() => [HardwareStoreProduct], { name: 'hardwareStoreGetProductsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.productService.findByParentId(parentId);
  }

  @Query(() => [HardwareStoreProduct], { name: 'hardwareStoreGetProductsByParentIdByPagination' })
  findByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.productService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStoreProduct, { name: 'hardwareStoreGetProductsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStoreProduct> {
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

  @ResolveField('comments', () => [HardwareStoreComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: HardwareStoreProduct) {
    return this.commentService.findByParentId(_id.toString());
  }
}
