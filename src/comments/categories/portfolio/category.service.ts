import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticle, UpdateArticle } from 'src/common/dto/article.input';
import { CreateComment, UpdateComment, UpdateLikesComment } from 'src/common/dto/comment.input';
import { UpdateImage } from 'src/common/dto/site.input';
import { PortfolioArticle } from 'src/common/entities/article.model';
import { ArticleDocument } from 'src/common/entities/article.schema';
import { PortfolioComment } from 'src/common/entities/comment.model';
import { CommentDocument } from 'src/common/entities/comment.schema';
import {
  articleCreated,
  articleImageUpdated,
  articleUpdated,
} from 'src/common/functions/article';
import { commentCreated, commentDisLikesUpdated, commentLikesUpdated, commentUpdated } from 'src/common/functions/comment';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { slug } from 'utils/function';

@Injectable()
export class PortfolioCommentService {
  constructor(
    @InjectModel(PortfolioComment.name, 'portfolioDB')
    private commentModel: Model<CommentDocument>,
  ) {}

  async create(input: CreateComment) {
    const data = new this.commentModel(commentCreated(input));
    return (await data.save()).toJSON();
  }

  async update(input: UpdateComment) {
    const data = await this.commentModel.findOneAndUpdate(
      { _id: input.id },
      commentUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  async updateLikes(input: UpdateLikesComment) {
    const data = await this.commentModel.findOneAndUpdate(
      { _id: input.id },
      commentLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }
  async updateDisLikes(input: UpdateLikesComment) {
    const data = await this.commentModel.findOneAndUpdate(
      { _id: input.id },
      commentDisLikesUpdated(input),
      { lean: true, new: true },
    );
    return data;
  }

  // async updateImage(input: UpdateImage) {
  //   const data = await this.articleModel.findOneAndUpdate(
  //     { _id: input.id },
  //     articleImageUpdated(input),
  //     { lean: true, new: true },
  //   );
  //   return data;
  // }

  // async deleteOne(id: string) {
  //   await this.articleModel.deleteOne({ _id: id });
  //   return id;
  // }

  // async deleteMany(ids: string[]) {
  //   await this.articleModel.deleteMany({ _id: { $in: ids } });
  //   return ids;
  // }

  // async deleteManyBySiteId(ids: string[]) {
  //   await this.articleModel.deleteMany({ siteId: { $in: ids } });
  //   return 'articles delete';
  // }

  // async deleteAll() {
  //   await this.articleModel.deleteMany();
  //   return 'articles delete';
  // }

  // findAll() {
  //   const data = this.articleModel.find({});
  //   return data;
  // }

  // findBySiteId(siteId: string) {
  //   const data = this.articleModel.find({ siteId: siteId });
  //   return data;
  // }

  findByParentId(parentId: string) {
    const data = this.commentModel.find({ parentId: parentId });
    return data;
  }

  // async findOne(id: string) {
  //   const document = await this.articleModel.findOne({ _id: id });
  //   if (!document) throw new NotFoundException('Document not found.');
  //   return document;
  // }

  // async findOneBySlug(slug: string, siteId: string) {
  //   const document = await this.articleModel.findOne({
  //     slug: slug,
  //     siteId: siteId,
  //   });
  //   if (!document) throw new NotFoundException('Document not found.');

  //   return document;
  // }

  // async findByCursor(paginationQuery: ListInput, parentId: string) {
  //   const { limit, offset } = paginationQuery;
  //   const count = await this.articleModel.count({ parentId: parentId });
  //   const data = await this.articleModel
  //     .find({ parentId: parentId }, {}, { lean: true })
  //     .sort({ 'dataArticle.updateDate.lastUpdatedAt': -1 })
  //     .skip(offset)
  //     .limit(limit)
  //     .exec();
  //   return { data, count };
  // }
}
