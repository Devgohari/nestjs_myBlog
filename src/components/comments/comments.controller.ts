import { PostsService } from './../posts/posts.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './DTO/create-comment.dto';
import { UpdateCommentDto } from './DTO/update-comment.dto';
import { POST_NOT_FOUND } from '../../Constants/messages';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post(':postID')
  createComment(@Body() createCommentDto: CreateCommentDto, @Param('postID') postID: string) {
    return this.commentsService.createComment(createCommentDto, postID);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
