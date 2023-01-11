import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePage, UpdatePage } from 'src/common/dto/page.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { HardwareStorePage0 } from 'src/common/entities/page.model';
import { PageDocument } from 'src/common/entities/page.schema';

import {
  pageCreated,
  pageUpdate,
  pageUpdateImage,
} from 'src/common/functions/pages';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';
import { HardwareStorePage1Service } from './page1.service';

@Injectable()
export class HardwareStorePage0Service {
  constructor(
    @InjectModel(HardwareStorePage0.name, 'hardwareStoreDB')
    private pageModel: Model<PageDocument>,
  ) { }

  async create(input: CreatePage) {
    // try {
    //   // await this.service.findAll()
    // } catch (error) { 
    //   throw new HttpException({
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   }, HttpStatus.FORBIDDEN, {
    //     cause: error
    //   });
    // }

    const page = await this.pageModel.findOne(
      {
        slug: slug(input.title),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );

    if (page) {
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
      // throw new HttpException({
      //   status: HttpStatus.FORBIDDEN,
      //   error: 'This is a custom message',
      // }, HttpStatus.FORBIDDEN, {
      // });
      // throw new ForbiddenException();
      // throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
    const createdDocument = new this.pageModel(pageCreated(input));
    return (await createdDocument.save()).toJSON();
  }

  async update(input: UpdatePage) {
    const page = await this.pageModel.findOne(
      {
        _id: { $ne: input.id },
        slug: slug(input.title),
        siteId: input.siteId,
        parentId: input.parentId,
      },
      {},
      { lean: true },
    );
    if (page) {
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const document = await this.pageModel.findOneAndUpdate(
      { _id: input.id },
      pageUpdate(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async updateImage(input: UpdateImage) {
    const document = await this.pageModel.findOneAndUpdate(
      { _id: input.id },
      pageUpdateImage(input),
      { lean: true, new: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async deleteOne(id: string) {
    await this.pageModel.deleteOne({ _id: id });
    // await this.page1Service.deleteManyByParentId([id])
    return id;
  }

  async deleteMany(ids: string[]) {
    await this.pageModel.deleteMany({ _id: { $in: ids } });
    // await this.page1Service.deleteManyByParentId(ids)
    return ids;
  }

  async deleteManyByParentId(ids: string[]) {
    await this.pageModel.deleteMany({ parentId: { $in: ids } });
    // await this.page1Service.deleteManyByParentId(ids)
    return 'pages delete';
  }

  async deleteManyBySiteId(ids: string[]) {
    await this.pageModel.deleteMany({ siteId: { $in: ids } });
    return 'pages delete';
  }

  async deleteAll() {
    await this.pageModel.deleteMany();
    return 'pages delete';
  }

  findAll() {
    return this.pageModel.find();
  }

  findByParentId(parentId: string) {
    return this.pageModel.find({ parentId: parentId });
  }

  findBySiteId(siteId: string) {
    return this.pageModel.find({ siteId: siteId });
  }

  findByParentIdByPagination(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    return this.pageModel.find({ parentId: parentId }).sort({ 'dataPage.updateDate.lastUpdatedAt': -1 }).skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const document = await this.pageModel.findOne(
      { _id: id },
      {},
      { lean: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findOneBySlug(slug: string, siteId: string) {
    const document = await this.pageModel.findOne(
      { slug: slug, siteId: siteId },
      {},
      { lean: true },
    );
    if (!document) throw new NotFoundException('Document not found.');

    return document;
  }

  async findByCursor(paginationQuery: ListInput, parentId: string) {
    const { limit, offset } = paginationQuery;
    const count = await this.pageModel.count({ parentId: parentId });
    const data = await this.pageModel
      .find({ parentId: parentId }, {}, { lean: true })
      .sort({ 'dataPage.updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, count };
  }
}
