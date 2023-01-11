import { Module } from '@nestjs/common';
import { FoodUserService } from './category.service';
import { FoodUserResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodPageModule } from 'src/pages/categories/food/category.module';
import { FoodUser } from 'src/common/entities/user.model';
import { FoodUserSchema } from 'src/common/entities/user.schema';
// import { FoodArticleModule } from 'src/articles/categories/food/category.module';

@Module({
  imports: [
    // FoodArticleModule,
    FoodPageModule,
    MongooseModule.forFeature(
      [{ name: FoodUser.name, schema: FoodUserSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodUserResolver, FoodUserService],
  exports: [FoodUserService],
})
export class FoodUserModule {}
