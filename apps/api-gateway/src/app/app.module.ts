import { Module } from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import path from "path";

@Module({
  imports: [
    ClientsModule.register([{
      name: "AuthService",
      transport: Transport.GRPC,
      options: {
        url: "0.0.0.0:50051",
        package: 'auth',
        protoPath: path.join(__dirname, "../../../libs/_proto/auth.proto"),
      },
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
