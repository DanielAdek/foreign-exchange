import {HttpStatus} from "@nestjs/common";
import {ResponseStatus} from "../../../apps/api-gateway/src/enum/response_status.enum";
import {IApiResponse, IApiResponseBuilder} from "../interface/api-response.interface";

export class ApiResponse implements IApiResponseBuilder {
  private readonly data;

  constructor() {
    this.data = new Map();
  }

  public setData(value: object): ApiResponse {
    this.data.set("data", value);
    return this;
  }

  public setMessage(value: string): ApiResponse {
    this.data.set("message", value);
    return this;
  }

  public setStatus(value: boolean): ApiResponse {
    this.data.set("status", value);
    return this;
  }

  public setStatusCode(value: HttpStatus): ApiResponse {
    this.data.set("statusCode", value);
    return this;
  }

  public success(): ApiResponse {
    this.reset().setMessage(ResponseStatus.SUCCESS).setStatus(true).setStatusCode(HttpStatus.OK);
    return this;
  }

  public failed(): ApiResponse {
    this.reset().setMessage(ResponseStatus.FAILED).setStatus(false).setStatusCode(HttpStatus.BAD_REQUEST);
    return this;
  }

  public error(err?: string): ApiResponse {
    this.reset().setMessage(ResponseStatus.ERROR || err).setStatus(false).setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
    return this;
  }

  public reset(): ApiResponse {
    this.data.clear();
    return this;
  }

  public build(): IApiResponse {
    return Object.fromEntries(this.data);
  }
}

export const ApiResponseBuilder: ApiResponse = new ApiResponse();
