import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { GaleryService } from "./galery.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('galery')
export class GaleryController {
  mediaService: any;
  constructor(private readonly galeryService: GaleryService) {}

  // get link of private file
  @Get('access')
  async getLinkAccess(@Query('key') key: string) {
    const url = this.galeryService.getLinkMediaKey(key);
    return {
      url: url,
    };
  }

  // upload single file
  @Post(':productId/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Param('productId') productId: string) {
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
}