import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from './common/config/common.module';
import { PagesModule } from './pages/pages.module';
import { ProductsModule } from './products/products.module';
import { SitesModule } from './sites/sites.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, SitesModule, PagesModule, UsersModule, ProductsModule, CommentsModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
