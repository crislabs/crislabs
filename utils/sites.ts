// import {
//   CreateSite,
//   InputImage,
//   UpdateDB,
//   UpdateImage,
//   UpdateSite,
// } from 'src/sites/site.dto';
// import { capitalizar, slug } from './function';

// export function siteCreated1({
//   domain,
//   name,
//   description,
//   type,
//   clientId,
//   uid,
// }: CreateSite) {
//   const web = domain.split('.');
//   const nameDomain = web[0];
//   web.shift();
//   const dlt = web.join('.');
//   return {
//     // 'dataSite.name': name,
//     dataSite: {
//       name: name,
//       description: description,
//       // dataBase: [],
//       infoSite: {
//         domain: {
//           name: nameDomain,
//           dlt: dlt,
//         },
//         clientId: clientId,
//       },
//       type: type,
//       imageSite: {
//         logo: {
//           src: '',
//           alt: '',
//         },
//         banner: {
//           src: '',
//           alt: '',
//         },
//         icon: {
//           src: '',
//           alt: '',
//         },
//       },
//       updateDate: {
//         createdAt: new Date(),
//         lastUpdatedAt: new Date(),
//         register: [
//           {
//             uid: uid,
//             change: 'created site',
//             updatedAt: new Date(),
//           },
//         ],
//       },
//     },
//     url: domain,
//   };
// }
// export function siteCreated({
//   domain,
//   name,
//   description,
//   type,
//   clientId,
//   uid,
// }: CreateSite) {
//   const web = domain.split('.');
//   const nameDomain = web[0];
//   web.shift();
//   const dlt = web.join('.');
//   return {
//     data: {
//       dataSite: {
//         name: name,
//         description: description,
//         // dataBase: [],
//         infoSite: {
//           domain: {
//             name: nameDomain,
//             dlt: dlt,
//           },
//           clientId: clientId,
//         },
//         type: type,
//         imageSite: {
//           logo: {
//             src: '',
//             alt: '',
//           },
//           banner: {
//             src: '',
//             alt: '',
//           },
//           icon: {
//             src: '',
//             alt: '',
//           },
//         },
//         updateDate: {
//           createdAt: new Date(),
//           lastUpdatedAt: new Date(),
//           register: [
//             {
//               uid: uid,
//               change: 'created site',
//               updatedAt: new Date(),
//             },
//           ],
//         },
//       },
//       url: domain,
//     },
//   };
// }

// export function siteUpdate({
//   domain,
//   name,
//   description,
//   type,
//   uid,
//   id,
// }: UpdateSite) {
//   const web = domain.split('.');
//   const nameDomain = web[0];
//   web.shift();
//   const dlt = web.join('.');
//   return {
//     where: {
//       id: id,
//     },
//     data: {
//       dataSite: {
//         update: {
//           name: name,
//           description: description,
//           type: type,
//           infoSite: {
//             update: {
//               domain: { name: nameDomain, dlt: dlt },
//             },
//           },
//           updateDate: {
//             update: {
//               lastUpdatedAt: new Date(),
//               register: {
//                 push: [
//                   {
//                     uid: uid,
//                     change: 'update site',
//                     updatedAt: new Date(),
//                   },
//                 ],
//               },
//             },
//           },
//         },
//       },
//       url: domain,
//     },
//   };
// }

// export function siteDB({ id, type }: UpdateDB) {
//   return {
//     where: {
//       id: id,
//     },
//     data: {
//       dataSite: {
//         update: {
//           dbSite: type.map((data) => ({
//             uid: 'uuidv3()',
//             label: capitalizar(data),
//             slug: slug(data),
//           })),
//           updateDate: {
//             update: {
//               lastUpdatedAt: new Date(),
//               register: {
//                 push: [
//                   {
//                     uid: 'uid',
//                     change: 'update db site',
//                     updatedAt: new Date(),
//                   },
//                 ],
//               },
//             },
//           },
//         },
//       },
//     },
//   };
// }

// export function siteImage({ images, type, uid, id }: UpdateImage) {
//   const { src, alt } = images as InputImage;
//   return {
//     where: {
//       id: id,
//     },
//     data: {
//       dataSite: {
//         update: {
//           imageSite: {
//             // set: {
//             banner: {
//               // update: {
//               src,
//               alt,
//               // },
//               // },
//             },
//           },
//           // type === 'banner'
//           //   ? {
//           //       banner: { src: src, alt: alt },
//           //     }
//           //   : type === 'logo'
//           //   ? {
//           //       logo: { src: src, alt: alt },
//           //     }
//           //   : {
//           //       icon: { src: src, alt: alt },
//           //     },

//           updateDate: {
//             update: {
//               lastUpdatedAt: new Date(),
//               register: {
//                 push: [
//                   {
//                     uid: uid,
//                     change: 'update image site',
//                     updatedAt: new Date(),
//                   },
//                 ],
//               },
//             },
//           },
//         },
//       },
//     },
//   };
// }
