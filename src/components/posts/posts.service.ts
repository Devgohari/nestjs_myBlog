import { Users } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { CreatePostDTO } from './DTO/create.post.DTO';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,
    private userService: UserService,
  ) { }


  async getAllPosts(): Promise<Posts[]> {
    return this.postRepo.find({
      relations: {
        user: true,
        comments: true
      }
    });
  }

  async createPosts(PostData: CreatePostDTO, userId: number): Promise<Posts> {
    const user = await this.userService.findOne(userId);
    const post = this.postRepo.create(PostData);
    post.user = user
    return this.postRepo.save(post)
  }

  async getPostByID(id: number): Promise<Posts> {
    return this.postRepo.findOneBy({ id });
  }

  async deletePosts(id: number): Promise<void> {
    await this.postRepo.delete(id);
  }

  async myPosts(id): Promise<Posts[]> {
    return this.postRepo.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post.caption'])
      .where('post.userId = :userId', { userId: id })
      .getMany();
  }

  // findById(id:string){
  //   return this.postRepo.findBy({})
  // }

}
