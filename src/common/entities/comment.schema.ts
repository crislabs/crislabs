import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataComment } from './comment.model';

@Schema({ versionKey: false })
export class CommentDocument extends AbstractDocument {
  @Prop({ type: DataComment })
  dataComment: DataComment;
  @Prop({ trim: true })
  parentId: string;
  @Prop({ trim: true })
  siteId: string;
}
export const PetCommentSchema = SchemaFactory.createForClass(CommentDocument);
export const PortfolioCommentSchema = SchemaFactory.createForClass(CommentDocument);
