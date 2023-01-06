import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateComment,
  UpdateComment,
  UpdateLikesComment,
} from 'src/common/dto/comment.input';
import { PortfolioComment } from 'src/common/entities/comment.model';
import { PortfolioCommentService } from './category.service';

@Resolver(() => PortfolioComment)
export class PortfolioCommentResolver {
  constructor(private readonly commentService: PortfolioCommentService) {}

  @Mutation(() => PortfolioComment, { name: 'portfolioCreateComment' })
  create(@Args('input') input: CreateComment) {
    const data = this.commentService.create(input);
    return data;
  }

  @Mutation(() => PortfolioComment, { name: 'portfolioUpdateComment' })
  update(@Args('input') input: UpdateComment) {
    return this.commentService.update(input);
  }

  @Mutation(() => PortfolioComment, { name: 'portfolioUpdateLikesComment' })
  updateLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateLikes(input);
  }
  @Mutation(() => PortfolioComment, { name: 'portfolioUpdateDisLikesComment' })
  updateDisLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateDisLikes(input);
  }

  // @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateImageArticle' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.portfolioService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'portfolioDeleteArticle' })
  // delete(@Args('id') id: string) {
  //   return this.portfolioService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'portfolioDeleteArticles' })
  // deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   return this.portfolioService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'portfolioDeleteAllArticles' })
  // deleteAllArticles() {
  //   return this.portfolioService.deleteAll();
  // }

  // @Query(() => PortfolioArticle, { name: 'portfolioGetArticle' })
  // getArticle(@Args('id') id: string) {
  //   return this.portfolioService.findOne(id);
  // }
  // @Query(() => PortfolioArticle, { name: 'portfolioGetArticleBySlug' })
  // getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
  //   return this.portfolioService.findOneBySlug(slug, siteId);
  // }

  // @Query(() => [PortfolioArticle], { name: 'portfolioGetArticles' })
  // getArticles() {
  //   return this.portfolioService.findAll();
  // }

  @Query(() => [PortfolioComment], { name: 'portfolioGetCommentsByParentId' })
  getByParentId(@Args('parentId') parentId: string) {
    return this.commentService.findByParentId(parentId);
  }
  // // @Query(() => [Article], { name: 'portfolioGetArticlesBySiteId' })
  // // getArticlesBySiteId(@Args('siteId') siteId: string) {
  // //   return this.portfolioService.getArticlesBySiteId(siteId);
  // // }

  // @Query(() => ListPortfolioArticle, { name: 'portfolioGetArticlesWithCursor' })
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('parentId') parentId: string,
  // ): Promise<ListPortfolioArticle> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { data, count } = await this.portfolioService.findByCursor(
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
