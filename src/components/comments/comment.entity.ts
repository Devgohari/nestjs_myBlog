import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string

  @ManyToOne(() => Posts, (post) => post.comments)
  post: Posts
}