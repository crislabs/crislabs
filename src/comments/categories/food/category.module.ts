import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodComment } from 'src/common/entities/comment.model';
import { FoodCommentSchema } from 'src/common/entities/comment.schema';
import { FoodCommentResolver } from './category.resolver';
import { FoodCommentService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: FoodComment.name, schema: FoodCommentSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodCommentResolver, FoodCommentService],
  exports: [FoodCommentService]
})
export class FoodCommentModule {}
