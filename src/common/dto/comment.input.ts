import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateComment {
  @Field()
  readonly author: string;
  @Field()
  readonly content: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateComment extends PartialType(CreateComment) {
  @Field()
  readonly id: string;
}

@InputType()
export class UpdateLikesComment {
  @Field()
  readonly id: string;
  @Field()
  readonly uid: string;
}
