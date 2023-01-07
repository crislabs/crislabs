import * as dotenv from 'dotenv';

dotenv.config();
export const cloudinaryEnviroments = [
  {
    type: 'site',
    enviroment: {
      cloud_name: process.env.CLOUDINARY_NAME_SITES,
      api_key: process.env.CLOUDINARY_API_KEY_SITES,
      api_secret: process.env.CLOUDINARY_API_SECRET_SITES,
    },
  },
  {
    type: 'page',
    enviroment: {
      cloud_name: process.env.CLOUDINARY_NAME_PAGES,
      api_key: process.env.CLOUDINARY_API_KEY_PAGES,
      api_secret: process.env.CLOUDINARY_API_SECRET_PAGES,
    },
  },
  // {
  //   type: 'products-clothing' || 'products-backpack' || 'products-handbag',
  //   enviroment: {
  //     cloud_name: process.env.CLOUDINARY_NAME_PRODUCTS_WEAR,
  //     api_key: process.env.CLOUDINARY_API_KEY_PRODUCTS_WEAR,
  //     api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTS_WEAR,
  //   },
  // },
  // {
  //   type: 'products-food',
  //   enviroment: {
  //     cloud_name: process.env.CLOUDINARY_NAME_PRODUCTS_FOOD,
  //     api_key: process.env.CLOUDINARY_API_KEY_PRODUCTS_FOOD,
  //     api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTS_FOOD,
  //   },
  // },
  // {
  //   type: 'products-hardware-store',
  //   enviroment: {
  //     cloud_name: process.env.CLOUDINARY_NAME_PRODUCTS_TOOL,
  //     api_key: process.env.CLOUDINARY_API_KEY_PRODUCTS_TOOL,
  //     api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTS_TOOL,
  //   },
  // },
  // {
  //   type: 'products-glasses',
  //   enviroment: {
  //     cloud_name: process.env.CLOUDINARY_NAME_PRODUCTS_GLASSES,
  //     api_key: process.env.CLOUDINARY_API_KEY_PRODUCTS_GLASSES,
  //     api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTS_GLASSES,
  //   },
  // },
  // {
  //   type: 'products-furniture',
  //   enviroment: {
  //     cloud_name: process.env.CLOUDINARY_NAME_PRODUCTS_FURNITURE,
  //     api_key: process.env.CLOUDINARY_API_KEY_PRODUCTS_FURNITURE,
  //     api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTS_FURNITURE,
  //   },
  // },
  // {
  //   type: 'products-engine',
  //   enviroment: {
  //     cloud_name: process.env.CLOUDINARY_NAME_PRODUCTS_ENGINE,
  //     api_key: process.env.CLOUDINARY_API_KEY_PRODUCTS_ENGINE,
  //     api_secret: process.env.CLOUDINARY_API_SECRET_PRODUCTS_ENGINE,
  //   },
  // },
];