import { Module } from '@nestjs/common';
import { PetSiteModule } from './categories/pet/category.module';
import { PortfolioSiteModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetSiteModule, PortfolioSiteModule],
})
export class SitesModule {}
