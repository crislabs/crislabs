import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract/abstract.schema';
import { DataProduct } from './product.model';

// @Schema({ versionKey: false })
// export class ProductDocument extends AbstractDocument {
//   @Prop({ type: DataProduct })
//   dataWear: DataProduct;

//   @Prop({ trim: true })
//   slug: string;

//   @Prop({ trim: true })
//   siteId: string;

//   @Prop({ trim: true })
//   parentId: string;
// }

// export const ClothingProductSchema = SchemaFactory.createForClass(WearDocument);
// export const BackpackProductSchema = SchemaFactory.createForClass(WearDocument);
// export const HandbagProductSchema = SchemaFactory.createForClass(WearDocument);

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop({ type: DataProduct })
  dataProduct: DataProduct;

  @Prop({ trim: true })
  slug: string;

  @Prop({ trim: true })
  siteId: string;

  @Prop({ trim: true })
  parentId: string;
}
export const HardwareStoreProductSchema = SchemaFactory.createForClass(ProductDocument);

export const PetProductSchema = SchemaFactory.createForClass(ProductDocument);
export const PetAdoptionSchema = SchemaFactory.createForClass(ProductDocument);
export const FoodProductSchema = SchemaFactory.createForClass(ProductDocument);
