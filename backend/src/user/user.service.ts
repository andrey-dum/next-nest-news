import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async search(dto: SearchUserDto ) {
    const qb = this.userRepository.createQueryBuilder('users');

    qb.limit(dto.limit || 0);
    qb.limit(dto.take || 10);

    if (dto.fullname) {
      qb.andWhere(`users.fullname ILIKE :fullname`);
    }

    if (dto.email) {
      qb.where(`users.email ILIKE :email`);
    }

    
    qb.setParameters({
      fullname: `%${dto.fullname}%`,
      email: `%${dto.email}%`,
    });

    const [users, total] = await qb.getManyAndCount();

    return {
      users,
      total,
    };
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findUser(options: LoginUserDto) {
    return this.userRepository.findOne(options);
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
