import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AuthEntity} from "../entity/auth.entity";
import {ApiResponseBuilder} from "../../../../../libs/presentation/response/api.response";
import {AuthDTO} from "../dto/auth.dto";
import {LoginDto} from "../dto/login.dto";
import {IApiResponse} from "../../../../../libs/presentation/interface/api-response.interface";

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(AuthEntity)
    private readonly repository: Repository<AuthEntity>
  ) {
  }

  /**
   * @param {object} reqPayloadDto
   * @returns Promise(ApiResponse)
   */
  public async registerUser(reqPayloadDto: AuthDTO): Promise<IApiResponse> {
    try {
      const { email, password } = reqPayloadDto;

      const found = await this.repository.findOne({ where: { email } });

      if (found)
        return ApiResponseBuilder.setStatus(false).setStatusCode(HttpStatus.CONFLICT).setMessage("CONFLICT").build();

      const new_user: AuthEntity = Object.assign(new AuthEntity(), { email, password });

      const user: AuthEntity = await this.repository.save(new_user);

      const userDto: AuthDTO = AuthDTO.composeFromEntity(user);

      return ApiResponseBuilder.success().setData(userDto).setStatusCode(201).build();
    } catch (error) {
      this.logger.error("Error:Register: " + error);
      return ApiResponseBuilder.error(error.message).build();
    }
  }


  /**
   * @param  {object} reqPayloadDto
   * @returns Promise(ApiResponse)
   */
  public async authenticate(reqPayloadDto: LoginDto): Promise<IApiResponse> {
    try {
      const { email, password } = reqPayloadDto;

      const user = await this.repository.findOne({ where: { email } });

      if (!user)
        return ApiResponseBuilder.failed().setMessage("Bad Credential").build();

      const pass_match = await user.comparePassword(password);

      if (!pass_match)
        return ApiResponseBuilder.failed().setMessage("Bad Credential!").build();

      // todo call token service
      const token = null;

      const authDto: AuthDTO = AuthDTO.composeFromEntity(user);

      return ApiResponseBuilder.success().setData({...authDto, token }).build();
    } catch (error) {
      this.logger.error("Error:Login: " + error.message);
      return ApiResponseBuilder.error(error.message).build();
    }
  }
}
