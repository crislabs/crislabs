import { Module } from '@nestjs/common';
import { HardwareStoreSiteService } from './category.service';
import { HardwareStoreSiteResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStoreSite } from 'src/common/entities/site.model';
import { HardwareStoreSiteSchema } from 'src/common/entities/site.schema';
import { HardwareStorePageModule } from 'src/pages/categories/hardwareStore/category.module';

import { HardwareStoreArticleModule } from 'src/articles/categories/hardwareStore/category.module';
import { HardwareStoreUserModule } from 'src/users/categories/hardwareStore/category.module';
import { HardwareStoreProductModule } from 'src/products/categories/hardwareStore/category.module';

@Module({
  imports: [
    HardwareStorePageModule,
    HardwareStoreUserModule,
    HardwareStoreProductModule,
    HardwareStoreArticleModule,
    MongooseModule.forFeature(
      [{ name: HardwareStoreSite.name, schema: HardwareStoreSiteSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [HardwareStoreSiteResolver, HardwareStoreSiteService]
})
export class HardwareStoreSiteModule { }
