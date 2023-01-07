import { Injectable } from '@nestjs/common';
import { cloudinaryEnviroments } from 'utils/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { uuidv4 } from 'utils/function';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async uploadFile(
    file: any,
    siteId: string,
    parentId: string,
    type: string,
  ): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });

    const result = await new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: uuidv4(),
            format: 'JPEG',
            tags: [siteId, parentId],
          },
          (err, image) => {
            if (err) {
              reject(err);
            }
            resolve(image);
          },
        )
        .end(file.buffer);
    });
    return result['secure_url'];
  }
  async uploadFileUrl(
    file: string,
    siteId: string,
    parentId: string,
    type: string,
  ): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });

    const result = await new Promise(async (resolve, reject) => {
      cloudinary.uploader.upload(
        file,
        {
          public_id: uuidv4(),
          format: 'JPEG',
          tags: [siteId, parentId],
          responsive_breakpoints: {
            create_derived: true,
            bytes_step: 20000,
            min_width: 200,
            max_width: 1000,
          },
        },
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      );
    });
    return result['secure_url'];
  }
  async deleteFile(name: string, type: string): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });
    await new Promise(async (resolve, reject) => {
      cloudinary.uploader.destroy(
        name, // directory and tags are optional
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      );
    });
    return 'image delete';
  }

  async deleteFiles(parentId: string, type: string): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });

    await new Promise(async (resolve, reject) => {
      cloudinary.api.delete_resources_by_tag(
        parentId, // directory and tags are optional
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      );
    });
    return 'images delete';
  }
}
