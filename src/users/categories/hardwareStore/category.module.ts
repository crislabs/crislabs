import { Module } from '@nestjs/common';
import { HardwareStoreUserService } from './category.service';
import { HardwareStoreUserResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStorePageModule } from 'src/pages/categories/hardwareStore/category.module';
import { HardwareStoreUser } from 'src/common/entities/user.model';
import { HardwareStoreUserSchema } from 'src/common/entities/user.schema';
// import { HardwareStoreArticleModule } from 'src/articles/categories/hardwareStore/category.module';

@Module({
  imports: [
    // HardwareStoreArticleModule,
    HardwareStorePageModule,
    MongooseModule.forFeature(
      [{ name: HardwareStoreUser.name, schema: HardwareStoreUserSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [HardwareStoreUserResolver, HardwareStoreUserService],
  exports: [HardwareStoreUserService],
})
export class HardwareStoreUserModule {}
