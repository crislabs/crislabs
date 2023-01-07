import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HardwareStoreCommentModule } from 'src/comments/categories/hardwareStore/category.module';
import { HardwareStoreArticle } from 'src/common/entities/article.model';
import { HardwareStoreArticleSchema } from 'src/common/entities/article.schema';
import { HardwareStoreArticleResolver } from './category.resolver';
import { HardwareStoreArticleService } from './category.service';

@Module({
  imports: [
    HardwareStoreCommentModule,
    MongooseModule.forFeature(
      [{ name: HardwareStoreArticle.name, schema: HardwareStoreArticleSchema }],
      'hardwareStoreDB',
    ),
  ],
  providers: [HardwareStoreArticleResolver, HardwareStoreArticleService],
  exports: [HardwareStoreArticleService]
})
export class HardwareStoreArticleModule {}
