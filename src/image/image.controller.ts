import * as _ from 'lodash';
import { PAGINATION_FIELDS, FILE } from 'src/common/constants';
import * as dbUtils from 'src/utils/db';

import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3BucketService, multerOptions } from 'src/aws/s3-bucket.service';
import { ImageService } from 'src/image/image.service';
import { Image } from './entities/image.entity';

import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('images')
@UseInterceptors(LoggingInterceptor)
export class ImageController {
  constructor(
    private readonly s3BucketService: S3BucketService,
    private readonly imageService: ImageService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor(
      'file',
      multerOptions({
        maxFileSize: FILE.IMAGE.SIZE.MAX,
        mimetype: {
          'image/gif': true,
          'image/jpg': true,
          'image/jpeg': true,
          'image/png': true,
          'image/svg+xml': true,
          'image/webp': true,
        },
      }),
    ),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Request() req) {
    // Upload image to bucket
    const image = (await this.s3BucketService.upload(file)) as Image;

    // Save image to db
    image.owner = req.user.id;
    this.imageService.addImage(image);

    return image;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getImages(@Query() query) {
    const criteria = _.omit(query, PAGINATION_FIELDS);
    const pagination = _.pick(query, PAGINATION_FIELDS) as IPaginationOptions;
    const sorter = dbUtils.parseSorter(query.sort);
    return this.imageService.getImages({ criteria, pagination, sorter });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id, @Request() req) {
    // Find image
    const criteria = { id, owner: req.user.id };
    const image = await this.imageService.findOneImage(criteria);

    if (image) {
      await Promise.all([
        this.imageService.deleteImage(criteria),
        this.s3BucketService.delete(image),
      ]);
    }

    return {
      success: true,
    };
  }
}
