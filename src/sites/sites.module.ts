import { Module } from '@nestjs/common';
import { FoodSiteModule } from './categories/food/category.module';
import { HardwareStoreSiteModule } from './categories/hardwareStore/category.module';
import { PetSiteModule } from './categories/pet/category.module';
import { PortfolioSiteModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetSiteModule, PortfolioSiteModule, HardwareStoreSiteModule, FoodSiteModule],
})
export class SitesModule {}
