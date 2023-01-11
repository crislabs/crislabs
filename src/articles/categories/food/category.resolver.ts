import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { FoodCommentService } from 'src/comments/categories/food/category.service';
import {
  CreateArticle,
  UpdateArticle,
  UpdateContentArticle,
  UpdateLikesArticle,
  UpdateTagsArticle,
} from 'src/common/dto/article.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { ListFoodArticle, FoodArticle } from 'src/common/entities/article.model';
import { FoodComment } from 'src/common/entities/comment.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';

import { FoodArticleService } from './category.service';

@Resolver(() => FoodArticle)
export class FoodArticleResolver {
  constructor(
    private readonly foodService: FoodArticleService,
    private readonly commentService: FoodCommentService,
  ) {}

  @Mutation(() => FoodArticle, { name: 'foodCreateArticle' })
  create(@Args('input') input: CreateArticle) {
    const data = this.foodService.create(input);
    return data;
  }

  @Mutation(() => FoodArticle, { name: 'foodUpdateArticle' })
  update(@Args('input') input: UpdateArticle) {
    return this.foodService.update(input);
  }
  @Mutation(() => FoodArticle, { name: 'foodUpdateContentArticle' })
  updateContent(@Args('input') input: UpdateContentArticle) {
    return this.foodService.updateContent(input);
  }
  @Mutation(() => FoodArticle, { name: 'foodUpdateTagsArticle' })
  updateTags(@Args('input') input: UpdateTagsArticle) {
    return this.foodService.updateTags(input);
  }
  
  @Mutation(() => FoodArticle, { name: 'foodUpdateLikesArticle' })
  updateLikes(@Args('input') input: UpdateLikesArticle) {
    return this.foodService.updateLikes(input);
  }
  @Mutation(() => FoodArticle, { name: 'foodUpdateDisLikesArticle' })
  updateDisLikes(@Args('input') input: UpdateLikesArticle) {
    return this.foodService.updateDisLikes(input);
  }

  @Mutation(() => FoodArticle, { name: 'foodUpdateImageArticle' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.foodService.updateImage(input);
  }

  @Mutation(() => String, { name: 'foodDeleteArticle' })
  delete(@Args('id') id: string) {
    return this.foodService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'foodDeleteArticles' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.foodService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'foodDeleteAllArticles' })
  deleteAllArticles() {
    return this.foodService.deleteAll();
  }

  @Query(() => FoodArticle, { name: 'foodGetArticle' })
  getArticle(@Args('id') id: string) {
    return this.foodService.findOne(id);
  }
  @Query(() => FoodArticle, { name: 'foodGetArticleBySlug' })
  getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
    return this.foodService.findOneBySlug(slug, siteId);
  }

  @Query(() => [FoodArticle], { name: 'foodGetArticles' })
  getArticles() {
    return this.foodService.findAll();
  }

  @Query(() => [FoodArticle], { name: 'foodGetArticlesByParentId' })
  getArticlesByParentId(@Args('parentId') parentId: string) {
    return this.foodService.findByParentId(parentId);
  }
  @Query(() => [FoodArticle], { name: 'foodGetArticlesBySiteId' })
  getArticlesBySiteId(@Args('siteId') siteId: string) {
    return this.foodService.findBySiteId(siteId);
  }

  @Query(() => [FoodArticle], { name: 'foodGetArticlesByParentIdByPagination' })
  findArticlesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.foodService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListFoodArticle, { name: 'foodGetArticlesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListFoodArticle> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.foodService.findByCursor(
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
  getComments(@Parent() { _id }: FoodArticle) {
    return this.commentService.findByParentId(_id.toString());
  }
}
