import {ExceptionFilter, Catch, ArgumentsHost, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import {ApiResponseBuilder} from "../../../../libs/presentation/response/api.response";
import {HttpArgumentsHost} from "@nestjs/common/interfaces";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const response: Response<any, Record<string, any>> = ctx.getResponse<Response>();

    const status: HttpStatus = exception.getStatus ? exception.getStatus() : 500;

    const buildResponse = ApiResponseBuilder.error().build();

    response.status(status).json(buildResponse);
  }
}
