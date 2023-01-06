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
import { PortfolioPage0Service } from 'src/pages/categories/portfolio/services/page0.service';
import { page0 } from 'src/common/functions/pages';
import { PortfolioPage0 } from 'src/common/entities/page.model';
import { PortfolioUser } from 'src/common/entities/user.model';
import { PortfolioUserService } from './category.service';
import { CreateUser } from 'src/common/dto/user.input';
// import { PortfolioArticleService } from 'src/articles/categories/portfolio/category.service';
import { PortfolioArticle } from 'src/common/entities/article.model';

@Resolver(() => PortfolioUser)
export class PortfolioUserResolver {
  constructor(
    private readonly userService: PortfolioUserService, 
    // private readonly articleService: PortfolioArticleService,
  ) {}

  @Mutation(() => PortfolioUser, { name: 'portfolioCreateUser' })
  async create(@Args('input') input: CreateUser) {
    const document = await this.userService.create(input);
    return document;
  }

  // @Mutation(() => PortfolioUser, { name: 'portfolioUpdateUser' })
  // update(@Args('input') input: UpdateUser) {
  //   return this.userService.update(input);
  // }

  // @Mutation(() => PortfolioUser, { name: 'portfolioUpdateDbUser' })
  // updateDB(@Args('input') input: UpdateDB) {
  //   return this.userService.updateDB(input);
  // }

  // @Mutation(() => PortfolioUser, { name: 'portfolioUpdateImageUser' })
  // updateImage(@Args('input') input: UpdateImage) {
  //   return this.userService.updateImage(input);
  // }

  // @Mutation(() => String, { name: 'portfolioDeleteUser' })
  // deleteOne(@Args('id', { type: () => String }) id: string) {
  //   // this.pageService.deletePagesByParentId([id]);
  //   return this.userService.deleteOne(id);
  // }

  // @Mutation(() => [String], { name: 'portfolioDeleteUsers' })
  // deleteMany(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   // this.pageService.deletePagesByParentId(ids);
  //   return this.userService.deleteMany(ids);
  // }

  // @Mutation(() => String, { name: 'portfolioDeleteAllUsers' })
  // deleteAllUsers() {
  //   return this.userService.deleteAll();
  // }

  @Query(() => PortfolioUser, { name: 'portfolioGetUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
  @Query(() => PortfolioUser, { name: 'portfolioGetUserByEmail' })
  findOneByEmail(
    @Args('email', { type: () => String }) email: string,
    @Args('siteId', { type: () => String }) siteId: string,
  ) {
    return this.userService.findOneByEmail(email, siteId);
  }

  @Query(() => [PortfolioUser], { name: 'portfolioGetUsers' })
  findAll() {
    return this.userService.findAll();
  }

  // @Query(() => ListUser, { name: 'portfolioGetUsersWithCursor' })
  // async portfolioGetUsersWithCursor(
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

  // @ResolveField('articles', () => [PortfolioArticle], { nullable: 'itemsAndList' })
  // getArticle(@Parent() { _id }: PortfolioUser) {
  //   return this.articleService.findByUserId(_id.toString());
  // }
}
