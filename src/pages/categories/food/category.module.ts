import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodArticleModule } from 'src/articles/categories/food/category.module';
import { FoodPage0, FoodPage1, FoodPage10, FoodPage11, FoodPage12, FoodPage2, FoodPage3, FoodPage4, FoodPage5, FoodPage6, FoodPage7, FoodPage8, FoodPage9 } from 'src/common/entities/page.model';
import {
  FoodPage0Schema,
  FoodPage10Schema,
  FoodPage11Schema,
  FoodPage12Schema,
  FoodPage1Schema,
  FoodPage2Schema,
  FoodPage3Schema,
  FoodPage4Schema,
  FoodPage5Schema,
  FoodPage6Schema,
  FoodPage7Schema,
  FoodPage8Schema,
  FoodPage9Schema,
} from 'src/common/entities/page.schema';
import { FoodProductModule } from 'src/products/categories/food/category.module';

// import { FoodArticleModule } from 'src/articles/categories/food/category.module';
// import { FoodAdoptionModule } from 'src/products/categories/food/food-adoption/category.module';
// import { FoodProductModule } from 'src/products/categories/food/food/category.module';

import { FoodPage0Resolver } from './resolvers/page0.resolver';
import { FoodPage1Resolver } from './resolvers/page1.resolver';
import { FoodPage10Resolver } from './resolvers/page10.resolver';
import { FoodPage11Resolver } from './resolvers/page11.resolver';
import { FoodPage12Resolver } from './resolvers/page12.resolver';
import { FoodPage2Resolver } from './resolvers/page2.resolver';
import { FoodPage3Resolver } from './resolvers/page3.resolver';
import { FoodPage4Resolver } from './resolvers/page4.resolver';
import { FoodPage5Resolver } from './resolvers/page5.resolver';
import { FoodPage6Resolver } from './resolvers/page6.resolver';
import { FoodPage7Resolver } from './resolvers/page7.resolver';
import { FoodPage8Resolver } from './resolvers/page8.resolver';
import { FoodPage9Resolver } from './resolvers/page9.resolver';
import { FoodPage0Service } from './services/page0.service';
import { FoodPage1Service } from './services/page1.service';
import { FoodPage10Service } from './services/page10.service';
import { FoodPage11Service } from './services/page11.service';
import { FoodPage12Service } from './services/page12.service';
import { FoodPage2Service } from './services/page2.service';
import { FoodPage3Service } from './services/page3.service';
import { FoodPage4Service } from './services/page4.service';
import { FoodPage5Service } from './services/page5.service';
import { FoodPage6Service } from './services/page6.service';
import { FoodPage7Service } from './services/page7.service';
import { FoodPage8Service } from './services/page8.service';
import { FoodPage9Service } from './services/page9.service';

@Module({
  imports: [
    FoodProductModule,
    FoodArticleModule,
    MongooseModule.forFeature(
      [
        { name: FoodPage0.name, schema: FoodPage0Schema },
        { name: FoodPage1.name, schema: FoodPage1Schema },
        { name: FoodPage2.name, schema: FoodPage2Schema },
        { name: FoodPage3.name, schema: FoodPage3Schema },
        { name: FoodPage4.name, schema: FoodPage4Schema },
        { name: FoodPage5.name, schema: FoodPage5Schema },
        { name: FoodPage6.name, schema: FoodPage6Schema },
        { name: FoodPage7.name, schema: FoodPage7Schema },
        { name: FoodPage8.name, schema: FoodPage8Schema },
        { name: FoodPage9.name, schema: FoodPage9Schema },
        { name: FoodPage10.name, schema: FoodPage10Schema },
        { name: FoodPage11.name, schema: FoodPage11Schema },
        { name: FoodPage12.name, schema: FoodPage12Schema },
      ],
      'foodDB',
    ),
  ],
  providers: [
    FoodPage0Resolver,
    FoodPage0Service,
    FoodPage1Resolver,
    FoodPage1Service,
    FoodPage2Resolver,
    FoodPage2Service,
    FoodPage3Resolver,
    FoodPage3Service,
    FoodPage4Resolver,
    FoodPage4Service,
    FoodPage5Resolver,
    FoodPage5Service,
    FoodPage6Resolver,
    FoodPage6Service,
    FoodPage7Resolver,
    FoodPage7Service,
    FoodPage8Resolver,
    FoodPage8Service,
    FoodPage9Resolver,
    FoodPage9Service,
    FoodPage10Resolver,
    FoodPage10Service,
    FoodPage11Resolver,
    FoodPage11Service,
    FoodPage12Resolver,
    FoodPage12Service,
  ],
  exports: [FoodPage0Service, FoodPage1Service, FoodPage2Service, FoodPage3Service, FoodPage4Service, FoodPage5Service, FoodPage6Service, FoodPage7Service, FoodPage8Service, FoodPage9Service, FoodPage10Service, FoodPage11Service, FoodPage12Service],
})
export class FoodPageModule { }
