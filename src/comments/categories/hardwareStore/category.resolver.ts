import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateComment,
  UpdateComment,
  UpdateLikesComment,
} from 'src/common/dto/comment.input';
import { HardwareStoreComment } from 'src/common/entities/comment.model';
import { HardwareStoreCommentService } from './category.service';

@Resolver(() => HardwareStoreComment)
export class HardwareStoreCommentResolver {
  constructor(private readonly commentService: HardwareStoreCommentService) {}

  @Mutation(() => HardwareStoreComment, { name: 'hardwareStoreCreateComment' })
  create(@Args('input') input: CreateComment) {
    const data = this.commentService.create(input);
    return data;
  }

  @Mutation(() => HardwareStoreComment, { name: 'hardwareStoreUpdateComment' })
  update(@Args('input') input: UpdateComment) {
    return this.commentService.update(input);
  }

  @Mutation(() => HardwareStoreComment, { name: 'hardwareStoreUpdateLikesComment' })
  updateLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateLikes(input);
  }
  @Mutation(() => HardwareStoreComment, { name: 'hardwareStoreUpdateDisLikesComment' })
  updateDisLikes(@Args('input') input: UpdateLikesComment) {
    return this.commentService.updateDisLikes(input);
  }

  // @Mutation(() => HardwareStoreArticle, { name: 'hardwareStoreUpdateImageArticle' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.hardwareStoreService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'hardwareStoreDeleteArticle' })
  // delete(@Args('id') id: string) {
  //   return this.hardwareStoreService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'hardwareStoreDeleteArticles' })
  // deleteArticlesById(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   return this.hardwareStoreService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'hardwareStoreDeleteAllArticles' })
  // deleteAllArticles() {
  //   return this.hardwareStoreService.deleteAll();
  // }

  // @Query(() => HardwareStoreArticle, { name: 'hardwareStoreGetArticle' })
  // getArticle(@Args('id') id: string) {
  //   return this.hardwareStoreService.findOne(id);
  // }
  // @Query(() => HardwareStoreArticle, { name: 'hardwareStoreGetArticleBySlug' })
  // getArticleBySlug(@Args('siteId') siteId: string, @Args('slug') slug: string) {
  //   return this.hardwareStoreService.findOneBySlug(slug, siteId);
  // }

  // @Query(() => [HardwareStoreArticle], { name: 'hardwareStoreGetArticles' })
  // getArticles() {
  //   return this.hardwareStoreService.findAll();
  // }

  @Query(() => [HardwareStoreComment], { name: 'hardwareStoreGetCommentsByParentId' })
  getByParentId(@Args('parentId') parentId: string) {
    return this.commentService.findByParentId(parentId);
  }
  // // @Query(() => [Article], { name: 'hardwareStoreGetArticlesBySiteId' })
  // // getArticlesBySiteId(@Args('siteId') siteId: string) {
  // //   return this.hardwareStoreService.getArticlesBySiteId(siteId);
  // // }

  // @Query(() => ListHardwareStoreArticle, { name: 'hardwareStoreGetArticlesWithCursor' })
  // async findAllWithCursor(
  //   @Args('args') args: ConnectionArgs,
  //   @Args('parentId') parentId: string,
  // ): Promise<ListHardwareStoreArticle> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { data, count } = await this.hardwareStoreService.findByCursor(
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
