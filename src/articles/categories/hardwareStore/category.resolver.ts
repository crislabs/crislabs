import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { HardwareStoreCommentService } from 'src/comments/categories/hardwareStore/category.service';
import {
  CreateArticle,
  UpdateArticle,
  UpdateContentArticle,
  UpdateLikesArticle,
  UpdateTagsArticle,
} from 'src/common/dto/article.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { ListHardwareStoreArticle, HardwareStoreArticle } from 'src/common/entities/article.model';
import { HardwareStoreComment } from 'src/common/entities/comment.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';

import { HardwareStoreArticleService } from './category.service';

@Resolver(() => HardwareStoreArticle)
export class HardwareStoreArticleResolver {
  constructor(
    private readonly hardwareStoreService: HardwareStoreArticleService,
    private readonly commentService: HardwareStoreCommentService,
  ) {}

  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreCreateArticle' })
  create(@Args('input') input: CreateArticle) {
    const data = this.hardwareStoreService.create(input);
    return data;
  }

  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateArticle' })
  update(@Args('input') input: UpdateArticle) {
    return this.hardwareStoreService.update(input);
  }
  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateContentArticle' })
  updateContent(@Args('input') input: UpdateContentArticle) {
    return this.hardwareStoreService.updateContent(input);
  }
  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateTagsArticle' })
  updateTags(@Args('input') input: UpdateTagsArticle) {
    return this.hardwareStoreService.updateTags(input);
  }
  
  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateLikesArticle' })
  updateLikes(@Args('input') input: UpdateLikesArticle) {
    return this.hardwareStoreService.updateLikes(input);
  }
  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateDisLikesArticle' })
  updateDisLikes(@Args('input') input: UpdateLikesArticle) {
    return this.hardwareStoreService.updateDisLikes(input);
  }

  @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateImageArticle' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.hardwareStoreService.updateImage(input);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteArticle' })
  delete(@Args('id') id: string) {
    return this.hardwareStoreService.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'hardwareStoreDeleteArticles' })
  deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.hardwareStoreService.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'hardwareStoreDeleteAllArticles' })
  deleteAllArticles() {
    return this.hardwareStoreService.deleteAll();
  }

  @Query(() => HardwareStoreArticle, { name: 'hardwareStoreGetArticle' })
  getArticle(@Args('id') id: string) {
    return this.hardwareStoreService.findOne(id);
  }
  @Query(() => HardwareStoreArticle, { name: 'hardwareStoreGetArticleBySlug' })
  getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
    return this.hardwareStoreService.findOneBySlug(slug, siteId);
  }

  @Query(() => [HardwareStoreArticle], { name: 'hardwareStoreGetArticles' })
  getArticles() {
    return this.hardwareStoreService.findAll();
  }

  @Query(() => [HardwareStoreArticle], { name: 'hardwareStoreGetArticlesByParentId' })
  getArticlesByParentId(@Args('parentId') parentId: string) {
    return this.hardwareStoreService.findByParentId(parentId);
  }
  @Query(() => [HardwareStoreArticle], { name: 'hardwareStoreGetArticlesBySiteId' })
  getArticlesBySiteId(@Args('siteId') siteId: string) {
    return this.hardwareStoreService.findBySiteId(siteId);
  }

  @Query(() => [HardwareStoreArticle], { name: 'hardwareStoreGetArticlesByParentIdByPagination' })
  findArticlesByParentIdByPagination(
    @Args('listInput') listInput: ListInput,
    @Args('parentId') parentId: string,
  ) {
    return this.hardwareStoreService.findByParentIdByPagination(listInput,parentId);
  }

  @Query(() => ListHardwareStoreArticle, { name: 'hardwareStoreGetArticlesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListHardwareStoreArticle> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.hardwareStoreService.findByCursor(
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
  getComments(@Parent() { _id }: HardwareStoreArticle) {
    return this.commentService.findByParentId(_id.toString());
  }
}
