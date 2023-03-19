import { CreateUserDTO } from './../user/DTO/create.user.dto';
import { Controller, Request, Post, UseGuards, Get, Body, Query } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { userLoginDTO } from '../user/DTO/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: userLoginDTO) {
    return this.authService.validateUser(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: CreateUserDTO) {
    return this.authService.register(body);
  }

  @Get('/verify')
  async verifyAccount(@Query('token') token: string) {
    await this.authService.verifyAccount(token);
    // Redirect to dashboard or display success message
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}