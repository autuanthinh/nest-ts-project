import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Config module importer
 * @constructor
 */
export function DBModuleImporter() {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (ConfigService: ConfigService) => {
      const dbConfig = ConfigService.get('database.postgres');
      return {
        ...dbConfig,
      };
    },
  });
}
