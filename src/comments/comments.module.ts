import { Module } from '@nestjs/common';
import { HardwareStoreCommentModule } from './categories/hardwareStore/category.module';
import { PetCommentModule } from './categories/pet/category.module';
import { PortfolioCommentModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetCommentModule, PortfolioCommentModule, HardwareStoreCommentModule],
})
export class CommentsModule {}
