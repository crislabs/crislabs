import { Module } from '@nestjs/common';
import { FoodPageModule } from './categories/food/category.module';
import { HardwareStorePageModule } from './categories/hardwareStore/category.module';
import { PetPageModule } from './categories/pet/category.module';
import { PortfolioPageModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetPageModule, PortfolioPageModule, HardwareStorePageModule, FoodPageModule],
})
export class PagesModule {}
