import { Module } from '@nestjs/common';
import { PortfolioSiteService } from './category.service';
import { PortfolioSiteResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSite } from 'src/common/entities/site.model';
import { PortfolioSiteSchema } from 'src/common/entities/site.schema';
import { PortfolioPageModule } from 'src/pages/categories/portfolio/category.module';
import { PortfolioUserModule } from 'src/users/categories/portfolio/category.module';
import { PortfolioArticleModule } from 'src/articles/categories/portfolio/category.module';
// import { PortfolioPageModule } from 'src/pages/categories/portfolio/category.module';
// import { PortfolioUserModule } from 'src/users/categories/portfolio/category.module';
// import { PortfolioProductModule } from 'src/products/categories/portfolio/portfolio-product/category.module';
// import { PortfolioAdoptionModule } from 'src/products/categories/portfolio/portfolio-adoption/category.module';
// import { PortfolioArticleModule } from 'src/articles/categories/portfolio/category.module';

@Module({
  imports: [
    PortfolioPageModule,
    PortfolioUserModule,
    // PortfolioProductModule,
    // PortfolioAdoptionModule,
    PortfolioArticleModule,
    MongooseModule.forFeature(
      [{ name: PortfolioSite.name, schema: PortfolioSiteSchema }],
      'portfolioDB',
    ),
  ],
  providers: [PortfolioSiteResolver, PortfolioSiteService]
})
export class PortfolioSiteModule {}
