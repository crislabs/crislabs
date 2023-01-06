import { Module } from '@nestjs/common';
import { PetUserService } from './category.service';
import { PetUserResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PetPageModule } from 'src/pages/categories/pet/category.module';
import { PetUser } from 'src/common/entities/user.model';
import { PetUserSchema } from 'src/common/entities/user.schema';
// import { PetArticleModule } from 'src/articles/categories/pet/category.module';

@Module({
  imports: [
    // PetArticleModule,
    PetPageModule,
    MongooseModule.forFeature(
      [{ name: PetUser.name, schema: PetUserSchema }],
      'petDB',
    ),
  ],
  providers: [PetUserResolver, PetUserService],
  exports: [PetUserService],
})
export class PetUserModule {}
