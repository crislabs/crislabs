import { Module } from '@nestjs/common';
import { PortfolioUserService } from './category.service';
import { PortfolioUserResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioPageModule } from 'src/pages/categories/portfolio/category.module';
import { PortfolioUser } from 'src/common/entities/user.model';
import { PortfolioUserSchema } from 'src/common/entities/user.schema';
// import { PortfolioArticleModule } from 'src/articles/categories/portfolio/category.module';

@Module({
  imports: [
    // PortfolioArticleModule,
    PortfolioPageModule,
    MongooseModule.forFeature(
      [{ name: PortfolioUser.name, schema: PortfolioUserSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioUserResolver, PortfolioUserService],
  exports: [PortfolioUserService],
})
export class PortfolioUserModule {}
