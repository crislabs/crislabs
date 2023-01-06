import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import { CreateArticle, UpdateArticle } from '../dto/article.input';
import { CreateComment, UpdateComment, UpdateLikesComment } from '../dto/comment.input';
import { CreateProduct, UpdateProduct } from '../dto/product.input';
import { InputImage, UpdateImage, UpdateImageProduct } from '../dto/site.input';

export function commentCreated({
  author,
  content,
  siteId,
  parentId,
  uid,
}: CreateComment) {
  return {
    _id: new Types.ObjectId(),
    siteId: siteId,
    parentId: parentId,
    dataComment: {
      author: author,
      content: content,
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'comment created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function commentUpdated({
  
  content,
  siteId,
  parentId,
  uid,
}: UpdateComment) {
  return {
    $set: {
      'dataComment.content': content,
      'dataComment.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataComment.updateDate.register': {
        uid: uid,
        change: 'comment update',
        updatedAt: new Date(),
      },
    },
  };
}


export function commentLikesUpdated({ uid }: UpdateLikesComment) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataComment.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'dataComment.likes': uid,
    },
    $push: {
      'dataComment.updateDate.register': {
        uid: uid,
        change: 'comment likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function commentDisLikesUpdated({ uid }: UpdateLikesComment) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataComment.updateDate.lastUpdatedAt': new Date(),
    },
    $pull: {
      'dataComment.likes': uid,
    },
    $push: {
      'dataComment.updateDate.register': {
        uid: uid,
        change: 'comment dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

// export function articleImageUpdated({ id, images, type, uid }: UpdateImage) {
//   const { src, alt } = images as InputImage;
//   return {
//     $set: {
//       'dataArticle.thumbnail': {
//         uid: uuidv3(),
//         src: src,
//         alt: alt,
//       },
//       'dataArticle.seoArticle.image.src': src,
//       'dataArticle.seoArticle.image.alt': alt,
//       'dataArticle.updateDate.lastUpdatedAt': new Date(),
//     },
//     $push: {
//       'dataArticle.updateDate.register': {
//         uid: uid,
//         change: 'article image updated',
//         updatedAt: new Date(),
//       },
//     },
//   };
// }

// export function typeProduct(type: string) {
//   let data: string;
//   switch (type) {
//     case 'adoption':
//       data = 'Adoption';
//       break;

//     default:
//       console.log(`Sorry, we are out of ${type}.`);
//       break;
//   }
//   return data;
// }
