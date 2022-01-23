import { IsEmail, Length, MinLength } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @MinLength(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(User)
  email: string;

  @Length(6, 32, { message: 'Password Minimum 6 characters' })
  password?: string;

  
}
