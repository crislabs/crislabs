import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import { CreateArticle, UpdateArticle, UpdateContentArticle, UpdateLikesArticle, UpdateTagsArticle } from '../dto/article.input';
import { CreateProduct, UpdateProduct } from '../dto/product.input';
import { InputImage, UpdateImage, UpdateImageProduct } from '../dto/site.input';

export function articleCreated({
  title,
  description,
  siteId,
  parentId,
  uid,
}: CreateArticle) {
  return {
    _id: new Types.ObjectId(),
    siteId: siteId,
    parentId: parentId,
    slug: slug(title),
    dataArticle: {
      author: uid,
      seoArticle: {
        title: title,
        href: slug(title),
        description: description,
      },
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'article created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function articleUpdated({ id, title, description, uid }: UpdateArticle) {
  return {
    $set: {
      'dataArticle.seoArticle.title': title,
      'dataArticle.seoArticle.href': slug(title),
      'dataArticle.seoArticle.description': description,
      'dataArticle.updateDate.lastUpdatedAt': new Date(),
      slug: slug(title),
    },
    $push: {
      'dataArticle.updateDate.register': {
        uid: uid,
        change: 'article updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleContentUpdated({ content, uid }: UpdateContentArticle) {
  return {
    $set: {
      'dataArticle.content': content,
      'dataArticle.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataArticle.updateDate.register': {
        uid: uid,
        change: 'article content updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleTagsUpdated({ tags, uid }: UpdateTagsArticle) {
  return {
    $set: {
      'dataArticle.tags': tags.map((data) => ({
        uid: uuidv3(),
        text: data,
        slug: slug(data),
      })),
      'dataArticle.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataArticle.updateDate.register': {
        uid: uid,
        change: 'article tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleLikesUpdated({ uid }: UpdateLikesArticle) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataArticle.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'dataArticle.likes': uid,
    },
    $push: {
      'dataArticle.updateDate.register': {
        uid: uid,
        change: 'comment likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleDisLikesUpdated({ uid }: UpdateLikesArticle) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataArticle.updateDate.lastUpdatedAt': new Date(),
    },
    $pull: {
      'dataArticle.likes': uid,
    },
    $push: {
      'dataArticle.updateDate.register': {
        uid: uid,
        change: 'comment dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function articleImageUpdated({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    $set: {
      'dataArticle.thumbnail': {
        uid: uuidv3(),
        src: src,
        alt: alt,
      },
      'dataArticle.seoArticle.image.src': src,
      'dataArticle.seoArticle.image.alt': alt,
      'dataArticle.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataArticle.updateDate.register': {
        uid: uid,
        change: 'article image updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function typeProduct(type: string) {
  let data: string;
  switch (type) {
    case 'adoption':
      data = 'Adoption';
      break;

    default:
      console.log(`Sorry, we are out of ${type}.`);
      break;
  }
  return data;
}
