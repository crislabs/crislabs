import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSite {
  @Field()
  readonly name: string;
  @Field()
  readonly domain: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field({ nullable: true })
  readonly clientId?: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateSite extends CreateSite {
  @Field()
  readonly id: string;
}

@InputType()
export class UpdateDB {
  @Field()
  readonly id: string;
  @Field(() => [String])
  readonly type: string[];
}
@InputType()
export class UpdateAdminSite {
  @Field()
  readonly id: string;
  @Field(() => [InputAdmin])
  readonly admin: InputAdmin[];
}
@InputType()
export class UpdateImage {
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly type?: string;
  @Field()
  readonly uid: string;
  @Field(() => InputImage)
  readonly images?: InputImage | string;
}

@InputType()
export class UpdateImageProduct {
  @Field()
  readonly id: string;
  @Field({ nullable: true })
  readonly type?: string;
  @Field()
  readonly uid: string;
  @Field(() => [InputImage])
  readonly images?: InputImage[];
}

@InputType()
export class InputImage {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}

@InputType()
export class InputAdmin {
  @Field()
  readonly privilege: string;
  @Field()
  readonly sid: string;
}
