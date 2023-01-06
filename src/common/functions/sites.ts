import { Types } from 'mongoose';
import { capitalizar, slug, uuidv3 } from 'utils/function';
import {
  CreateSite,
  InputImage,
  UpdateAdminSite,
  UpdateDB,
  UpdateImage,
  UpdateSite,
} from '../dto/site.input';

export function siteCreated({
  domain,
  name,
  description,
  type,
  clientId,
  uid,
}: CreateSite) {
  const web = domain.split('.');
  const nameDomain = web[0];
  web.shift();
  const dlt = web.join('.');
  return {
    _id: new Types.ObjectId(),
    dataSite: {
      name: name,
      description: description,
      infoSite: {
        domain: {
          name: nameDomain,
          dlt: dlt,
        },
        clientId: clientId,
      },
      type: type,
      // type: {
      //   label: typeSite(type),
      //   slug: slug(type),
      // },
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'created site',
            updatedAt: new Date(),
          },
        ],
      },
    },
    url: domain,
  };
}

export function siteUpdate({ id, domain, name, description, uid }: UpdateSite) {
  const web = domain.split('.');
  const nameDomain = web[0];
  web.shift();
  const dlt = web.join('.');
  return {
    $set: {
      'dataSite.name': name,
      'dataSite.description': description,
      'dataSite.infoSite.domain': {
        name: nameDomain,
        dlt: dlt,
      },
      'dataSite.updateDate.lastUpdatedAt': new Date(),
      url: domain,
    },
    $push: {
      'dataSite.updateDate.register': {
        uid: uid,
        change: 'updated site',
        updatedAt: new Date(),
      },
    },
  };
}
export function siteDBUpdate({ id, type }: UpdateDB) {
  return {
    $set: {
      'dataSite.dbSite': type.map((data) => ({
        uid: uuidv3(),
        label: capitalizar(data),
        slug: slug(data),
      })),
      'dataSite.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataSite.updateDate.register': {
        change: 'updated site db',
        updatedAt: new Date(),
      },
    },
  };
}
export function siteAdminUpdate({ admin }: UpdateAdminSite) {
  return {
    $set: {
      'dataSite.adminSite': admin.map((data) => ({
        privilege: data.privilege,
        sid: data.sid,
      })),
      'dataSite.updateDate.lastUpdatedAt': new Date(),
    },
    $push: {
      'dataSite.updateDate.register': {
        change: 'updated admin user',
        updatedAt: new Date(),
      },
    },
  };
}
export function siteImageUpdate({ id, images, type, uid }: UpdateImage) {
  const { src, alt } = images as InputImage;
  return {
    $set:
      type === 'logo'
        ? {
            'dataSite.imageSite.logo': {
              src: src,
              alt: alt,
            },
            'dataSite.updateDate.lastUpdatedAt': new Date(),
          }
        : type === 'banner'
        ? {
            'dataSite.imageSite.banner': {
              src: src,
              alt: alt,
            },
            'dataSite.updateDate.lastUpdatedAt': new Date(),
          }
        : {
            'dataSite.imageSite.icon': {
              src: src,
              alt: alt,
            },
            'dataSite.updateDate.lastUpdatedAt': new Date(),
          },
    $push: {
      'dataSite.updateDate.register': {
        uid: uid,
        change: `${type} image update`,
        updatedAt: new Date(),
      },
    },
  };
}

// export function siteFindOne(id: string) {
//   return {
//     filter: { _id: id.toString() },
//     projection: {},
//     options: { lean: true },
//   };
// }

// export function typeSite(type: string) {
//   let data: string;
//   switch (type) {
//     case 'pet':
//       data = 'Pet';
//       break;

//     default:
//       console.log(`Sorry, we are out of ${type}.`);
//       break;
//   }
//   return data;
// }
// export function typeDbSite(type: string) {
//   let data: string;
//   switch (type) {
//     case 'adoption':
//       data = 'Adoption';
//       break;
//     case 'pet':
//       data = 'Pet';
//       break;

//     default:
//       console.log(`Sorry, we are out of ${type}.`);
//       break;
//   }
//   return data;
// }
