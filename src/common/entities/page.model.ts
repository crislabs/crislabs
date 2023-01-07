import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { AbstractModel } from '../abstract/abstract.model';
import { Seo, Type, UpdateDate } from './site.model';

@ObjectType()
export class Page extends AbstractModel {
  @Field(() => DataPage)
  readonly dataPage: DataPage | string;
  @Field()
  readonly slug: string;
  @Field()
  readonly siteId: string;
  @Field()
  readonly parentId: string;
}

@ObjectType()
export class DataPage {
  @Field()
  readonly type: string;
  @Field({ nullable: true })
  readonly icon?: string;
  @Field(() => Seo)
  readonly seoPage: Seo | string;
  @Field(() => [ComponentPage])
  readonly section?: ComponentPage[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class ComponentPage {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}

@ObjectType()
export class WearPage0 extends Page {}
@ObjectType()
export class WearPage1 extends Page {}
@ObjectType()
export class WearPage2 extends Page {}
@ObjectType()
export class WearPage3 extends Page {}
@ObjectType()
export class WearPage4 extends Page {}
@ObjectType()
export class WearPage5 extends Page {}
@ObjectType()
export class WearPage6 extends Page {}
@ObjectType()
export class WearPage7 extends Page {}
@ObjectType()
export class WearPage8 extends Page {}
@ObjectType()
export class WearPage9 extends Page {}
@ObjectType()
export class WearPage10 extends Page {}
@ObjectType()
export class WearPage11 extends Page {}
@ObjectType()
export class WearPage12 extends Page {}

@ObjectType()
export class FoodPage0 extends Page {}
@ObjectType()
export class FoodPage1 extends Page {}
@ObjectType()
export class FoodPage2 extends Page {}
@ObjectType()
export class FoodPage3 extends Page {}
@ObjectType()
export class FoodPage4 extends Page {}
@ObjectType()
export class FoodPage5 extends Page {}
@ObjectType()
export class FoodPage6 extends Page {}
@ObjectType()
export class FoodPage7 extends Page {}
@ObjectType()
export class FoodPage8 extends Page {}
@ObjectType()
export class FoodPage9 extends Page {}
@ObjectType()
export class FoodPage10 extends Page {}
@ObjectType()
export class FoodPage11 extends Page {}
@ObjectType()
export class FoodPage12 extends Page {}

@ObjectType()
export class MarketingPage0 extends Page {}
@ObjectType()
export class MarketingPage1 extends Page {}
@ObjectType()
export class MarketingPage2 extends Page {}
@ObjectType()
export class MarketingPage3 extends Page {}
@ObjectType()
export class MarketingPage4 extends Page {}
@ObjectType()
export class MarketingPage5 extends Page {}
@ObjectType()
export class MarketingPage6 extends Page {}
@ObjectType()
export class MarketingPage7 extends Page {}
@ObjectType()
export class MarketingPage8 extends Page {}
@ObjectType()
export class MarketingPage9 extends Page {}
@ObjectType()
export class MarketingaPge10 extends Page {}
@ObjectType()
export class MarketingPage11 extends Page {}
@ObjectType()
export class MarketingPage12 extends Page {}

@ObjectType()
export class HardwareStorePage0 extends Page {}
@ObjectType()
export class HardwareStorePage1 extends Page {}
@ObjectType()
export class HardwareStorePage2 extends Page {}
@ObjectType()
export class HardwareStorePage3 extends Page {}
@ObjectType()
export class HardwareStorePage4 extends Page {}
@ObjectType()
export class HardwareStorePage5 extends Page {}
@ObjectType()
export class HardwareStorePage6 extends Page {}
@ObjectType()
export class HardwareStorePage7 extends Page {}
@ObjectType()
export class HardwareStorePage8 extends Page {}
@ObjectType()
export class HardwareStorePage9 extends Page {}
@ObjectType()
export class HardwareStorePage10 extends Page {}
@ObjectType()
export class HardwareStorePage11 extends Page {}
@ObjectType()
export class HardwareStorePage12 extends Page {}

@ObjectType()
export class PetPage0 extends Page {}
@ObjectType()
export class PetPage1 extends Page {}
@ObjectType()
export class PetPage2 extends Page {}
@ObjectType()
export class PetPage3 extends Page {}
@ObjectType()
export class PetPage4 extends Page {}
@ObjectType()
export class PetPage5 extends Page {}
@ObjectType()
export class PetPage6 extends Page {}
@ObjectType()
export class PetPage7 extends Page {}
@ObjectType()
export class PetPage8 extends Page {}
@ObjectType()
export class PetPage9 extends Page {}
@ObjectType()
export class PetPage10 extends Page {}
@ObjectType()
export class PetPage11 extends Page {}
@ObjectType()
export class PetPage12 extends Page {}

@ObjectType()
export class PortfolioPage0 extends Page {}
@ObjectType()
export class PortfolioPage1 extends Page {}
@ObjectType()
export class PortfolioPage2 extends Page {}
@ObjectType()
export class PortfolioPage3 extends Page {}
@ObjectType()
export class PortfolioPage4 extends Page {}
@ObjectType()
export class PortfolioPage5 extends Page {}
@ObjectType()
export class PortfolioPage6 extends Page {}
@ObjectType()
export class PortfolioPage7 extends Page {}
@ObjectType()
export class PortfolioPage8 extends Page {}
@ObjectType()
export class PortfolioPage9 extends Page {}
@ObjectType()
export class PortfolioPage10 extends Page {}
@ObjectType()
export class PortfolioPage11 extends Page {}
@ObjectType()
export class PortfolioPage12 extends Page {}

@ObjectType()
export class GlassesPage0 extends Page {}
@ObjectType()
export class GlassesPage1 extends Page {}
@ObjectType()
export class GlassesPage2 extends Page {}
@ObjectType()
export class GlassesPage3 extends Page {}
@ObjectType()
export class GlassesPage4 extends Page {}
@ObjectType()
export class GlassesPage5 extends Page {}
@ObjectType()
export class GlassesPage6 extends Page {}
@ObjectType()
export class GlassesPage7 extends Page {}
@ObjectType()
export class GlassesPage8 extends Page {}
@ObjectType()
export class GlassesPage9 extends Page {}
@ObjectType()
export class GlassesPage10 extends Page {}
@ObjectType()
export class GlassesPage11 extends Page {}
@ObjectType()
export class GlassesPage12 extends Page {}

@ObjectType()
export class FurniturePage0 extends Page {}
@ObjectType()
export class FurniturePage1 extends Page {}
@ObjectType()
export class FurniturePage2 extends Page {}
@ObjectType()
export class FurniturePage3 extends Page {}
@ObjectType()
export class FurniturePage4 extends Page {}
@ObjectType()
export class FurniturePage5 extends Page {}
@ObjectType()
export class FurniturePage6 extends Page {}
@ObjectType()
export class FurniturePage7 extends Page {}
@ObjectType()
export class FurniturePage8 extends Page {}
@ObjectType()
export class FurniturePage9 extends Page {}
@ObjectType()
export class FurniturePage10 extends Page {}
@ObjectType()
export class FurniturePage11 extends Page {}
@ObjectType()
export class FurniturePage12 extends Page {}

@ObjectType()
export class EducationPage0 extends Page {}
@ObjectType()
export class EducationPage1 extends Page {}
@ObjectType()
export class EducationPage2 extends Page {}
@ObjectType()
export class EducationPage3 extends Page {}
@ObjectType()
export class EducationPage4 extends Page {}
@ObjectType()
export class EducationPage5 extends Page {}
@ObjectType()
export class EducationPage6 extends Page {}
@ObjectType()
export class EducationPage7 extends Page {}
@ObjectType()
export class EducationPage8 extends Page {}
@ObjectType()
export class EducationPage9 extends Page {}
@ObjectType()
export class EducationPage10 extends Page {}
@ObjectType()
export class EducationPage11 extends Page {}
@ObjectType()
export class EducationPage12 extends Page {}

// @ObjectType()
// export class ToolPage0 extends Page {}
// @ObjectType()
// export class ToolPage1 extends Page {}
// @ObjectType()
// export class ToolPage2 extends Page {}
// @ObjectType()
// export class ToolPage3 extends Page {}
// @ObjectType()
// export class ToolPage4 extends Page {}
// @ObjectType()
// export class ToolPage5 extends Page {}
// @ObjectType()
// export class ToolPage6 extends Page {}
// @ObjectType()
// export class ToolPage7 extends Page {}
// @ObjectType()
// export class ToolPage8 extends Page {}
// @ObjectType()
// export class ToolPage9 extends Page {}
// @ObjectType()
// export class ToolPage10 extends Page {}
// @ObjectType()
// export class ToolPage11 extends Page {}
// @ObjectType()
// export class ToolPage12 extends Page {}

// @ObjectType()
// export class EnginePage0 extends Page {}
// @ObjectType()
// export class EnginePage1 extends Page {}
// @ObjectType()
// export class EnginePage2 extends Page {}
// @ObjectType()
// export class EnginePage3 extends Page {}
// @ObjectType()
// export class EnginePage4 extends Page {}
// @ObjectType()
// export class EnginePage5 extends Page {}
// @ObjectType()
// export class EnginePage6 extends Page {}
// @ObjectType()
// export class EnginePage7 extends Page {}
// @ObjectType()
// export class EnginePage8 extends Page {}
// @ObjectType()
// export class EnginePage9 extends Page {}
// @ObjectType()
// export class EnginePage10 extends Page {}
// @ObjectType()
// export class EnginePage11 extends Page {}
// @ObjectType()
// export class EnginePage12 extends Page {}

@ObjectType()
export class ListPetPage0 extends RelayTypes<PetPage0>(PetPage0) {}
@ObjectType()
export class ListPetPage1 extends RelayTypes<PetPage1>(PetPage1) {}
@ObjectType()
export class ListPetPage2 extends RelayTypes<PetPage2>(PetPage2) {}
@ObjectType()
export class ListPetPage3 extends RelayTypes<PetPage3>(PetPage3) {}
@ObjectType()
export class ListPetPage4 extends RelayTypes<PetPage4>(PetPage4) {}
@ObjectType()
export class ListPetPage5 extends RelayTypes<PetPage5>(PetPage5) {}
@ObjectType()
export class ListPetPage6 extends RelayTypes<PetPage6>(PetPage6) {}
@ObjectType()
export class ListPetPage7 extends RelayTypes<PetPage7>(PetPage7) {}
@ObjectType()
export class ListPetPage8 extends RelayTypes<PetPage8>(PetPage8) {}
@ObjectType()
export class ListPetPage9 extends RelayTypes<PetPage9>(PetPage9) {}
@ObjectType()
export class ListPetPage10 extends RelayTypes<PetPage10>(PetPage10) {}
@ObjectType()
export class ListPetPage11 extends RelayTypes<PetPage11>(PetPage11) {}
@ObjectType()
export class ListPetPage12 extends RelayTypes<PetPage12>(PetPage12) {}

@ObjectType()
export class ListPortfolioPage0 extends RelayTypes<PortfolioPage0>(PortfolioPage0) {}
@ObjectType()
export class ListPortfolioPage1 extends RelayTypes<PortfolioPage1>(PortfolioPage1) {}
@ObjectType()
export class ListPortfolioPage2 extends RelayTypes<PortfolioPage2>(PortfolioPage2) {}
@ObjectType()
export class ListPortfolioPage3 extends RelayTypes<PortfolioPage3>(PortfolioPage3) {}
@ObjectType()
export class ListPortfolioPage4 extends RelayTypes<PortfolioPage4>(PortfolioPage4) {}
@ObjectType()
export class ListPortfolioPage5 extends RelayTypes<PortfolioPage5>(PortfolioPage5) {}
@ObjectType()
export class ListPortfolioPage6 extends RelayTypes<PortfolioPage6>(PortfolioPage6) {}
@ObjectType()
export class ListPortfolioPage7 extends RelayTypes<PortfolioPage7>(PortfolioPage7) {}
@ObjectType()
export class ListPortfolioPage8 extends RelayTypes<PortfolioPage8>(PortfolioPage8) {}
@ObjectType()
export class ListPortfolioPage9 extends RelayTypes<PortfolioPage9>(PortfolioPage9) {}
@ObjectType()
export class ListPortfolioPage10 extends RelayTypes<PortfolioPage10>(PortfolioPage10) {}
@ObjectType()
export class ListPortfolioPage11 extends RelayTypes<PortfolioPage11>(PortfolioPage11) {}
@ObjectType()
export class ListPortfolioPage12 extends RelayTypes<PortfolioPage12>(PortfolioPage12) {}

@ObjectType()
export class ListHardwareStorePage0 extends RelayTypes<HardwareStorePage0>(HardwareStorePage0) {}
@ObjectType()
export class ListHardwareStorePage1 extends RelayTypes<HardwareStorePage1>(HardwareStorePage1) {}
@ObjectType()
export class ListHardwareStorePage2 extends RelayTypes<HardwareStorePage2>(HardwareStorePage2) {}
@ObjectType()
export class ListHardwareStorePage3 extends RelayTypes<HardwareStorePage3>(HardwareStorePage3) {}
@ObjectType()
export class ListHardwareStorePage4 extends RelayTypes<HardwareStorePage4>(HardwareStorePage4) {}
@ObjectType()
export class ListHardwareStorePage5 extends RelayTypes<HardwareStorePage5>(HardwareStorePage5) {}
@ObjectType()
export class ListHardwareStorePage6 extends RelayTypes<HardwareStorePage6>(HardwareStorePage6) {}
@ObjectType()
export class ListHardwareStorePage7 extends RelayTypes<HardwareStorePage7>(HardwareStorePage7) {}
@ObjectType()
export class ListHardwareStorePage8 extends RelayTypes<HardwareStorePage8>(HardwareStorePage8) {}
@ObjectType()
export class ListHardwareStorePage9 extends RelayTypes<HardwareStorePage9>(HardwareStorePage9) {}
@ObjectType()
export class ListHardwareStorePage10 extends RelayTypes<HardwareStorePage10>(HardwareStorePage10) {}
@ObjectType()
export class ListHardwareStorePage11 extends RelayTypes<HardwareStorePage11>(HardwareStorePage11) {}
@ObjectType()
export class ListHardwareStorePage12 extends RelayTypes<HardwareStorePage12>(HardwareStorePage12) {}
