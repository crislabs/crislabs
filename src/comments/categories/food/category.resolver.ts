import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateComment,
  UpdateComment,
  UpdateLikesComment,
} from 'src/common/dto/comment.input';
import { FoodComment } from 'src/common/entities/comment.model';
import { FoodCommentService } from './category.service';

@Resolver(() => FoodComment)
export class FoodCommentResolver {
  constructor(private readonly commentService: FoodCommentService) {}

  @Mutation(() => FoodComment, { name: 'foodCreateComment' })
  create(@Args('input') input: CreateComment) {
    const data = this.commentService.create(input);
    return data;
  }

  @Mutation(() => FoodComment, { name: 'foodUpdateComment' })
  update(@Args('input') input: UpdateComment) {
    return this.commentService.update(input);
  }

  @Mutation(() => FoodComment, { name: 'foodUpdateLikesComment' })
  updateLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateLikes(input);
  }
  @Mutation(() => FoodComment, { name: 'foodUpdateDisLikesComment' })
  updateDisLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateDisLikes(input);
  }

  // @Mutation(() => FoodArticle, { name: 'foodUpdateImageArticle' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.foodService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'foodDeleteArticle' })
  // delete(@Args('id') id: string) {
  //   return this.foodService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'foodDeleteArticles' })
  // deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   return this.foodService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'foodDeleteAllArticles' })
  // deleteAllArticles() {
  //   return this.foodService.deleteAll();
  // }

  // @Query(() => FoodArticle, { name: 'foodGetArticle' })
  // getArticle(@Args('id') id: string) {
  //   return this.foodService.findOne(id);
  // }
  // @Query(() => FoodArticle, { name: 'foodGetArticleBySlug' })
  // getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
  //   return this.foodService.findOneBySlug(slug, siteId);
  // }

  // @Query(() => [FoodArticle], { name: 'foodGetArticles' })
  // getArticles() {
  //   return this.foodService.findAll();
  // }

  @Query(() => [FoodComment], { name: 'foodGetCommentsByParentId' })
  getByParentId(@Args('parentId') parentId: string) {
    return this.commentService.findByParentId(parentId);
  }
  // // @Query(() => [Article], { name: 'foodGetArticlesBySiteId' })
  // // getArticlesBySiteId(@Args('siteId') siteId: string) {
  // //   return this.foodService.getArticlesBySiteId(siteId);
  // // }

  // @Query(() => ListFoodArticle, { name: 'foodGetArticlesWithCursor' })
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('parentId') parentId: string,
  // ): Promise<ListFoodArticle> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { data, count } = await this.foodService.findByCursor(
  //     {
  //       limit,
  //       offset,
  //     },
  //     parentId,
  //   );
  //   const page = connectionFromArraySlice(data, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });

  //   return { page, pageData: { count, limit, offset } };
  // }
}
