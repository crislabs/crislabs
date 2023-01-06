import { InputType, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class CreatePage {
  @Field()
  readonly title: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field()
  readonly parentId: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly uid?: string;
}
@InputType()
export class UpdatePage extends OmitType(CreatePage, [] as const) {
  @Field()
  readonly id: string;
}
