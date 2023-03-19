import { PostsService } from './../posts/posts.service';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './DTO/create-comment.dto';
import { UpdateCommentDto } from './DTO/update-comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    private postRepo: PostsService
  ) { }

  async createComment(createCommentDto: CreateCommentDto, postID) {
    const post = await this.postRepo.getPostByID(+postID)
    const comment = this.commentRepo.create(createCommentDto)
    comment.post = post
    await this.commentRepo.save(comment)
    return comment
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
