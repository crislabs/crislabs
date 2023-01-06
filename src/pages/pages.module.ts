import { Module } from '@nestjs/common';
import { PetPageModule } from './categories/pet/category.module';
import { PortfolioPageModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetPageModule, PortfolioPageModule],
})
export class PagesModule {}
