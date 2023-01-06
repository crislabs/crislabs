import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';
// import { PortfolioCommentService } from 'src/comments/categories/portfolio/category.service';
import {
  CreateArticle,
  UpdateArticle,
  UpdateContentArticle,
  UpdateLikesArticle,
  UpdateTagsArticle,
} from 'src/common/dto/article.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { ListPortfolioArticle, PortfolioArticle } from 'src/common/entities/article.model';
import { PortfolioComment } from 'src/common/entities/comment.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';

import { PortfolioArticleService } from './category.service';

@Resolver(() => PortfolioArticle)
export class PortfolioArticleResolver {
  constructor(
    private readonly portfolioService: PortfolioArticleService,
    private readonly commentService: PortfolioCommentService,
  ) {}

  @Mutation(() => PortfolioArticle, { name: 'portfolioCreateArticle' })
  create(@Args('input') input: CreateArticle) {
    const data = this.portfolioService.create(input);
    return data;
  }

  @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateArticle' })
  update(@Args('input') input: UpdateArticle) {
    return this.portfolioService.update(input);
  }
  @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateContentArticle' })
  updateContent(@Args('input') input: UpdateContentArticle) {
    return this.portfolioService.updateContent(input);
  }
  @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateTagsArticle' })
  updateTags(@Args('input') input: UpdateTagsArticle) {
    return this.portfolioService.updateTags(input);
  }
  
  @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateLikesArticle' })
  updateLikes(@Args('input') input: UpdateLikesArticle) {
    return this.portfolioService.updateLikes(input);
  }
  @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateDisLikesArticle' })
  updateDisLikes(@Args('input') input: UpdateLikesArticle) {
    return this.portfolioService.updateDisLikes(input);
  }

  @Mutation(() => PortfolioArticle, { name: 'portfolioUpdateImageArticle' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.portfolioService.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeleteArticle' })
  delete(@Args('id') id: string) {
    return this.portfolioService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeleteArticles' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.portfolioService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllArticles' })
  deleteAllArticles() {
    return this.portfolioService.deleteAll();
  }

  @Query(() => PortfolioArticle, { name: 'portfolioGetArticle' })
  getArticle(@Args('id') id: string) {
    return this.portfolioService.findOne(id);
  }
  @Query(() => PortfolioArticle, { name: 'portfolioGetArticleBySlug' })
  getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
    return this.portfolioService.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioArticle], { name: 'portfolioGetArticles' })
  getArticles() {
    return this.portfolioService.findAll();
  }

  @Query(() => [PortfolioArticle], { name: 'portfolioGetArticlesByParentId' })
  getArticlesByParentId(@Args('parentId') parentId: string) {
    return this.portfolioService.findByParentId(parentId);
  }
  
  @Query(() => [PortfolioArticle], { name: 'portfolioGetArticlesBySiteId' })
  getArticlesBySiteId(@Args('siteId') siteId: string) {
    return this.portfolioService.findBySiteId(siteId);
  }

  @Query(() => ListPortfolioArticle, { name: 'portfolioGetArticlesWithCursorByParentId' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioArticle> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.portfolioService.findByParentIdCursor(
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
  @Query(() => ListPortfolioArticle, { name: 'portfolioGetArticlesWithCursorBySiteId' })
  async findAllWithCursorBySiteId(
    @Args('args') args: ConnectionArgs,
    @Args('siteId') siteId: string,
  ): Promise<ListPortfolioArticle> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.portfolioService.findBySiteIdCursor(
      {
        limit,
        offset,
      },
      siteId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('comments', () => [PortfolioComment], { nullable: 'itemsAndList' })
  getComments(@Parent() { _id }: PortfolioArticle) {
    return this.commentService.findByParentId(_id.toString());
  }
}
