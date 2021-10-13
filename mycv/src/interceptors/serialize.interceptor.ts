import { UserDto } from './../users/dtos/user.dto';
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // 요청이 처리되기 전에 실행될 구문
    // console.log('Im running before the handler', context);
    
    return handler.handle().pipe(
      map((data: any) => {
        // 요청이 처리된 후에 전달되기 전에 실행될 구문
        // console.log('Im running before response is sent out');
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
        
      })
    )
  }

}