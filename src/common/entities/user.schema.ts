import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataUser } from './user.model';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ type: DataUser })
  dataUser: DataUser;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  siteId: string;

}
// export const UserSchema = SchemaFactory.createForClass(UserDocument);
export const PetUserSchema = SchemaFactory.createForClass(UserDocument);
export const PortfolioUserSchema = SchemaFactory.createForClass(UserDocument);