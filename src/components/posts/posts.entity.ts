import { Users } from './../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  caption: string;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

}