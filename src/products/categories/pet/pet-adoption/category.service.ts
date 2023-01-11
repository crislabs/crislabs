import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from 'src/common/dto/product.input';
import { UpdateImageProduct } from 'src/common/dto/site.input';
import { PetAdoption } from 'src/common/entities/product.model';
import { ProductDocument } from 'src/common/entities/product.schema';
import {
  productCreated,
  productDetailUpdated,
  productDisLikesUpdated,
  productLikesUpdated,
  productSpecsUpdated,
  productTagsUpdated,
  productUpdated,
  productUpdateImage,
} from 'src/common/functions/product';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
@Injectable()
export class PetAdoptionService {
  constructor(
    @InjectModel(PetAdoption.name, 'petDB')
    private adoptionModel: Model<ProductDocument>,
  ) {}

  async create(input: CreateProduct) {
    const adoption = await this.adoptionModel.findOne(
      {
        slug: slug(input.name),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (adoption) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.name}"`,
      );
    }
    const data = new this.adoptionModel(productCreated(input));
    return (await data.save()).toJSON();
  }

  async update(input: UpdateProduct) {
    const adoption = await this.adoptionModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.name),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (adoption) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.name}"`,
      );
    }
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDetail(input: UpdateDetailProduct) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productDetailUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateSpecs(input: UpdateSpecsProduct) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productSpecsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateTags(input: UpdateTagsProduct) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productTagsUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateLikes(input: UpdateLikesProduct) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDisLikes(input: UpdateLikesProduct) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productDisLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateImage(input: UpdateImageProduct) {
    const data = await this.adoptionModel.findOneAndUpdate(
      { _id: input.id },
      productUpdateImage(input),
      { lean: true, new: true },
    );
    return data;
  }

  async deleteOne(id: string) {
    await this.adoptionModel.deleteOne({ _id: id });
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.adoptionModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.adoptionModel.deleteMany({ siteId: { $in: ids } });
    return 'pages delete';
  }
  async deleteManyByParentId(ids: string[]) {
    await this.adoptionModel.deleteMany({ parentId: { $in: ids } });
    return 'pages delete';
  }

  async deleteAll() {
    await this.adoptionModel.deleteMany();
    return 'pages delete';
  }

  findAll() {
    const data = this.adoptionModel.find({});
    return data;
  }

  findBySiteId(siteId: string) {
    const data = this.adoptionModel.find({ siteId: siteId });
    return data;
  }

  findByParentId(parentId: string) {
    const data = this.adoptionModel.find({ parentId: parentId });

    return data;
  }

  async findOne(id: string) {
    const document = await this.adoptionModel.findOne({ _id: id });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.adoptionModel.findOne({
      slug: slug,
      siteId: siteId,
    });
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.adoptionModel.find({ parentId: parentId }).sort({ 'dataProduct.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findByCursor(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.adoptionModel.count({ parentId: parentId });
    const data = await this.adoptionModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'dataProduct.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
