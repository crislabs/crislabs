import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStoreCommentModule } from 'src/comments/categories/hardwareStore/category.module';
import { HardwareStoreProduct } from 'src/common/entities/product.model';
import { HardwareStoreProductSchema } from 'src/common/entities/product.schema';
import { HardwareStoreProductResolver } from './category.resolver';
import { HardwareStoreProductService } from './category.service';

@Module({
  imports: [
    HardwareStoreCommentModule,
    MongooseModule.forFeature(
      [{ name: HardwareStoreProduct.name, schema: HardwareStoreProductSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [HardwareStoreProductResolver, HardwareStoreProductService],
  exports: [HardwareStoreProductService],
})
export class HardwareStoreProductModule {}
