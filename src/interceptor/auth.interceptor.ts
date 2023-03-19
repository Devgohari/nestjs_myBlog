import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';
import { UserService } from '../components/user/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService, private usersService: UserService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    let tokenArray = req.headers.authorization;
    if (tokenArray) {
      req.body["user"] = this.authService.decodeToken(tokenArray.split(" ")[1]).user;
    }
    console.log(`before`)
    return next
      .handle()
      .pipe(
        tap((item) => console.log(`after`, 'item is available here')),
      );
  }
}