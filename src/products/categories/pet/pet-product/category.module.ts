import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetCommentModule } from 'src/comments/categories/pet/category.module';
import { PetProduct } from 'src/common/entities/product.model';
import { PetProductSchema } from 'src/common/entities/product.schema';
import { PetProductResolver } from './category.resolver';
import { PetProductService } from './category.service';

@Module({
  imports: [
    PetCommentModule,
    MongooseModule.forFeature(
      [{ name: PetProduct.name, schema: PetProductSchema }],
      'petDB',
    ),
  ],
  providers: [PetProductResolver, PetProductService],
  exports: [PetProductService],
})
export class PetProductModule {}
