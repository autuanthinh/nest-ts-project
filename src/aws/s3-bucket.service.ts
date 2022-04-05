import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import imageSize from 'image-size';
import * as _ from 'lodash';
import { snakeCase } from 'snake-case';

@Injectable()
export class S3BucketService {
  constructor(private configService: ConfigService) {}

  // Upload
  async upload(file: Express.Multer.File) {
    const { bucket } = this.configService.get('aws.s3');
    const fileName = `${this.generateID()}${extname(
      file.originalname,
    ).toLowerCase()}`;
    return await this.uploadS3(file, bucket, fileName);
  }

  // Upload S3
  private async uploadS3(
    file: Express.Multer.File,
    bucket: string,
    name: string,
  ) {
    const s3 = this.getS3();

    const imageDetails = await imageSize(file.buffer);

    const createAt = new Date();

    // Metadata
    const Metadata = {
      width: imageDetails.width,
      height: imageDetails.height,
      type: imageDetails.type,
      mimetype: file.mimetype,
      create_at: createAt,
    };

    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        ..._.mapValues(Metadata, (i) => '' + i),
      },
    };

    return new Promise((resolve, reject) => {
      s3.upload({ ...params }, (err, data) => {
        if (err) {
          console.error(err);
          reject(err.message);
        }
        resolve(_.mapKeys({ ...data, ...Metadata }, (v, k) => snakeCase(k)));
      });
    });
  }

  // Create connect S3
  private getS3() {
    const { accessKeyId, secretAccessKey } = this.configService.get('aws.s3');
    return new S3({
      accessKeyId,
      secretAccessKey,
    });
  }

  // Generate Id
  private generateID() {
    return `${this.randomID()}-${this.randomID()}`;
  }

  // Random Id
  private randomID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
  };

  delete = function ({ bucket, key }: { bucket: string; key: string }) {
    const s3 = this.getS3();
    return new Promise((resolve, reject) => {
      s3.deleteObject({ Bucket: bucket, Key: key }, (err, data) => {
        if (err) {
          console.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  };
}

// Multer upload options
export function multerOptions({
  maxFileSize = Infinity,
  mimetype = {},
}: {
  maxFileSize: number;
  mimetype?: AcceptMimeType;
}): MulterOptions {
  return {
    // Enable file size limits
    limits: {
      fileSize: maxFileSize,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req, file, cb) => {
      if (!_.isEmpty(mimetype) && mimetype[file.mimetype]) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
  };
}
