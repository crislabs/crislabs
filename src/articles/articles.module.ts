import { Module } from '@nestjs/common';
import { FoodArticleModule } from './categories/food/category.module';
import { HardwareStoreArticleModule } from './categories/hardwareStore/category.module';
import { PetArticleModule } from './categories/pet/category.module';
import { PortfolioArticleModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetArticleModule, PortfolioArticleModule, HardwareStoreArticleModule, FoodArticleModule],
})
export class ArticlesModule {}
