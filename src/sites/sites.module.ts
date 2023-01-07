import { Module } from '@nestjs/common';
import { HardwareStoreSiteModule } from './categories/hardwareStore/category.module';
import { PetSiteModule } from './categories/pet/category.module';
import { PortfolioSiteModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetSiteModule, PortfolioSiteModule, HardwareStoreSiteModule],
})
export class SitesModule {}
