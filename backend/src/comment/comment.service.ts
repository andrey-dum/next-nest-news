import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save({
      text: createCommentDto.text,
      post: { id: createCommentDto.postId},
      user: { id: 1 } // will be from cookie

    });
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findOne(id: number) {

    const comment = await this.commentRepository.findOne(+id);

    if(!comment) {
      throw new NotFoundException("Не найдено комментария")
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne(+id);

    if(!comment) {
      throw new NotFoundException("Не найдено комментария")
    }

    return this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOne(+id);

    if(!comment) {
      throw new NotFoundException("Не найдено комментария")
    }

    return this.commentRepository.delete(id);
  }
}
