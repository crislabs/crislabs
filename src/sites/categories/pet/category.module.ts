import { Module } from '@nestjs/common';
import { PetSiteService } from './category.service';
import { PetSiteResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSite } from 'src/common/entities/site.model';
import { PetSiteSchema } from 'src/common/entities/site.schema';
import { PetPageModule } from 'src/pages/categories/pet/category.module';
import { PetUserModule } from 'src/users/categories/pet/category.module';
import { PetProductModule } from 'src/products/categories/pet/pet-product/category.module';
import { PetAdoptionModule } from 'src/products/categories/pet/pet-adoption/category.module';
import { PetArticleModule } from 'src/articles/categories/pet/category.module';

@Module({
  imports: [
    PetPageModule,
    PetUserModule,
    PetProductModule,
    PetAdoptionModule,
    PetArticleModule,
    MongooseModule.forFeature(
      [{ name: PetSite.name, schema: PetSiteSchema }],
      'petDB',
    ),
  ],
  providers: [PetSiteResolver, PetSiteService]
})
export class PetSiteModule {}
