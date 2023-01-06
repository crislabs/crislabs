import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../abstract/abstract.schema';
import { DataSite } from './site.model';

@Schema({ versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({ type: DataSite })
  dataSite: DataSite;
  @Prop({ trim: true })
  url: string;
}

export const SiteSchema = SchemaFactory.createForClass(SiteDocument);

export const FoodSiteSchema = SchemaFactory.createForClass(SiteDocument);
export const WearSiteSchema = SchemaFactory.createForClass(SiteDocument);
export const MarketingSiteSchema = SchemaFactory.createForClass(SiteDocument);

export const HardwareStoreSiteSchema =
  SchemaFactory.createForClass(SiteDocument);

export const PetSiteSchema = SchemaFactory.createForClass(SiteDocument);
export const PortfolioSiteSchema = SchemaFactory.createForClass(SiteDocument);
