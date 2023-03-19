import { UseInterceptors } from '@nestjs/common';
import { PostDTO } from './DTO/post.dto';
import { Body, Controller, Delete, Get, Post, Req, UseGuards, Param, UploadedFile } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Sereialze } from '../../interceptor/sererial.inceptor';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreatePostDTO } from './DTO/create.post.DTO';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) { }

  @Get()
  @Sereialze(PostDTO)
  async getPostss(): Promise<Posts[]> {
    return this.postService.getAllPosts();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    try {
      const user = req.user;
      console.log(file)
      const filePath = path.join(__dirname, '..', '..', '..', '/src/media', file.originalname);
      const fileStream = fs.createWriteStream(filePath);
      fileStream.on('error', (error) => {
        console.log(error);
      });

      fileStream.on('finish', () => {
        console.log(`File saved to ${filePath}`);
      });

      fileStream.write(file.buffer);
      fileStream.end();
    } catch (error) {
      console.log(error)
    }

  }

  @Post()
  async createPosts(@Body() Posts: CreatePostDTO, @Req() req) {
    const userId = req.user.id;
    const post = await this.postService.createPosts(Posts, userId);
    if (!post) {
      throw new UnauthorizedException("Error");
    }
    return { message: "Post Saved" }
  }

  @Get(':id')
  async getPostByID(@Param('id') id: number): Promise<Posts> {
    return this.postService.getPostByID(id);
  }

  @Delete()
  async deletePosts(id: number): Promise<void> {
    await this.postService.deletePosts(id);
  }

  @Get('/myposts')
  async myPosts(@Req() req): Promise<Posts[]> {
    const userId = req.user.id;
    console.log(userId)
    return this.postService.myPosts(userId)
  }


}
