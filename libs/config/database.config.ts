import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvManager } from './envmger.config';

class TypeormConfigManager extends EnvManager {
  constructor() { super(process.env) }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: this.getEnvValue("DATABASE_HOST"),
      port: parseInt(this.getEnvValue("DATABASE_PORT")),
      username: this.getEnvValue('DATABASE_USERNAME'),
      password: this.getEnvValue('DATABASE_PASSWORD'),
      database: this.getEnvValue("DATABASE_NAME"),
      synchronize: this.getEnvValue('TYPEORM_DATABASE_SYNC') == "true",
      entities: ["dist/**/*.entity.{ts,js}"],
      autoLoadEntities: true,
      ssl: this.isProduction(),
    };
  }

}

export const typeormConfigManager: TypeormConfigManager = new TypeormConfigManager();
