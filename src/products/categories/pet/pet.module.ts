import { Module } from '@nestjs/common';
import { PetAdoptionModule } from './pet-adoption/category.module';
import { PetProductModule } from './pet-product/category.module';

@Module({
  imports: [PetProductModule, PetAdoptionModule],
})
export class PetModule {}
