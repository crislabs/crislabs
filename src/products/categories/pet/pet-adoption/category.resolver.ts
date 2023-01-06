import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PetCommentService } from 'src/comments/categories/pet/category.service';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from 'src/common/dto/product.input';
import { UpdateImageProduct } from 'src/common/dto/site.input';
import { PetComment } from 'src/common/entities/comment.model';
import {
  ListPetAdoption,
  PetAdoption,
} from 'src/common/entities/product.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { PetAdoptionService } from './category.service';

@Resolver(() => PetAdoption)
export class PetAdoptionResolver {
  constructor(
    private readonly adoptionService: PetAdoptionService,
    private readonly commentService: PetCommentService,
  ) {}

  @Mutation(() => PetAdoption, { name: 'petCreateAdoption' })
  create(@Args('input') input: CreateProduct) {
    return this.adoptionService.create(input);
  }

  @Mutation(() => PetAdoption, { name: 'petUpdateAdoption' })
  update(@Args('input') input: UpdateProduct) {
    return this.adoptionService.update(input);
  }

  @Mutation(() => PetAdoption, { name: 'petUpdateDetailAdoption' })
  updateDetail(@Args('input') input: UpdateDetailProduct) {
    return this.adoptionService.updateDetail(input);
  }
  @Mutation(() => PetAdoption, { name: 'petUpdateSpecsAdoption' })
  updateSpecs(@Args('input') input: UpdateSpecsProduct) {
    return this.adoptionService.updateSpecs(input);
  }
  @Mutation(() => PetAdoption, { name: 'petUpdateTagsAdoption' })
  updateTags(@Args('input') input: UpdateTagsProduct) {
    return this.adoptionService.updateTags(input);
  }
  @Mutation(() => PetAdoption, { name: 'petUpdateLikesAdoption' })
  updateLikes(@Args('input') input: UpdateLikesProduct) {
    return this.adoptionService.updateLikes(input);
  }
  @Mutation(() => PetAdoption, { name: 'petUpdateDisLikesAdoption' })
  updateDisLikes(@Args('input') input: UpdateLikesProduct) {
    return this.adoptionService.updateDisLikes(input);
  }

  @Mutation(() => PetAdoption, {
    name: 'petUpdateImageAdoption',
  })
  updateImage(@Args('input') input: UpdateImageProduct) {
    return this.adoptionService.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeleteAdoption' })
  deletePage(@Args('id') id: string) {
    return this.adoptionService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeleteAdoptions' })
  deletePagesById(
    @Args('ids', { type: () => [String] }) ids: string[],
    // @Args('type') type: string,
  ) {
    return this.adoptionService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllAdoptions' })
  deleteAllPages() {
    return this.adoptionService.deleteAll();
  }

  @Query(() => PetAdoption, { name: 'petGetAdoption' })
  findOne(@Args('id') id: string) {
    return this.adoptionService.findOne(id);
  }

  @Query(() => PetAdoption, { name: 'petGetAdoptionBySlug' })
  findOneBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.adoptionService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetAdoption], { name: 'petGetAdoptions' })
  findAll() {
    return this.adoptionService.findAll();
  }

  @Query(() => [PetAdoption], { name: 'petGetAdoptionsBySiteId' })
  findBySiteId(@Args('siteId') siteId: string) {
    return this.adoptionService.findBySiteId(siteId);
  }

  @Query(() => [PetAdoption], { name: 'petGetAdoptionsByParentId' })
  findByParentId(@Args('parentId') parentId: string) {
    return this.adoptionService.findByParentId(parentId);
  }

  @Query(() => ListPetAdoption, { name: 'petGetAdoptionsWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetAdoption> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.adoptionService.findByCursor(
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
  getComments(@Parent() { _id }: PetAdoption) {
    return this.commentService.findByParentId(_id.toString());
  }
}
