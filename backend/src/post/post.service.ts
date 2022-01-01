import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(+id);

    if (!post) {
      throw new NotFoundException("Статья не найдена");
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(+id);
    
    if (!post) {
      throw new NotFoundException("Статья не найдена");
    }

    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(+id);
    
    if (!post) {
      throw new NotFoundException("Статья не найдена");
    }
    return this.postRepository.delete(id);
  }
}
