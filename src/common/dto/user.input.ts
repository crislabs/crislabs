import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUser {
  @Field()
  username: string;
  @Field()
  siteId: string;
  @Field()
  image: string;

  @Field(() => String)
  @IsString()
  @IsEmail({}, { message: 'Invalid email message' })
  email: string;

  @Field(() => String)
  @MinLength(6)
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @Field(() => String)
  @IsIn([
    'ADMIN_ROL',
    'USER_ROL',
    'CLIENT_ROL',
    'VENTAS_ROL',
    'HELPER_ROL',
    'DEVELOPER_ROL',
  ])
  @IsNotEmpty()
  @IsString()
  role: string;

  @Field({ nullable: true })
  oAuth?: string;
}

@InputType()
export class UpdateUser extends OmitType(CreateUser, [
  'password',
  'siteId',
  'role',
]) {}
