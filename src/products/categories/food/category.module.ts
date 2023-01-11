import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodCommentModule } from 'src/comments/categories/food/category.module';
import { FoodProduct } from 'src/common/entities/product.model';
import { FoodProductSchema } from 'src/common/entities/product.schema';
import { FoodProductResolver } from './category.resolver';
import { FoodProductService } from './category.service';

@Module({
  imports: [
    FoodCommentModule,
    MongooseModule.forFeature(
      [{ name: FoodProduct.name, schema: FoodProductSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodProductResolver, FoodProductService],
  exports: [FoodProductService],
})
export class FoodProductModule {}
