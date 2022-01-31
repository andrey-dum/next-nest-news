import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@UserDecorator() userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto, userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@UserDecorator() userId: number, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@UserDecorator() userId: number, @Param('id') id: string) {
    return this.postService.remove(+id, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/popular')
  getPopularPosts() {
    return this.postService.getPopularPosts();
  }

  @Get('/search')
  search(@Query() dto: SearchPostDto) {
    return this.postService.search(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
}
