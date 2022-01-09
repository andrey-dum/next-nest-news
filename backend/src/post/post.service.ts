import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { abort } from 'process';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async search(dto: SearchPostDto) {
    const qb = this.postRepository.createQueryBuilder('posts');

    qb.limit(dto.limit || 0);
    qb.limit(dto.take || 10);

    if (dto.views) {
      qb.orderBy('views', dto.views || 'DESC');
    }

    if (dto.title) {
      qb.andWhere(`posts.title ILIKE :title`);
    }

    if (dto.body) {
      qb.where(`posts.body ILIKE :body`);
    }

    if (dto.tag) {
      qb.where(`posts.tag ILIKE :tag`);
    }

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
    };
  }

  async getPopularPosts() {
    // return this.postRepository.find({
    //   order: {
    //     views: 'DESC',
    //   },
    // });
    const qb = this.postRepository.createQueryBuilder('post');

    qb.orderBy('views', 'DESC');
    qb.limit(10);

    const [posts, total] = await qb.getManyAndCount();

    return {
      posts,
      total,
    };
  }

  async findOne(id: number) {
    // const post = await this.postRepository.findOne(+id);

    // if (!post) {
    //   throw new NotFoundException('Статья не найдена');
    // }

    // return post;

    const qb = await this.postRepository.createQueryBuilder('posts');

    await qb
      .whereInIds(id)
      .update()
      .set({ views: () => 'views + 1' })
      .execute();

    return this.postRepository.findOne(+id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(+id);

    if (!post) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(+id);

    if (!post) {
      throw new NotFoundException('Статья не найдена');
    }
    return this.postRepository.delete(id);
  }
}
