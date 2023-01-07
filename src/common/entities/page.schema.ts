import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataPage } from './page.model';

@Schema({ versionKey: false })
export class PageDocument extends AbstractDocument {
  @Prop({ type: DataPage })
  dataPage: DataPage;
  @Prop({ trim: true })
  slug: string;
  @Prop({ trim: true })
  parentId: string;
  @Prop({ trim: true })
  siteId: string;
}

export const FoodPage0Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage1Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage2Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage3Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage4Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage5Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage6Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage7Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage8Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage9Schema = SchemaFactory.createForClass(PageDocument);
export const FoodPage10Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage0Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage1Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage2Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage3Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage4Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage5Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage6Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage7Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage8Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage9Schema = SchemaFactory.createForClass(PageDocument);
export const WearPage10Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage0Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage1Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage2Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage3Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage4Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage5Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage6Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage7Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage8Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage9Schema = SchemaFactory.createForClass(PageDocument);
export const MarketingPage10Schema = SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage0Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage1Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage2Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage3Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage4Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage5Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage6Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage7Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage8Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage9Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage10Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage11Schema =
  SchemaFactory.createForClass(PageDocument);
export const HardwareStorePage12Schema =
  SchemaFactory.createForClass(PageDocument);

export const PetPage0Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage1Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage2Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage3Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage4Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage5Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage6Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage7Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage8Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage9Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage10Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage11Schema = SchemaFactory.createForClass(PageDocument);
export const PetPage12Schema = SchemaFactory.createForClass(PageDocument);

export const PortfolioPage0Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage1Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage2Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage3Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage4Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage5Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage6Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage7Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage8Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage9Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage10Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage11Schema = SchemaFactory.createForClass(PageDocument);
export const PortfolioPage12Schema = SchemaFactory.createForClass(PageDocument);
