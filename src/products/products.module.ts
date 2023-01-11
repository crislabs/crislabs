import { Module } from '@nestjs/common';
import { FoodProductModule } from './categories/food/category.module';
import { HardwareStoreProductModule } from './categories/hardwareStore/category.module';
import { PetModule } from './categories/pet/pet.module';


@Module({
  imports: [PetModule, HardwareStoreProductModule, FoodProductModule],
})
export class ProductsModule {}
