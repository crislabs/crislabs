import { Types } from 'mongoose';
import { capitalizar, slug } from 'utils/function';
import { UpdatePage } from '../dto/page.input';
import { InputImage, UpdateImage } from '../dto/site.input';
import { CreateUser } from '../dto/user.input';

export function userCreated({
  role,
  email,
  image,
  username,
  oAuth,
  siteId,
}: CreateUser) {
  return {
    _id: new Types.ObjectId(),
    dataUser: {
      role: role,
      image: {
        src: image,
        alt: username,
      },
      username: username,
      status: true,
      oAuth: {
        provider: oAuth ? oAuth : 'credentials',
      },
    },
    updateDate: {
      createdAt: new Date(),
    },
    email: email.toLowerCase(),
    // password: await bcrypt.hash(password, 10),
    siteId: siteId,
  };
}

export function pageUpdate({ id, type, title, description, uid }: UpdatePage) {
  return {
    filter: { _id: id },
    update: {
      $set: {
        'dataPage.type': type,
        'dataPage.seoPage.title': capitalizar(title),
        'dataPage.seoPage.href': slug(title),
        'dataPage.seoPage.description': description,
        'dataPage.updateData.lastUpdatedAt': new Date(),
        slug: slug(title),
      },
      $push: {
        'dataPage.updateDate.register': {
          uid: uid,
          change: 'page update',
          updatedAt: new Date(),
        },
      },
    },
    options: { lean: true, new: true },
  };
}

export function pageUpdateImage({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    filter: { _id: id },
    update: {
      $set: {
        'dataPage.seoPage.image.src': src,
        'dataPage.seoPage.image.alt': alt,
        'dataPage.updateDate.lastUpdatedAt': new Date(),
      },
      $push: {
        'dataPage.updateDate.register': {
          uid: uid,
          change: 'image update',
          updatedAt: new Date(),
        },
      },
    },
    options: { lean: true, new: true },
  };
}

export function pageFindOne(id: string) {
  return {
    filter: { _id: id },
    projection: {},
    options: { lean: true },
  };
}

export function page0(id: string, uid: string) {
  return {
    title: 'home',
    description: 'home description',
    type: 'page blanck',
    parentId: id,
    siteId: id,
    uid: uid,
  };
}
