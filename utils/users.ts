// import { CreateUser, UpdateUser } from 'src/users/user.dto';
// import { slug } from './function';
// import * as bcrypt from 'bcrypt';

// export function userVerifyCreated({ email, siteId }: CreateUser) {
//   return {
//     where: {
//       email: slug(email),
//       siteId: siteId,
//     },
//   };
// }
// export function userVerifyUpdated({ id, email, siteId }: UpdateUser) {
//   return {
//     where: {
//       id: { not: id },
//       email: slug(email),
//       siteId: siteId,
//     },
//   };
// }

// export async function userCreated({
//   password,
//   role,
//   email,
//   image,
//   username,
//   oAuth,
//   siteId,
//   uid,
// }: CreateUser) {
//   return {
//     data: {
//       dataUser: {
//         username: username,
//         password: await bcrypt.hash(password, 10),
//         role: role,
//         status: true,
//         oAuth: {
//           provider: oAuth ? oAuth : 'credentials',
//         },
//         picture: {
//           src: image
//             ? image
//             : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4E-0691vfCQGCq2HIVrub5YVl_2fVn6nGSHgWwvuxpjswlb-Xbv-zzRb5PIuP4EPzjfY&usqp=CAU',
//           alt: username,
//         },
//         updateDate: {
//           createdAt: new Date(),
//           lastUpdatedAt: new Date(),
//           register: [
//             {
//               uid: uid,
//               change: 'created user',
//               updatedAt: new Date(),
//             },
//           ],
//         },
//       },
//       email: slug(email),
//       siteId: siteId,
//     },
//   };
// }

// export function userUpdated({ id, username, uid }: UpdateUser) {
//   return {
//     where: {
//       id: id,
//     },
//     data: {
//       dataUser: {
//         update: {
//           username: username,
//           updateDate: {
//             update: {
//               lastUpdatedAt: new Date(),
//               register: {
//                 push: [
//                   {
//                     uid: uid,
//                     change: 'updated user',
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
