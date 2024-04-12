import {HttpStatus} from "@nestjs/common";
import {ResponseStatus} from "../enum/response_status.enum";

export class ApiResponse {
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
    this.setMessage(ResponseStatus.SUCCESS).setStatus(true).setStatusCode(HttpStatus.OK);
    return this;
  }

  public failed(): ApiResponse {
    this.setMessage(ResponseStatus.FAILED).setStatus(false).setStatusCode(HttpStatus.BAD_REQUEST);
    return this;
  }

  public error(): ApiResponse {
    this.setMessage(ResponseStatus.ERROR).setStatus(false).setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
    return this;
  }

  public clear(): ApiResponse {
    this.data.clear();
    return this;
  }

  public build() {
    return Object.fromEntries(this.data);
  }
}

export const ApiResponseBuilder: ApiResponse = new ApiResponse();
