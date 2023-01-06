import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioCommentModule } from 'src/comments/categories/portfolio/category.module';
import { PortfolioArticle } from 'src/common/entities/article.model';
import { PortfolioArticleSchema } from 'src/common/entities/article.schema';
import { PortfolioArticleResolver } from './category.resolver';
import { PortfolioArticleService } from './category.service';

@Module({
  imports: [
    PortfolioCommentModule,
    MongooseModule.forFeature(
      [{ name: PortfolioArticle.name, schema: PortfolioArticleSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioArticleResolver, PortfolioArticleService],
  exports: [PortfolioArticleService]
})
export class PortfolioArticleModule {}
