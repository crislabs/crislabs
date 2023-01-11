import { Module } from '@nestjs/common';
import { FoodSiteService } from './category.service';
import { FoodSiteResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSite } from 'src/common/entities/site.model';
import { FoodSiteSchema } from 'src/common/entities/site.schema';
import { FoodPageModule } from 'src/pages/categories/food/category.module';

import { FoodArticleModule } from 'src/articles/categories/food/category.module';
import { FoodUserModule } from 'src/users/categories/food/category.module';
import { FoodProductModule } from 'src/products/categories/food/category.module';

@Module({
  imports: [
    FoodPageModule,
    FoodUserModule,
    FoodProductModule,
    FoodArticleModule,
    MongooseModule.forFeature(
      [{ name: FoodSite.name, schema: FoodSiteSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodSiteResolver, FoodSiteService]
})
export class FoodSiteModule { }
