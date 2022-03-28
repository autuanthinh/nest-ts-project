import { ConfigModule } from '@nestjs/config';

/**
 * Config module importer
 * @param configs
 * @param options
 * @constructor
 */
export function ConfigModuleImporter(configs, options = {}) {
  return ConfigModule.forRoot({
    ...{
      load: configs,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: !!process.env.NODE_ENV,
    },
    ...options,
  });
}
