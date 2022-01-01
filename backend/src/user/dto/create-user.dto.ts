import { IsEmail, Length, MinLength } from 'class-validator';

export class CreateUserDto {

    @MinLength(3)
    fullName: string;

    @IsEmail(undefined, { message: "Неверная почта" })
    email: string;

    @Length(6, 32, { message: "Minimum 6 characters" })
    password?: string;

}
