import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { FastifyFileInterceptor } from 'utils/fastify-file-interceptor';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { SingleFileDto } from './common/dto/single-file-dto';
import { editFileName, imageFileFilter } from 'utils/file-upload-util';
import { fileMapper, filesMapper } from 'utils/file-mappter';
import { FastifyFilesInterceptor } from 'utils/fastify-files-interceptor';
import { MultipleFileDto } from './common/dto/multiple-files-dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @ApiConsumes('multipart/form-data')
  @Post('upload/single-file')
  @UseInterceptors(
    FastifyFileInterceptor('photo_url', {
      // storage: diskStorage({
      //   destination: './upload/single',
      //   filename: editFileName,
      // }),
      fileFilter: imageFileFilter,
    }),
  )
  async single(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    // console.log("file", file);
    
    // return { ...body, photo_url: fileMapper({ file, req }) };
    const url = await this.appService.uploadFile( file, body.siteId, body.parentId, body.type ) ;
    return {url}
  }

  // @Post('upload/multiple-file')
  // @UseInterceptors(
  //   FastifyFilesInterceptor('photo_url', 10, {
  //     storage: diskStorage({
  //       destination: './upload/single',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // multiple(
  //   @Req() req: Request,
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() body: MultipleFileDto,
  // ) {
  //   return { ...body, photo_url: filesMapper({ files, req }) };
  // }

  @Post('upload/file')
  @UseInterceptors(FastifyFileInterceptor('photo_url', {}))
  async uploadFileAndPassValidation(
    @Body() body: SingleFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'svg|png|jpg|jpeg|webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const url = await this.appService.uploadFile(
      file,
      body.siteId,
      body.parentId,
      body.type,
    );
    return {
      url,
    };
  }

  @Post('upload/file-url')
  async uploadFileByUrl(@Body() body: SingleFileDto) {
    const url = await this.appService.uploadFileUrl(
      body.photo_url,
      body.siteId,
      body.parentId,
      body.type,
    );
    return {
      url,
    };
  }

  @Post('upload/delete')
  async deleteImage(@Body() body: { name: string; type: string }) {
    return await this.appService.deleteFile(body.name, body.type);
  }

  @Post('upload/deletes')
  async deleteImages(@Body() body: { parentId: string; type: string }) {
    return await this.appService.deleteFiles(body.parentId, body.type);
  }
}
