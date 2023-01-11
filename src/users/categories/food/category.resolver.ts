import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UpdateDB, UpdateImage, UpdateSite } from 'src/common/dto/site.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { FoodPage0Service } from 'src/pages/categories/food/services/page0.service';
import { page0 } from 'src/common/functions/pages';
import { FoodPage0 } from 'src/common/entities/page.model';
import { FoodUser } from 'src/common/entities/user.model';
import { FoodUserService } from './category.service';
import { CreateUser } from 'src/common/dto/user.input';
// import { FoodArticleService } from 'src/articles/categories/food/category.service';
import { FoodArticle } from 'src/common/entities/article.model';

@Resolver(() => FoodUser)
export class FoodUserResolver {
  constructor(
    private readonly userService: FoodUserService, 
    // private readonly articleService: FoodArticleService,
  ) {}

  @Mutation(() => FoodUser, { name: 'foodCreateUser' })
  async create(@Args('input') input: CreateUser) {
    const document = await this.userService.create(input);
    return document;
  }

  // @Mutation(() => FoodUser, { name: 'foodUpdateUser' })
  // update(@Args('input') input: UpdateUser) {
  //   return this.userService.update(input);
  // }

  // @Mutation(() => FoodUser, { name: 'foodUpdateDbUser' })
  // updateDB(@Args('input') input: UpdateDB) {
  //   return this.userService.updateDB(input);
  // }

  // @Mutation(() => FoodUser, { name: 'foodUpdateImageUser' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.userService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'foodDeleteUser' })
  // deleteOne(@Args('id', { type: () => String }) id: string) {
  //   // this.pageService.deletePagesByParentId([id]);
  //   return this.userService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'foodDeleteUsers' })
  // deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   // this.pageService.deletePagesByParentId(ids);
  //   return this.userService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'foodDeleteAllUsers' })
  // deleteAllUsers() {
  //   return this.userService.deleteAll();
  // }

  @Query(() => FoodUser, { name: 'foodGetUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
  @Query(() => FoodUser, { name: 'foodGetUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
    @Args('siteId', { type: () => String }) siteId: string,
  ) {
    return this.userService.findOneByEmail(email, siteId);
  }

  @Query(() => [FoodUser], { name: 'foodGetUsers' })
  findAll() {
    return this.userService.findAll();
  }

  // @Query(() => ListUser, { name: 'foodGetUsersWithCursor' })
  // async foodGetUsersWithCursor(
  //   @Args('args') args: ConnectionArgs,
  // ): Promise<ListUser> {
  //   const { limit, offset } = getPagingParameters(args);
  //   const { data, count } = await this.userService.findByCursor({
  //     limit,
  //     offset,
  //   });
  //   const page = connectionFromArraySlice(data, args, {
  //     arrayLength: count,
  //     sliceStart: offset || 0,
  //   });
  //   return { page, pageData: { count, limit, offset } };
  // }

  // @ResolveField('articles', () => [FoodArticle], { nullable: 'itemsAndList' })
  // getArticle(@Parent() { _id }: FoodUser) {
  //   return this.articleService.findByUserId(_id.toString());
  // }
}
