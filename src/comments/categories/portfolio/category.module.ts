import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioComment } from 'src/common/entities/comment.model';
import { PortfolioCommentSchema } from 'src/common/entities/comment.schema';
import { PortfolioCommentResolver } from './category.resolver';
import { PortfolioCommentService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PortfolioComment.name, schema: PortfolioCommentSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioCommentResolver, PortfolioCommentService],
  exports: [PortfolioCommentService]
})
export class PortfolioCommentModule {}
