import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { BrowserStack } from 'protractor/built/driverProviders';
import { error } from 'selenium-webdriver';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if(errorResponse){

          switch (errorResponse.status){

            case 400:
              if(errorResponse.error.errors){
                const modalStateErrors = [];
                for(const key in errorResponse.error.errors){
                  if(errorResponse.error.errors[key])
                  modalStateErrors.push(errorResponse.error.errors);
                }
                throw modalStateErrors;
              } else {
                this.toastr.error(errorResponse.error, errorResponse.status);
                
              }
              break;
            case 401: 
              this.toastr.error('Unauthorize', errorResponse.status);
              break;
            case 404: 
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: errorResponse.error}}
              this.router.navigateByUrl('/server-error', navigationExtras);
            default:
                this.toastr.error('Something Unexpected went wrong');
              break;
              
          }
        }
        return throwError(errorResponse);
      })
    );
  }
}
