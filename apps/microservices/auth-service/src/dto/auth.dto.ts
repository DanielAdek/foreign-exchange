import {IsEmail, IsNotEmpty, IsUUID, Length} from 'class-validator';
import {AuthEntity} from "../entity/auth.entity";

export class AuthDTO {
  @IsUUID()
  authId: string;

  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;


  private static authEntity(dto: Partial<AuthDTO>): AuthDTO {
    const user_dto: AuthDTO = new AuthDTO();
    user_dto.authId = dto.authId;
    user_dto.email = dto.email;
    return user_dto;
  }

  public static composeFromEntity(entity: AuthEntity): AuthDTO {
    return this.authEntity({
      authId: entity.authId,
      email: entity.email
    });
  }
}
