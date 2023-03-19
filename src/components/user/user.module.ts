import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [TypeOrmModule, UserService]
})
export class UsersModule {}
