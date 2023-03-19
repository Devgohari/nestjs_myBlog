import { CreateUserDTO } from './../user/DTO/create.user.dto';
import { UserService } from '../user/user.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userLoginDTO } from '../user/DTO/user.dto';
import { LOGIN_ERROR } from '../../Constants/messages';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, userPassword: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(userPassword, user.password);
      if (isPasswordValid) {
        return this.login(user);
      }
    }
    throw new UnauthorizedException(LOGIN_ERROR);

  }

  async login(user: userLoginDTO) {
    const payload = {
      email: user.email,
      password: user.password,
      id: user.id
    };
    console.log(user)
    return {
      email: user.email,
      access_token: this.jwtService.sign({ ...payload }),
    };
  }

  async register(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, 10)
    let response = await this.userService.createUser(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  async verifyAccount(token: string) {
    const user = await this.userService.findByToken(token);
    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }
    // Log user in
  }

  decodeToken(token): any {
    return this.jwtService.decode(token)
  }
}
