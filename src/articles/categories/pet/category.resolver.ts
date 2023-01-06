import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PetCommentService } from 'src/comments/categories/pet/category.service';
import {
  CreateArticle,
  UpdateArticle,
  UpdateContentArticle,
  UpdateLikesArticle,
  UpdateTagsArticle,
} from 'src/common/dto/article.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { ListPetArticle, PetArticle } from 'src/common/entities/article.model';
import { PetComment } from 'src/common/entities/comment.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';

import { PetArticleService } from './category.service';

@Resolver(() => PetArticle)
export class PetArticleResolver {
  constructor(
    private readonly petService: PetArticleService,
    private readonly commentService: PetCommentService,
  ) {}

  @Mutation(() => PetArticle, { name: 'petCreateArticle' })
  create(@Args('input') input: CreateArticle) {
    const data = this.petService.create(input);
    return data;
  }

  @Mutation(() => PetArticle, { name: 'petUpdateArticle' })
  update(@Args('input') input: UpdateArticle) {
    return this.petService.update(input);
  }
  @Mutation(() => PetArticle, { name: 'petUpdateContentArticle' })
  updateContent(@Args('input') input: UpdateContentArticle) {
    return this.petService.updateContent(input);
  }
  @Mutation(() => PetArticle, { name: 'petUpdateTagsArticle' })
  updateTags(@Args('input') input: UpdateTagsArticle) {
    return this.petService.updateTags(input);
  }
  
  @Mutation(() => PetArticle, { name: 'petUpdateLikesArticle' })
  updateLikes(@Args('input') input: UpdateLikesArticle) {
    return this.petService.updateLikes(input);
  }
  @Mutation(() => PetArticle, { name: 'petUpdateDisLikesArticle' })
  updateDisLikes(@Args('input') input: UpdateLikesArticle) {
    return this.petService.updateDisLikes(input);
  }

  @Mutation(() => PetArticle, { name: 'petUpdateImageArticle' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.petService.updateImage(input);
  }

  @Mutation(() => String, { name: 'petDeleteArticle' })
  delete(@Args('id') id: string) {
    return this.petService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'petDeleteArticles' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.petService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'petDeleteAllArticles' })
  deleteAllArticles() {
    return this.petService.deleteAll();
  }

  @Query(() => PetArticle, { name: 'petGetArticle' })
  getArticle(@Args('id') id: string) {
    return this.petService.findOne(id);
  }
  @Query(() => PetArticle, { name: 'petGetArticleBySlug' })
  getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
    return this.petService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PetArticle], { name: 'petGetArticles' })
  getArticles() {
    return this.petService.findAll();
  }

  @Query(() => [PetArticle], { name: 'petGetArticlesByParentId' })
  getArticlesByParentId(@Args('parentId') parentId: string) {
    return this.petService.findByParentId(parentId);
  }
  @Query(() => [PetArticle], { name: 'petGetArticlesBySiteId' })
  getArticlesBySiteId(@Args('siteId') siteId: string) {
    return this.petService.findBySiteId(siteId);
  }

  @Query(() => ListPetArticle, { name: 'petGetArticlesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPetArticle> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.petService.findByCursor(
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
  getComments(@Parent() { _id }: PetArticle) {
    return this.commentService.findByParentId(_id.toString());
  }
}
