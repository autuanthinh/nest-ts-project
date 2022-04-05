import { Global, Module } from '@nestjs/common';
import { S3BucketService } from './s3-bucket.service';

@Global()
@Module({
  providers: [S3BucketService],
  exports: [S3BucketService],
})
export class AWSModule {}
