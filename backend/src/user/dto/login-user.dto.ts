import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 32, { message: 'Minimum 6 characters' })
  password?: string;
}
