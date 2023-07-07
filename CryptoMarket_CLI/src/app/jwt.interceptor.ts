import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get token
    const token = localStorage.getItem('token');

    if (token) {
      // Add authentication
      request = request.clone({
        setHeaders: {
          'Authorization' : `Bearer ${token}`
        }
      });
    }

    if(!['GET', 'DELETE'].includes(request.method)){
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401){
          this.commonService.openSnackBar('Your session has expired. Please log in again.', 'alert');
          this.commonService.logOut();
          this.router.navigate(['home']);
        }

        return of();
        
      })
    );
  }
}
function Inyectable(): (target: typeof JwtInterceptor) => void | typeof JwtInterceptor {
  throw new Error('Function not implemented.');
}

