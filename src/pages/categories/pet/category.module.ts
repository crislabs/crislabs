import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetArticleModule } from 'src/articles/categories/pet/category.module';
import { PetPage0, PetPage1, PetPage10, PetPage11, PetPage12, PetPage2, PetPage3, PetPage4, PetPage5, PetPage6, PetPage7, PetPage8, PetPage9 } from 'src/common/entities/page.model';
import {
  PetPage0Schema,
  PetPage10Schema,
  PetPage11Schema,
  PetPage12Schema,
  PetPage1Schema,
  PetPage2Schema,
  PetPage3Schema,
  PetPage4Schema,
  PetPage5Schema,
  PetPage6Schema,
  PetPage7Schema,
  PetPage8Schema,
  PetPage9Schema,
} from 'src/common/entities/page.schema';
import { PetAdoptionModule } from 'src/products/categories/pet/pet-adoption/category.module';
import { PetProductModule } from 'src/products/categories/pet/pet-product/category.module';
// import { PetArticleModule } from 'src/articles/categories/pet/category.module';
// import { PetAdoptionModule } from 'src/products/categories/pet/pet-adoption/category.module';
// import { PetProductModule } from 'src/products/categories/pet/pet-product/category.module';

import { PetPage0Resolver } from './resolvers/page0.resolver';
import { PetPage1Resolver } from './resolvers/page1.resolver';
import { PetPage10Resolver } from './resolvers/page10.resolver';
import { PetPage11Resolver } from './resolvers/page11.resolver';
import { PetPage12Resolver } from './resolvers/page12.resolver';
import { PetPage2Resolver } from './resolvers/page2.resolver';
import { PetPage3Resolver } from './resolvers/page3.resolver';
import { PetPage4Resolver } from './resolvers/page4.resolver';
import { PetPage5Resolver } from './resolvers/page5.resolver';
import { PetPage6Resolver } from './resolvers/page6.resolver';
import { PetPage7Resolver } from './resolvers/page7.resolver';
import { PetPage8Resolver } from './resolvers/page8.resolver';
import { PetPage9Resolver } from './resolvers/page9.resolver';
import { PetPage0Service } from './services/page0.service';
import { PetPage1Service } from './services/page1.service';
import { PetPage10Service } from './services/page10.service';
import { PetPage11Service } from './services/page11.service';
import { PetPage12Service } from './services/page12.service';
import { PetPage2Service } from './services/page2.service';
import { PetPage3Service } from './services/page3.service';
import { PetPage4Service } from './services/page4.service';
import { PetPage5Service } from './services/page5.service';
import { PetPage6Service } from './services/page6.service';
import { PetPage7Service } from './services/page7.service';
import { PetPage8Service } from './services/page8.service';
import { PetPage9Service } from './services/page9.service';

@Module({
  imports: [
    PetProductModule,
    PetAdoptionModule,
    PetArticleModule,
    MongooseModule.forFeature(
      [
        { name: PetPage0.name, schema: PetPage0Schema },
        { name: PetPage1.name, schema: PetPage1Schema },
        { name: PetPage2.name, schema: PetPage2Schema },
        { name: PetPage3.name, schema: PetPage3Schema },
        { name: PetPage4.name, schema: PetPage4Schema },
        { name: PetPage5.name, schema: PetPage5Schema },
        { name: PetPage6.name, schema: PetPage6Schema },
        { name: PetPage7.name, schema: PetPage7Schema },
        { name: PetPage8.name, schema: PetPage8Schema },
        { name: PetPage9.name, schema: PetPage9Schema },
        { name: PetPage10.name, schema: PetPage10Schema },
        { name: PetPage11.name, schema: PetPage11Schema },
        { name: PetPage12.name, schema: PetPage12Schema },
      ],
      'petDB',
    ),
  ],
  providers: [
    PetPage0Resolver,
    PetPage0Service,
    PetPage1Resolver,
    PetPage1Service,
    PetPage2Resolver,
    PetPage2Service,
    PetPage3Resolver,
    PetPage3Service,
    PetPage4Resolver,
    PetPage4Service,
    PetPage5Resolver,
    PetPage5Service,
    PetPage6Resolver,
    PetPage6Service,
    PetPage7Resolver,
    PetPage7Service,
    PetPage8Resolver,
    PetPage8Service,
    PetPage9Resolver,
    PetPage9Service,
    PetPage10Resolver,
    PetPage10Service,
    PetPage11Resolver,
    PetPage11Service,
    PetPage12Resolver,
    PetPage12Service,
  ],
  exports: [PetPage0Service, PetPage1Service, PetPage2Service, PetPage3Service, PetPage4Service, PetPage5Service, PetPage6Service, PetPage7Service, PetPage8Service, PetPage9Service, PetPage10Service, PetPage11Service, PetPage12Service],
})
export class PetPageModule { }
