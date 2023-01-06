// import { CreateArticle, UpdateArticle } from 'src/articles/article.dto';
// import { InputImage, UpdateImage } from 'src/sites/site.dto';
// import { capitalizar, slug, uuidv3 } from './function';

// export function articleVerifyCreated({
//   title,
//   siteId,
//   parentId,
// }: CreateArticle) {
//   return {
//     where: {
//       slug: slug(title),
//       siteId: siteId,
//       parentId: parentId,
//     },
//   };
// }
// export function articleVerifyUpdated({
//   id,
//   title,
//   siteId,
//   parentId,
// }: UpdateArticle) {
//   return {
//     where: {
//       id: { not: id },
//       slug: slug(title),
//       siteId: siteId,
//       parentId: parentId,
//     },
//   };
// }

// export function articleCreated({
//   title,
//   description,
//   siteId,
//   parentId,
//   category,
//   uid,
// }: CreateArticle) {
//   return {
//     data: {
//       dataArticle: {
//         title: capitalizar(title),
//         description: description,
//         category: category,
//         author: uid,
//         seoArticle: {
//           title: capitalizar(title),
//           href: slug(title),
//           description: description,
//         },
//         updateDate: {
//           createdAt: new Date(),
//           lastUpdatedAt: new Date(),
//           register: [
//             {
//               uid: uid,
//               change: 'created article',
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

// export function articleUpdated({
//   id,
//   title,
//   description,
//   content,
//   category,
//   meta,
//   tags,
//   uid,
// }: UpdateArticle) {
//   return {
//     where: {
//       id: id,
//     },
//     data: {
//       dataArticle: {
//         update: {
//           title: capitalizar(title),
//           description: description,
//           category: category,
//           author: uid,
//           meta: meta,
//           tags: tags.map((data) => ({
//             uid: uuidv3(),
//             text: data,
//             slug: slug(data),
//           })),
//           content: content,
//           seoArticle: {
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
//                     change: 'updated article',
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

// export function articleUpdateImage({ images, uid, id }: UpdateImage) {
//   const { src, alt } = images as InputImage;
//   return {
//     where: {
//       id,
//     },
//     data: {
//       dataArticle: {
//         update: {
//           thumbnail: {
//             src: src,
//             alt: alt,
//           },
//           seoArticle: {
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
//                     change: 'update image article',
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

// export function articleDeleted(id: string) {
//   return {
//     where: { id },
//   };
// }
// export function articlesDeleted(ids: string[]) {
//   return {
//     where: {
//       id: { in: ids },
//     },
//   };
// }

// export function articleGet(id: string) {
//   return {
//     where: { id },
//   };
// }
// export function articlesGetByParentId(parentId: string) {
//   return {
//     where: { parentId },
//   };
// }
// export function articlesGetWithCursor(
//   parentId: string,
//   offset: number,
//   limit: number,
// ) {
//   return {
//     where: {
//       parentId,
//     },
//     skip: offset,
//     take: limit,
//     orderBy: { dataArticle: { updateDate: { lastUpdatedAt: 'desc' } } },
//   };
// }
