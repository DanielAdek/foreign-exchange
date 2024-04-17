import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfigManager} from "@shared/config/database.config";
import {AuthEntity} from "../entity/auth.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfigManager.getTypeOrmConfig()),
    TypeOrmModule.forFeature([AuthEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
