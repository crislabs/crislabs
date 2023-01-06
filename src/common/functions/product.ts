import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateProduct,
  UpdateDetailProduct,
  UpdateLikesProduct,
  UpdatePriceProduct,
  UpdateProduct,
  UpdateSpecsProduct,
  UpdateTagsProduct,
} from '../dto/product.input';
import { UpdateImageProduct } from '../dto/site.input';

export function productCreated({
  name,
  description,
  siteId,
  parentId,
  uid,
  type,
}: CreateProduct) {
  return {
    _id: new Types.ObjectId(),
    siteId: siteId,
    parentId: parentId,
    slug: slug(name),
    dataProduct: {
      type: type,
      // type: {
      //   label: typeProduct(type),
      //   slug: slug(type),
      // },

      seoProduct: {
        title: capitalizar(name),
        href: slug(name),
        description: description,
      },
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'product created',
            updatedAt: new Date(),
          },
        ],
      },
    },
  };
}

export function productUpdated({ id, name, description, uid }: UpdateProduct) {
  return {
    $set: {
      'dataProduct.seoProduct.title': capitalizar(name),
      'dataProduct.seoProduct.href': slug(name),
      'dataProduct.seoProduct.description': description,
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
      slug: slug(name),
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productDetailUpdated({ text, uid }: UpdateDetailProduct) {
  return {
    $set: {
      'dataProduct.details': text,
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product detail updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productSpecsUpdated({ text, uid }: UpdateSpecsProduct) {
  return {
    $set: {
      'dataProduct.specs': text,
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product specs updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productPriceUpdated({ price, discountPrice, inStock, uid }: UpdatePriceProduct) {
  return {
    $set: {
      'dataProduct.price': price,
      'dataProduct.discountPrice': discountPrice,
      'dataProduct.inStock': inStock,
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product price updated',
        updatedAt: new Date(),
      },
    },
  };
}
export function productTagsUpdated({ tags, uid }: UpdateTagsProduct) {
  return {
    $set: {
      'dataProduct.tags': tags.map((data) => ({
        uid: uuidv3(),
        text: data,
        slug: slug(data),
      })),
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product tags updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function productLikesUpdated({ uid }: UpdateLikesProduct) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $addToSet: {
      'dataProduct.likes': uid,
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product likes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function productDisLikesUpdated({ uid }: UpdateLikesProduct) {
  return {
    $set: {
      // 'dataProduct.likes': tags.map((data) => ({
      //   uid: uuidv3(),
      //   text: data,
      //   slug: slug(data),
      // })),
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $pull: {
      'dataProduct.likes': uid,
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'product dislikes updated',
        updatedAt: new Date(),
      },
    },
  };
}

export function productUpdateImage({
  id,
  images,
  type,
  uid,
}: UpdateImageProduct) {
  // const { src, alt } = images as InputImage;
  return {
    $set: {
      'dataProduct.imageProduct': images.map((data) => ({
        uid: uuidv3(),
        src: data.src,
        alt: data.alt,
      })),
      'dataProduct.seoProduct.image.src': images[0].src,
      'dataProduct.seoProduct.image.alt': images[0].alt,
      'dataProduct.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataProduct.updateDate.register': {
        uid: uid,
        change: 'image product update',
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
