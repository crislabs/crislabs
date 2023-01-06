// import { CreatePage, UpdatePage } from 'src/pages/page.dto';
// import { InputImage, UpdateImage } from 'src/sites/site.dto';
// import { capitalizar, slug } from './function';

// export function pageVerifyCreate({ title, siteId, parentId }: CreatePage) {
//   return {
//     where: {
//       slug: slug(title),
//       siteId: siteId,
//       parentId: parentId,
//     },
//   };
// }
// export function pageVerifyUpdate({ id, title, siteId, parentId }: UpdatePage) {
//   return {
//     where: {
//       id: { not: id },
//       slug: slug(title),
//       siteId: siteId,
//       parentId: parentId,
//     },
//   };
// }

// export function pageCreated({
//   type,
//   title,
//   description,
//   parentId,
//   siteId,
//   uid,
// }: CreatePage) {
//   return {
//     data: {
//       dataPage: {
//         type: type,
//         seoPage: {
//           title: capitalizar(title),
//           href: slug(title) === 'home' ? '' : slug(title),
//           description: description,
//         },
//         updateDate: {
//           createdAt: new Date(),
//           lastUpdatedAt: new Date(),
//           register: [
//             {
//               uid: uid,
//               change: 'create page',
//               updatedAt: new Date(),
//             },
//           ],
//         },
//       },
//       parentId: parentId,
//       siteId: siteId,
//       slug: slug(title),
//     },
//   };
// }

// export function pageUpdate({ id, uid, type, title, description }: UpdatePage) {
//   return {
//     where: {
//       id: id,
//     },
//     data: {
//       dataPage: {
//         update: {
//           type: type,
//           seoPage: {
//             title: capitalizar(title),
//             href: slug(title),
//             description: description,
//           },
//           updateDate: {
//             update: {
//               lastUpdatedAt: new Date(),
//               register: {
//                 push: [
//                   {
//                     uid: uid,
//                     change: 'update page',
//                     updatedAt: new Date(),
//                   },
//                 ],
//               },
//             },
//           },
//         },
//       },
//       slug: slug(title),
//     },
//   };
// }
// export function pageUpdateImage({ images, uid, id }: UpdateImage) {
//   const { src, alt } = images as InputImage;
//   return {
//     where: {
//       id,
//     },
//     data: {
//       dataPage: {
//         update: {
//           seoPage: {
//             update: {
//               image: {
//                 src: src,
//                 alt: alt,
//               },
//             },
//           },
//           updateDate: {
//             update: {
//               lastUpdatedAt: new Date(),
//               register: {
//                 push: [
//                   {
//                     uid: uid,
//                     change: 'update image page',
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

// export function page0(id: string) {
//   return {
//     title: 'home',
//     description: 'home description',
//     type: 'page-blank',
//     parentId: id,
//     siteId: id,
//     uid: '1234567',
//   };
// }
