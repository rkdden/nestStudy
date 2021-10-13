import { UserDto } from './../users/dtos/user.dto';
import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // 요청이 처리되기 전에 실행될 구문
    // console.log('Im running before the handler', context);
    
    return handler.handle().pipe(
      map((data: any) => {
        // 요청이 처리된 후에 전달되기 전에 실행될 구문
        // console.log('Im running before response is sent out');
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
        
      })
    )
  }

}