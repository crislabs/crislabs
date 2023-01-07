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
import { HardwareStorePage0Service } from 'src/pages/categories/hardwareStore/services/page0.service';
import { page0 } from 'src/common/functions/pages';
import { HardwareStorePage0 } from 'src/common/entities/page.model';
import { HardwareStoreUser } from 'src/common/entities/user.model';
import { HardwareStoreUserService } from './category.service';
import { CreateUser } from 'src/common/dto/user.input';
// import { HardwareStoreArticleService } from 'src/articles/categories/hardwareStore/category.service';
import { HardwareStoreArticle } from 'src/common/entities/article.model';

@Resolver(() => HardwareStoreUser)
export class HardwareStoreUserResolver {
  constructor(
    private readonly userService: HardwareStoreUserService, 
    // private readonly articleService: HardwareStoreArticleService,
  ) {}

  @Mutation(() => HardwareStoreUser, { name: 'hardwareStoreCreateUser' })
  async create(@Args('input') input: CreateUser) {
    const document = await this.userService.create(input);
    return document;
  }

  // @Mutation(() => HardwareStoreUser, { name: 'hardwareStoreUpdateUser' })
  // update(@Args('input') input: UpdateUser) {
  //   return this.userService.update(input);
  // }

  // @Mutation(() => HardwareStoreUser, { name: 'hardwareStoreUpdateDbUser' })
  // updateDB(@Args('input') input: UpdateDB) {
  //   return this.userService.updateDB(input);
  // }

  // @Mutation(() => HardwareStoreUser, { name: 'hardwareStoreUpdateImageUser' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.userService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'hardwareStoreDeleteUser' })
  // deleteOne(@Args('id', { type: () => String }) id: string) {
  //   // this.pageService.deletePagesByParentId([id]);
  //   return this.userService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'hardwareStoreDeleteUsers' })
  // deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   // this.pageService.deletePagesByParentId(ids);
  //   return this.userService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'hardwareStoreDeleteAllUsers' })
  // deleteAllUsers() {
  //   return this.userService.deleteAll();
  // }

  @Query(() => HardwareStoreUser, { name: 'hardwareStoreGetUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
  @Query(() => HardwareStoreUser, { name: 'hardwareStoreGetUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
    @Args('siteId', { type: () => String }) siteId: string,
  ) {
    return this.userService.findOneByEmail(email, siteId);
  }

  @Query(() => [HardwareStoreUser], { name: 'hardwareStoreGetUsers' })
  findAll() {
    return this.userService.findAll();
  }

  // @Query(() => ListUser, { name: 'hardwareStoreGetUsersWithCursor' })
  // async hardwareStoreGetUsersWithCursor(
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

  // @ResolveField('articles', () => [HardwareStoreArticle], { nullable: 'itemsAndList' })
  // getArticle(@Parent() { _id }: HardwareStoreUser) {
  //   return this.articleService.findByUserId(_id.toString());
  // }
}
