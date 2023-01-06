import { Module } from '@nestjs/common';
import { PetArticleModule } from './categories/pet/category.module';
import { PortfolioArticleModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetArticleModule, PortfolioArticleModule],
})
export class ArticlesModule {}
