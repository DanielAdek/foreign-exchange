import {INestApplication, Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import {GrpcOptions, MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as path from "path";

const logger: Logger = new Logger("MAIN:AUTHENTICATION");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:50051",
      package: 'auth',
      protoPath: path.join(__dirname, "../../../libs/_proto/auth.proto"),
    },
  } as GrpcOptions);
  await app.listen();
  logger.log("MICROSERVICE LISTENING!");
}
(async function (): Promise<void> {
  await bootstrap();
})();
