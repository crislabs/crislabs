import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../abstract/abstract.model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Image, Seo, Tags, UpdateDate } from './site.model';

@ObjectType()
export class Comment extends AbstractModel {
  @Field(() => DataComment)
  readonly dataComment: DataComment | string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
}
@ObjectType()
export class DataComment {
  @Field()
  readonly content: string;
  // @Field({ nullable: true })
  // readonly category?: string;
  // @Field({ nullable: true })
  // readonly meta?: string;
  // @Field(() => [Tags], { nullable: true })
  // readonly tags?: Tags[];
  @Field()
  readonly author: string;
  // @Field(() => Image, { nullable: true })
  // readonly thumbnail?: Image | string;
  // @Field(() => Seo)
  // readonly seoArticle: Seo | string;
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;

  @Field(() => [String], { nullable: true })
  readonly likes?: string[];
}


// @ObjectType()
// export class FoodArticle extends Article {}
// @ObjectType()
// export class MarketingArticle extends Article {}
@ObjectType()
export class FoodComment extends Comment {}
@ObjectType()
export class ListFoodComment extends RelayTypes<FoodComment>(FoodComment) {}
@ObjectType()
export class PetComment extends Comment {}
@ObjectType()
export class ListPetComment extends RelayTypes<PetComment>(PetComment) {}
@ObjectType()
export class PortfolioComment extends Comment {}
@ObjectType()
export class ListPortfolioComment extends RelayTypes<PortfolioComment>(PortfolioComment) {}
@ObjectType()
export class HardwareStoreComment extends Comment {}
@ObjectType()
export class ListHardwareStoreComment extends RelayTypes<HardwareStoreComment>(HardwareStoreComment) {}
