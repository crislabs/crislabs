import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateProduct {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly uid: string;

  @Field()
  readonly type: string;
}

@InputType()
export class UpdateProduct extends PartialType(CreateProduct) {
  @Field()
  readonly id: string;
  // @Field(() => [String])
  // readonly tags: string[];
  // @Field()
  // readonly details: string;
  // @Field()
  // readonly featured: string;
  // @Field()
  // readonly specs: string;
}

@InputType()
export class UpdateSpecsProduct {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateDetailProduct {
  @Field()
  readonly id: string;
  @Field()
  readonly text: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateTagsProduct {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateLikesProduct {
  @Field()
  readonly id: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdatePriceProduct {
  @Field()
  readonly id: string;
  @Field()
  readonly price: string;
  @Field()
  readonly discountPrice: string;
  @Field()
  readonly inStock: string;
  @Field()
  readonly uid: string;
}
