import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { PortfolioArticleModule } from 'src/articles/categories/portfolio/category.module';
import { PortfolioPage0, PortfolioPage1, PortfolioPage10, PortfolioPage11, PortfolioPage12, PortfolioPage2, PortfolioPage3, PortfolioPage4, PortfolioPage5, PortfolioPage6, PortfolioPage7, PortfolioPage8, PortfolioPage9 } from 'src/common/entities/page.model';
import {
  PortfolioPage0Schema,
  PortfolioPage10Schema,
  PortfolioPage11Schema,
  PortfolioPage12Schema,
  PortfolioPage1Schema,
  PortfolioPage2Schema,
  PortfolioPage3Schema,
  PortfolioPage4Schema,
  PortfolioPage5Schema,
  PortfolioPage6Schema,
  PortfolioPage7Schema,
  PortfolioPage8Schema,
  PortfolioPage9Schema,
} from 'src/common/entities/page.schema';
// import { PortfolioAdoptionModule } from 'src/products/categories/portfolio/portfolio-adoption/category.module';
// import { PortfolioProductModule } from 'src/products/categories/portfolio/portfolio-product/category.module';
// import { PortfolioArticleModule } from 'src/articles/categories/portfolio/category.module';
// import { PortfolioAdoptionModule } from 'src/products/categories/portfolio/portfolio-adoption/category.module';
// import { PortfolioProductModule } from 'src/products/categories/portfolio/portfolio-product/category.module';

import { PortfolioPage0Resolver } from './resolvers/page0.resolver';
import { PortfolioPage1Resolver } from './resolvers/page1.resolver';
import { PortfolioPage10Resolver } from './resolvers/page10.resolver';
import { PortfolioPage11Resolver } from './resolvers/page11.resolver';
import { PortfolioPage12Resolver } from './resolvers/page12.resolver';
import { PortfolioPage2Resolver } from './resolvers/page2.resolver';
import { PortfolioPage3Resolver } from './resolvers/page3.resolver';
import { PortfolioPage4Resolver } from './resolvers/page4.resolver';
import { PortfolioPage5Resolver } from './resolvers/page5.resolver';
import { PortfolioPage6Resolver } from './resolvers/page6.resolver';
import { PortfolioPage7Resolver } from './resolvers/page7.resolver';
import { PortfolioPage8Resolver } from './resolvers/page8.resolver';
import { PortfolioPage9Resolver } from './resolvers/page9.resolver';
import { PortfolioPage0Service } from './services/page0.service';
import { PortfolioPage1Service } from './services/page1.service';
import { PortfolioPage10Service } from './services/page10.service';
import { PortfolioPage11Service } from './services/page11.service';
import { PortfolioPage12Service } from './services/page12.service';
import { PortfolioPage2Service } from './services/page2.service';
import { PortfolioPage3Service } from './services/page3.service';
import { PortfolioPage4Service } from './services/page4.service';
import { PortfolioPage5Service } from './services/page5.service';
import { PortfolioPage6Service } from './services/page6.service';
import { PortfolioPage7Service } from './services/page7.service';
import { PortfolioPage8Service } from './services/page8.service';
import { PortfolioPage9Service } from './services/page9.service';

@Module({
  imports: [
    // PortfolioProductModule,
    // PortfolioAdoptionModule,
    // PortfolioArticleModule,
    MongooseModule.forFeature(
      [
        { name: PortfolioPage0.name, schema: PortfolioPage0Schema },
        { name: PortfolioPage1.name, schema: PortfolioPage1Schema },
        { name: PortfolioPage2.name, schema: PortfolioPage2Schema },
        { name: PortfolioPage3.name, schema: PortfolioPage3Schema },
        { name: PortfolioPage4.name, schema: PortfolioPage4Schema },
        { name: PortfolioPage5.name, schema: PortfolioPage5Schema },
        { name: PortfolioPage6.name, schema: PortfolioPage6Schema },
        { name: PortfolioPage7.name, schema: PortfolioPage7Schema },
        { name: PortfolioPage8.name, schema: PortfolioPage8Schema },
        { name: PortfolioPage9.name, schema: PortfolioPage9Schema },
        { name: PortfolioPage10.name, schema: PortfolioPage10Schema },
        { name: PortfolioPage11.name, schema: PortfolioPage11Schema },
        { name: PortfolioPage12.name, schema: PortfolioPage12Schema },
      ],
      'portfolioDB',
    ),
  ],
  providers: [
    PortfolioPage0Resolver,
    PortfolioPage0Service,
    PortfolioPage1Resolver,
    PortfolioPage1Service,
    PortfolioPage2Resolver,
    PortfolioPage2Service,
    PortfolioPage3Resolver,
    PortfolioPage3Service,
    PortfolioPage4Resolver,
    PortfolioPage4Service,
    PortfolioPage5Resolver,
    PortfolioPage5Service,
    PortfolioPage6Resolver,
    PortfolioPage6Service,
    PortfolioPage7Resolver,
    PortfolioPage7Service,
    PortfolioPage8Resolver,
    PortfolioPage8Service,
    PortfolioPage9Resolver,
    PortfolioPage9Service,
    PortfolioPage10Resolver,
    PortfolioPage10Service,
    PortfolioPage11Resolver,
    PortfolioPage11Service,
    PortfolioPage12Resolver,
    PortfolioPage12Service,
  ],
  exports: [PortfolioPage0Service, PortfolioPage1Service, PortfolioPage2Service, PortfolioPage3Service, PortfolioPage4Service, PortfolioPage5Service, PortfolioPage6Service, PortfolioPage7Service, PortfolioPage8Service, PortfolioPage9Service, PortfolioPage10Service, PortfolioPage11Service, PortfolioPage12Service],
})
export class PortfolioPageModule { }
