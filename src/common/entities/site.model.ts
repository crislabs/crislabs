import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract/abstract.model';
import { RelayTypes } from '../pagination/relay/relay.types';

@ObjectType()
export class Site extends AbstractModel {
  @Field(() => DataSite)
  readonly dataSite: DataSite | string;
  @Field()
  readonly url: string;
}

@ObjectType()
export class DataSite {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field(() => ImageSite, { nullable: true })
  readonly imageSite?: ImageSite | string;
  @Field(() => InfoSite)
  readonly infoSite: InfoSite | string;
  @Field(() => [AdminSite])
  readonly adminSite?: AdminSite[];
  @Field(() => [DBSite], { nullable: 'itemsAndList' })
  readonly dbSite: DBSite[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class DBSite {
  @Field()
  readonly uid: string;
  @Field()
  readonly label: string;
  @Field()
  readonly slug: string;
}

@ObjectType()
export class ImageSite {
  @Field(() => Image, { nullable: true })
  readonly banner?: Image | string;
  @Field(() => Image, { nullable: true })
  readonly logo?: Image | string;
  @Field(() => Image, { nullable: true })
  readonly icon?: Image | string;
}

@ObjectType()
export class Image {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field({ nullable: true })
  readonly src?: string;
  @Field({ nullable: true })
  readonly alt?: string;
}

@ObjectType()
export class AdminSite {
  @Field()
  readonly privilege: string;
  @Field()
  readonly sid: string;
}

@ObjectType()
export class InfoSite {
  @Field()
  readonly clientId: string;
}

@ObjectType()
export class UpdateDate {
  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  lastUpdatedAt?: Date;
  @Field(() => [Register], { nullable: true })
  readonly register?: Register[];
}

@ObjectType()
export class Register {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field({ nullable: true })
  readonly change?: string;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Seo {
  @Field()
  readonly title: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;
  @Field(() => Image, { nullable: true })
  readonly image?: Image | string;
}


@ObjectType()
export class Tags {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
  @Field()
  readonly slug: string;
}

@ObjectType()
export class Type {
  @Field()
  label: string;
  @Field()
  slug: string;
}

  @ObjectType()
  export class MarketingSite extends Site {}
  @ObjectType()
  export class FoodSite extends Site {}
  @ObjectType()
  export class WearSite extends Site {}
  @ObjectType()
  export class HardwareStoreSite extends Site {}
  
  @ObjectType()
  export class PetSite extends Site {}
  
  @ObjectType()
  export class ListPetSite extends RelayTypes<PetSite>(PetSite) {}

  @ObjectType()
  export class PortfolioSite extends Site {}
  
  @ObjectType()
  export class ListPortfolioSite extends RelayTypes<PortfolioSite>(PortfolioSite) {}
