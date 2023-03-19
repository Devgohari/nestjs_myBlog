import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new(...item: any[]): {}
}

export const Sereialze = (DTO: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(DTO))
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: any) { }
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.DTO, data, {
          excludeExtraneousValues: true
        })
      })
    );
  }
}