import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStoreArticleModule } from 'src/articles/categories/hardwareStore/category.module';
import { HardwareStorePage0, HardwareStorePage1, HardwareStorePage10, HardwareStorePage11, HardwareStorePage12, HardwareStorePage2, HardwareStorePage3, HardwareStorePage4, HardwareStorePage5, HardwareStorePage6, HardwareStorePage7, HardwareStorePage8, HardwareStorePage9 } from 'src/common/entities/page.model';
import {
  HardwareStorePage0Schema,
  HardwareStorePage10Schema,
  HardwareStorePage11Schema,
  HardwareStorePage12Schema,
  HardwareStorePage1Schema,
  HardwareStorePage2Schema,
  HardwareStorePage3Schema,
  HardwareStorePage4Schema,
  HardwareStorePage5Schema,
  HardwareStorePage6Schema,
  HardwareStorePage7Schema,
  HardwareStorePage8Schema,
  HardwareStorePage9Schema,
} from 'src/common/entities/page.schema';
import { HardwareStoreProductModule } from 'src/products/categories/hardwareStore/category.module';

// import { HardwareStoreArticleModule } from 'src/articles/categories/hardwareStore/category.module';
// import { HardwareStoreAdoptionModule } from 'src/products/categories/hardwareStore/hardwareStore-adoption/category.module';
// import { HardwareStoreProductModule } from 'src/products/categories/hardwareStore/hardwareStore/category.module';

import { HardwareStorePage0Resolver } from './resolvers/page0.resolver';
import { HardwareStorePage1Resolver } from './resolvers/page1.resolver';
import { HardwareStorePage10Resolver } from './resolvers/page10.resolver';
import { HardwareStorePage11Resolver } from './resolvers/page11.resolver';
import { HardwareStorePage12Resolver } from './resolvers/page12.resolver';
import { HardwareStorePage2Resolver } from './resolvers/page2.resolver';
import { HardwareStorePage3Resolver } from './resolvers/page3.resolver';
import { HardwareStorePage4Resolver } from './resolvers/page4.resolver';
import { HardwareStorePage5Resolver } from './resolvers/page5.resolver';
import { HardwareStorePage6Resolver } from './resolvers/page6.resolver';
import { HardwareStorePage7Resolver } from './resolvers/page7.resolver';
import { HardwareStorePage8Resolver } from './resolvers/page8.resolver';
import { HardwareStorePage9Resolver } from './resolvers/page9.resolver';
import { HardwareStorePage0Service } from './services/page0.service';
import { HardwareStorePage1Service } from './services/page1.service';
import { HardwareStorePage10Service } from './services/page10.service';
import { HardwareStorePage11Service } from './services/page11.service';
import { HardwareStorePage12Service } from './services/page12.service';
import { HardwareStorePage2Service } from './services/page2.service';
import { HardwareStorePage3Service } from './services/page3.service';
import { HardwareStorePage4Service } from './services/page4.service';
import { HardwareStorePage5Service } from './services/page5.service';
import { HardwareStorePage6Service } from './services/page6.service';
import { HardwareStorePage7Service } from './services/page7.service';
import { HardwareStorePage8Service } from './services/page8.service';
import { HardwareStorePage9Service } from './services/page9.service';

@Module({
  imports: [
    HardwareStoreProductModule,
    HardwareStoreArticleModule,
    MongooseModule.forFeature(
      [
        { name: HardwareStorePage0.name, schema: HardwareStorePage0Schema },
        { name: HardwareStorePage1.name, schema: HardwareStorePage1Schema },
        { name: HardwareStorePage2.name, schema: HardwareStorePage2Schema },
        { name: HardwareStorePage3.name, schema: HardwareStorePage3Schema },
        { name: HardwareStorePage4.name, schema: HardwareStorePage4Schema },
        { name: HardwareStorePage5.name, schema: HardwareStorePage5Schema },
        { name: HardwareStorePage6.name, schema: HardwareStorePage6Schema },
        { name: HardwareStorePage7.name, schema: HardwareStorePage7Schema },
        { name: HardwareStorePage8.name, schema: HardwareStorePage8Schema },
        { name: HardwareStorePage9.name, schema: HardwareStorePage9Schema },
        { name: HardwareStorePage10.name, schema: HardwareStorePage10Schema },
        { name: HardwareStorePage11.name, schema: HardwareStorePage11Schema },
        { name: HardwareStorePage12.name, schema: HardwareStorePage12Schema },
      ],
      'hardwareStoreDB',
    ),
  ],
  providers: [
    HardwareStorePage0Resolver,
    HardwareStorePage0Service,
    HardwareStorePage1Resolver,
    HardwareStorePage1Service,
    HardwareStorePage2Resolver,
    HardwareStorePage2Service,
    HardwareStorePage3Resolver,
    HardwareStorePage3Service,
    HardwareStorePage4Resolver,
    HardwareStorePage4Service,
    HardwareStorePage5Resolver,
    HardwareStorePage5Service,
    HardwareStorePage6Resolver,
    HardwareStorePage6Service,
    HardwareStorePage7Resolver,
    HardwareStorePage7Service,
    HardwareStorePage8Resolver,
    HardwareStorePage8Service,
    HardwareStorePage9Resolver,
    HardwareStorePage9Service,
    HardwareStorePage10Resolver,
    HardwareStorePage10Service,
    HardwareStorePage11Resolver,
    HardwareStorePage11Service,
    HardwareStorePage12Resolver,
    HardwareStorePage12Service,
  ],
  exports: [HardwareStorePage0Service, HardwareStorePage1Service, HardwareStorePage2Service, HardwareStorePage3Service, HardwareStorePage4Service, HardwareStorePage5Service, HardwareStorePage6Service, HardwareStorePage7Service, HardwareStorePage8Service, HardwareStorePage9Service, HardwareStorePage10Service, HardwareStorePage11Service, HardwareStorePage12Service],
})
export class HardwareStorePageModule { }
