import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import AppConf from 'config/application.config';

import {
  ConfigModuleImporter,
  DBModuleImporter,
} from '../app-core/module-importer';

import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { AWSModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModuleImporter([AppConf]),
    DBModuleImporter(),
    AuthModule,
    AWSModule,
    UserModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
