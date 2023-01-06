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
import { PetPage0Service } from 'src/pages/categories/pet/services/page0.service';
import { page0 } from 'src/common/functions/pages';
import { PetPage0 } from 'src/common/entities/page.model';
import { PetUser } from 'src/common/entities/user.model';
import { PetUserService } from './category.service';
import { CreateUser } from 'src/common/dto/user.input';
// import { PetArticleService } from 'src/articles/categories/pet/category.service';
import { PetArticle } from 'src/common/entities/article.model';

@Resolver(() => PetUser)
export class PetUserResolver {
  constructor(
    private readonly userService: PetUserService, 
    // private readonly articleService: PetArticleService,
  ) {}

  @Mutation(() => PetUser, { name: 'petCreateUser' })
  async create(@Args('input') input: CreateUser) {
    const document = await this.userService.create(input);
    return document;
  }

  // @Mutation(() => PetUser, { name: 'petUpdateUser' })
  // update(@Args('input') input: UpdateUser) {
  //   return this.userService.update(input);
  // }

  // @Mutation(() => PetUser, { name: 'petUpdateDbUser' })
  // updateDB(@Args('input') input: UpdateDB) {
  //   return this.userService.updateDB(input);
  // }

  // @Mutation(() => PetUser, { name: 'petUpdateImageUser' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.userService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'petDeleteUser' })
  // deleteOne(@Args('id', { type: () => String }) id: string) {
  //   // this.pageService.deletePagesByParentId([id]);
  //   return this.userService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'petDeleteUsers' })
  // deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   // this.pageService.deletePagesByParentId(ids);
  //   return this.userService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'petDeleteAllUsers' })
  // deleteAllUsers() {
  //   return this.userService.deleteAll();
  // }

  @Query(() => PetUser, { name: 'petGetUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
  @Query(() => PetUser, { name: 'petGetUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
    @Args('siteId', { type: () => String }) siteId: string,
  ) {
    return this.userService.findOneByEmail(email, siteId);
  }

  @Query(() => [PetUser], { name: 'petGetUsers' })
  findAll() {
    return this.userService.findAll();
  }

  // @Query(() => ListUser, { name: 'petGetUsersWithCursor' })
  // async petGetUsersWithCursor(
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

  // @ResolveField('articles', () => [PetArticle], { nullable: 'itemsAndList' })
  // getArticle(@Parent() { _id }: PetUser) {
  //   return this.articleService.findByUserId(_id.toString());
  // }
}
