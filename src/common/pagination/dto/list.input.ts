import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ListInput {
  @Field(() => Number, { description: 'classical limit' })
  limit: number;
  @Field(() => Number, { description: 'classical offset' })
  offset: number;
}