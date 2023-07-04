import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
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

    return next.handle(request);
  }
}
