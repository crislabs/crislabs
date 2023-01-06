import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetComment } from 'src/common/entities/comment.model';
import { PetCommentSchema } from 'src/common/entities/comment.schema';
import { PetCommentResolver } from './category.resolver';
import { PetCommentService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PetComment.name, schema: PetCommentSchema }],
      'petDB',
    ),
  ],
  providers: [PetCommentResolver, PetCommentService],
  exports: [PetCommentService]
})
export class PetCommentModule {}
