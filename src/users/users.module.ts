import { Module } from '@nestjs/common';
import { PetUserModule } from './categories/pet/category.module';
import { PortfolioUserModule } from './categories/portfolio/category.module';

@Module({
  imports: [PetUserModule, PortfolioUserModule],
})
export class UsersModule {}
