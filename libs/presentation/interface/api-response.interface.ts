import {ApiResponse} from "../response/api.response";

export interface IApiResponseBuilder {
  success?(): ApiResponse;
  failed?(): ApiResponse;
  error?(err?: string): ApiResponse;
  seData?(data: object): ApiResponse
  setStatus?(value: boolean): ApiResponse;
  setMessage?(value: string): ApiResponse;
  setStatusCode?(value: number): ApiResponse
}

export interface IApiResponse {
  message?: string;
  status?: boolean;
  statusCode?: number;
  data?: object;
  token?: string;
}
