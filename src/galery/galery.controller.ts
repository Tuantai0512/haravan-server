import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { GaleryService } from "./galery.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Galery } from "./galery.entity";
import { extname } from "path";

@Controller('galery')
export class GaleryController {
  mediaService: any;
  constructor(private readonly galeryService: GaleryService) {}

  // get link of private file
  @Get('/access')
  async getLinkAccess(@Query('key') key: string) {
    const url = this.galeryService.getLinkMediaKey(key);
    return {
      url: url,
    };
  }

  // upload single file
  @Post(':productId/upload')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:(req, file, cb) => {
      const ext = extname(file.originalname);
      const allowedExtArr = ['.jpg','.png','.jpeg','.webp'];
      if(!allowedExtArr.includes(ext)){
        req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
        cb(null, false)
      }else{
        const fileSize = parseInt(req.headers['content-length'])
        const threeMB = 1024 * 1024 * 3;
        if(fileSize > threeMB){
          req.fileValidationError = `File size is too large. Accept file size in less than 3 MB`;
          cb(null, false)
        }else{
          cb(null, true)
        }
      }
    } 
  }))
  async upload(@Req() req: any,@UploadedFile() file, @Param('productId') productId: string) {
    if(req.fileValidationError){
      throw new BadRequestException(req.fileValidationError)
    }
    if(!file){
      throw new BadRequestException('File is required');
    }
    return await this.galeryService.upload(file, productId);
  }

  // upload multi file
 /*  @Post(':productId/uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploads(@UploadedFiles() files, @Param('productId') productId: string) {
    const medias = [];
    for (const item of files) {
      medias.push(await this.galeryService.upload(item, productId));
    }
    return medias;
  } */

  // update permission: public-read
  @Put('update-acl')
  async updateAcl(@Body('media_id') media_id: string) {
    return await this.mediaService.updateACL(media_id);
  }

  // delete file
  @Delete(':photoId/delete')
  async delete(@Param('photoId') media_id: string) {
    await this.galeryService.deleteFileS3(media_id);
    return true;
  }

  @Put()
  async update(@Body() photo: Galery) : Promise<any> {
    return await this.galeryService.update(photo);
  }
}