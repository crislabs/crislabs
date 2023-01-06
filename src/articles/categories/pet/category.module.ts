import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetCommentModule } from 'src/comments/categories/pet/category.module';
import { PetArticle } from 'src/common/entities/article.model';
import { PetArticleSchema } from 'src/common/entities/article.schema';
import { PetArticleResolver } from './category.resolver';
import { PetArticleService } from './category.service';

@Module({
  imports: [
    PetCommentModule,
    MongooseModule.forFeature(
      [{ name: PetArticle.name, schema: PetArticleSchema }],
      'petDB',
    ),
  ],
  providers: [PetArticleResolver, PetArticleService],
  exports: [PetArticleService]
})
export class PetArticleModule {}
