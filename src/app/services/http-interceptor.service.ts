import {
  Injectable
} from '@angular/core';
import {
  finalize,
  tap,
  catchError
} from 'rxjs/operators';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable, throwError
} from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  count = 0;

  constructor(private spinner: NgxSpinnerService,    private messageService: MessageService) {}

  intercept(
    req: HttpRequest < any > ,
    next: HttpHandler
  ): Observable < HttpEvent < any >> {
/*
    const headers = new HttpHeaders({
      'Authorization': 'BilelMaamouri'
    });
    const clone = req.clone({
      headers: headers,
    });
*/
    this.spinner.show();
    this.count++;

    return next
      .handle(req)

      .pipe(
        tap(
          event => console.log(event),

          error => console.log(error)
        ),
        finalize(() => {
          this.count--;

          if (this.count === 0) {
            this.spinner.hide();
          }
        }),
        catchError(this.handleError),
      );
  }

  // error handler
  handleError(error: HttpErrorResponse) {

    return throwError(error);
  }


}
