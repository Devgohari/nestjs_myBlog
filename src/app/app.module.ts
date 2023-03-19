import { Users } from '../components/user/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../components/auth/auth.module';
import { UsersModule } from '../components/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { PostsModule } from '../components/posts/posts.module';
import { Posts } from '../components/posts/posts.entity';
import { Comment } from '../components/comments/comment.entity';
import { CommentsModule } from '../components/comments/comments.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: '../media',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../media')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'myblog',
      entities: [Users, Posts,
        Comment
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule { }
