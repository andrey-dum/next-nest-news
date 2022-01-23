import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser({
      email,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken = (data: { id: number, email: string }) => {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: User) {
    try {
      const { password, ...userData } = user;
      // const payload = { email: user.email, sub: user.id };
      return {
        ...userData,
        access_token: this.generateJwtToken(userData),
      };
    } catch (error) {
      throw new ForbiddenException("Ошибка при входе")
    }
  }

  async register(dto: CreateUserDto) {

    try {
      const {password, ...userData } = await this.usersService.create({
        email: dto.email,
        fullName: dto.fullName,
        password: dto.password
      })

      return {
        ...userData,
        access_token: this.generateJwtToken(userData)
      };
    } catch (error) {
      throw new ForbiddenException("Ошибка при регистрации")
    }
  }
}
