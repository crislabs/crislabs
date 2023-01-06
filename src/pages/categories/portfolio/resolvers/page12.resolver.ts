import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import {
  DataPage,
  ListPortfolioPage12,
  PortfolioPage12,
} from 'src/common/entities/page.model';
import { PortfolioPage12Service } from '../services/page12.service';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
// import { PortfolioProduct } from 'src/common/entities/product.model';
import { Type } from 'src/common/entities/site.model';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';
// import { PortfolioProductService } from 'src/products/categories/portfolio/portfolio-product/category.service';

@Resolver(() => PortfolioPage12)
export class PortfolioPage12Resolver {
  constructor(
    private readonly page12Service: PortfolioPage12Service,
    // private readonly productService: PortfolioProductService,
  ) {}

  @Mutation(() => PortfolioPage12, { name: 'portfolioCreatePage12' })
  createPage(@Args('input') input: CreatePage) {
    return this.page12Service.create(input);
  }

  @Mutation(() => PortfolioPage12, { name: 'portfolioUpdatePage12' })
  updatePage(
    @Args('input') input: UpdatePage,
    // @Args('type') type: string,
  ) {
    return this.page12Service.update(input);
  }

  @Mutation(() => PortfolioPage12, { name: 'portfolioUpdateImagePage12' })
  updateImage(@Args('input') input: UpdateImage) {
    return this.page12Service.updateImage(input);
  }

  @Mutation(() => String, { name: 'portfolioDeletePage12' })
  deletePage(@Args('id') id: string) {
    return this.page12Service.deleteOne(id);
  }

  @Mutation(() => [String], { name: 'portfolioDeletePages12' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page12Service.deleteMany(ids);
  }

  @Mutation(() => String, { name: 'portfolioDeleteAllPages12' })
  deleteAllPages() {
    return this.page12Service.deleteAll();
  }

  @Query(() => PortfolioPage12, { name: 'portfolioGetPage12' })
  findPage(@Args('id') id: string) {
    return this.page12Service.findOne(id);
  }

  @Query(() => PortfolioPage12, { name: 'portfolioGetPage12BySlug' })
  findPageBySlug(@Args('slug') slug: string, @Args('siteId') siteId: string) {
    return this.page12Service.findOneBySlug(slug, siteId);
  }

  @Query(() => [PortfolioPage12], { name: 'portfolioGetPages12' })
  findPages() {
    return this.page12Service.findAll();
  }

  @Query(() => [PortfolioPage12], { name: 'portfolioGetPages12ByParentId' })
  findPagesByParentId(
    @Args('parentId') parentId: string,
    // @Args('type') type: string,
  ) {
    return this.page12Service.findByParentId(parentId);
  }

  @Query(() => [PortfolioPage12], { name: 'portfolioGetPages12BySiteId' })
  findPagesBySiteId(
    @Args('siteId') siteId: string,
  ) {
    return this.page12Service.findBySiteId(siteId);
  }

  @Query(() => ListPortfolioPage12, { name: 'portfolioGetPages12WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPortfolioPage12> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page12Service.findByCursor(
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

  // @ResolveField('products', () => [PortfolioProduct], { nullable: 'itemsAndList' })
  // getProduct(@Parent() { _id, dataPage }: PortfolioPage12) {
  //   const { type } = dataPage as DataPage;
  //   if (type === 'portfolio') {
  //     return this.productService.findByParentId(_id.toString());
  //   } else {
  //     return null;
  //   }
  // }
}
