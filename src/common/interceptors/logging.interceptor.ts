import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { COMMAND } from 'config/console';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `${COMMAND.Underscore}${COMMAND.FgCyan}%s - ${COMMAND.FgGreen}%s : ${COMMAND.FgYellow}+%s ms ${COMMAND.Reset}`,
            request.method,
            request.url,
            Date.now() - now,
          ),
        ),
      );
  }
}
