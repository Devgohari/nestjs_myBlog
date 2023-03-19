import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Posts } from '../posts/posts.entity';

export enum UserStatus {
  pending = "pending",
  verified = "verified"
}

@Entity()
@Unique(["email"])
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[]

  @Column({ default: UserStatus.pending })
  status: string;

  @Column()
  verificationtoken: string;

  // @Column({ default: null, type: "datetime" })
  // created_at: Date;

  // @Column({ default: null, type: "datetime" })
  // updated_at: Date;
}