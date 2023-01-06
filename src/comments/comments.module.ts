import { Module } from '@nestjs/common';
import { PetCommentModule } from './categories/pet/category.module';
import { PortfolioCommentModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetCommentModule, PortfolioCommentModule],
})
export class CommentsModule {}
