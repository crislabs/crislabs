import { Module } from '@nestjs/common';
import { PetModule } from './categories/pet/pet.module';


@Module({
  imports: [PetModule],
})
export class ProductsModule {}
