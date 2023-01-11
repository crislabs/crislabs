import { Module } from '@nestjs/common';
import { FoodCommentModule } from './categories/food/category.module';
import { HardwareStoreCommentModule } from './categories/hardwareStore/category.module';
import { PetCommentModule } from './categories/pet/category.module';
import { PortfolioCommentModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetCommentModule, PortfolioCommentModule, HardwareStoreCommentModule, FoodCommentModule],
})
export class CommentsModule {}
