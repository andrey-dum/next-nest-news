import { IsEmail, Length, MinLength } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUserDto {

    @MinLength(3)
    fullName: string;

    @IsEmail(undefined, { message: "Неверная почта" })
    email: string;

    @Length(6, 32, { message: "Minimum 6 characters" })
    password?: string;

    
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
