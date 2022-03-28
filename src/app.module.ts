import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import AppConf from '../config/application.config';

import { ConfigModuleImporter } from '../app-core/module-importer';

@Module({
  imports: [ConfigModuleImporter([AppConf])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
