import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateArticle {
  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Field()
  readonly siteId: string;

  @Field()
  readonly parentId: string;


  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateArticle extends PartialType(CreateArticle) {
  @Field()
  readonly id: string;
}
@InputType()
export class UpdateContentArticle {
  @Field()
  readonly id: string;
  @Field()
  readonly content: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateLikesArticle {
  @Field()
  readonly id: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateTagsArticle {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly uid: string;
}

// @InputType()
// export class UpdateArticle extends PartialType(CreateArticle) {
//   @Field()
//   readonly id: string;

//   @Field()
//   readonly content: string;

//   @Field()
//   readonly category: string;

//   @Field()
//   readonly meta: string;

//   @Field(() => [String])
//   readonly tags: string[];
// }

// @InputType()
// export class UpdateArticleContent {
//   @Field()
//   readonly id: string;

//   @Field()
//   readonly content: string;
// }
