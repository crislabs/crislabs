import { Module } from '@nestjs/common';
import { HardwareStoreUserModule } from './categories/hardwareStore/category.module';
import { PetUserModule } from './categories/pet/category.module';
import { PortfolioUserModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetUserModule, PortfolioUserModule, HardwareStoreUserModule],
})
export class UsersModule {}
