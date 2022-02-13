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

  create(createCommentDto: CreateCommentDto, userId: number) {
    return this.commentRepository.save({
      text: createCommentDto.text,
      post: { id: createCommentDto.postId},
      user: { id: userId } 

    });
  }

  async findAll(postId: number) {
    // return this.commentRepository.find();
    const qb = this.commentRepository
    .createQueryBuilder('comment');

    if(postId) {
      qb.where('comment.postId = :postId', {  postId})
    }

      const result = await qb.leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.user', 'user')
      .getMany()

      return result.map(obj => ({
        ...obj,
        post: {id: obj.post.id, title: obj.post.title}
      }))

    // return await this.commentRepository.query('SELECT * FROM comments')
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
