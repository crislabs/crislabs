import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetCommentModule } from 'src/comments/categories/pet/category.module';
import { PetAdoption } from 'src/common/entities/product.model';
import { PetAdoptionSchema } from 'src/common/entities/product.schema';
import { PetAdoptionResolver } from './category.resolver';
import { PetAdoptionService } from './category.service';

@Module({
  imports: [
    PetCommentModule,
    MongooseModule.forFeature(
      [{ name: PetAdoption.name, schema: PetAdoptionSchema }],
      'petDB',
    ),
  ],
  providers: [PetAdoptionResolver, PetAdoptionService],
  exports: [PetAdoptionService],
})
export class PetAdoptionModule {}
