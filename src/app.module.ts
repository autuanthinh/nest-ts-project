import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import AppConf from 'config/application.config';

import {
  ConfigModuleImporter,
  DBModuleImporter,
} from '../app-core/module-importer';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModuleImporter([AppConf]),
    DBModuleImporter(),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
