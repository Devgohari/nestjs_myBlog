import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/create.user.dto';
import { Users, UserStatus } from './user.entity';
import crypto from 'crypto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users)
  private userRepo: Repository<Users>) { }


  async createUser(data: CreateUserDTO) {
    const user = await this.userRepo.create(data)
    user.verificationtoken = crypto.randomBytes(20).toString('hex');
    return this.userRepo.save(user)
  }



  async findOne(id: number) {
    if (!id) return null
    const user = await this.userRepo.findOne({ where: { id } })
    return user
  }

  async findByToken(token: string) {
    if (!token) return null
    const user = await this.userRepo.findOne({ where: { verificationtoken: token } })
    user.status = UserStatus.verified;
    user.verificationtoken = null;
    await this.userRepo.save(user);
    return user
  }

  async findByEmail(email: string) {
    if (!email) return null
    const user = await this.userRepo.findOne({ where: { email } })
    return user
  }

  async update(id: number, atts: Partial<Users>) {
    const user = await this.findOne(id)
    if (!user) {
      throw new Error("No user Found");
    }
    Object.assign(user, atts)
    return this.userRepo.save(user)
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new Error("No user Found");
    }
    return this.userRepo.remove(user)
  }
}
