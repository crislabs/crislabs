import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodCommentModule } from 'src/comments/categories/food/category.module';
import { FoodArticle } from 'src/common/entities/article.model';
import { FoodArticleSchema } from 'src/common/entities/article.schema';
import { FoodArticleResolver } from './category.resolver';
import { FoodArticleService } from './category.service';

@Module({
  imports: [
    FoodCommentModule,
    MongooseModule.forFeature(
      [{ name: FoodArticle.name, schema: FoodArticleSchema }],
      'foodDB',
    ),
  ],
  providers: [FoodArticleResolver, FoodArticleService],
  exports: [FoodArticleService]
})
export class FoodArticleModule {}
