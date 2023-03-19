import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Posts } from './posts.entity';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users])],
  providers: [PostsService,UserService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule { }
