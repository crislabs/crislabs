import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateSite,
  UpdateAdminSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from 'src/common/dto/site.input';
import { PetSite } from 'src/common/entities/site.model';
import { SiteDocument } from 'src/common/entities/site.schema';
import {
  siteAdminUpdate,
  siteCreated,
  siteDBUpdate,
  siteImageUpdate,
  siteUpdate,
} from 'src/common/functions/sites';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { PetPage0Service } from 'src/pages/categories/pet/services/page0.service';

@Injectable()
export class PetSiteService {
  constructor(
    @InjectModel(PetSite.name, 'petDB')
    private siteModel: Model<SiteDocument>,
    // private readonly pageService: PetPage0Service,
  ) {}

  async create(input: CreateSite) {
    const createdDocument = new this.siteModel(siteCreated(input));
    return (await createdDocument.save()).toJSON();
  }

  async update(input: UpdateSite) {
    const document = await this.siteModel.findOneAndUpdate(
      { _id: input.id },
      siteUpdate(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async updateDB(input: UpdateDB) {
    const document = await this.siteModel.findOneAndUpdate(
      { _id: input.id },
      siteDBUpdate(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async updateAdmin(input: UpdateAdminSite) {
    const document = await this.siteModel.findOneAndUpdate(
      { _id: input.id },
      siteAdminUpdate(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }
  async updateImage(input: UpdateImage) {
    const document = await this.siteModel.findOneAndUpdate(
      { _id: input.id },
      siteImageUpdate(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async deleteOne(id: string) {
    await this.siteModel.deleteOne({ _id: id });
    // await this.pageService.deleteManyByParentId([id])
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.siteModel.deleteMany({ _id: { $in: ids } });
    // await this.pageService.deleteManyByParentId(ids)
    return ids;
  }

  async deleteAll() {
    await this.siteModel.deleteMany();
    // await this.pageService.deleteAll()
    return 'sites delete';
  }

  findAll() {
    return this.siteModel.find();
  }

  async findOne(id: string) {
    const document = await this.siteModel.findOne({ _id: id });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findByCursor(paginationQuery: ListInput) {
    const { limit, offset } = paginationQuery;
    const count = await this.siteModel.count();

    const data = await this.siteModel
      .find({}, {}, { lean: true })
      .sort({ 'dataSite.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
