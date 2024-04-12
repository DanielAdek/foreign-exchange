import {INestApplication, Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import { AppModule } from './app/app.module';
import {GrpcOptions, MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as path from "path";

const logger: Logger = new Logger("MAIN:AUTHENTICATION");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      host: '0.0.0.0',
      port: process.env.PORT,
      package: 'auth',
      protoPath: path.join(__dirname, 'auth/auth.proto'),
      loaders: {
        enums: String,
        objects: true,
        arrays: true,
      },
    },
  } as GrpcOptions);
  await app.listen();
  logger.log("MICROSERVICE LISTENING!");
}
(async function (): Promise<void> {
  await bootstrap();
})();
