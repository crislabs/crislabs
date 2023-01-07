import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStoreComment } from 'src/common/entities/comment.model';
import { HardwareStoreCommentSchema } from 'src/common/entities/comment.schema';
import { HardwareStoreCommentResolver } from './category.resolver';
import { HardwareStoreCommentService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: HardwareStoreComment.name, schema: HardwareStoreCommentSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [HardwareStoreCommentResolver, HardwareStoreCommentService],
  exports: [HardwareStoreCommentService]
})
export class HardwareStoreCommentModule {}
