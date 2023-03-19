import { PostsService } from './../posts/posts.service';
import { UserService } from './../user/user.service';
import { Users } from './../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Posts } from '../posts/posts.entity';
import { Comment } from './comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comment,Users,Posts])],
  controllers: [CommentsController],
  providers: [CommentsService,UserService,PostsService]
})
export class CommentsModule {}
