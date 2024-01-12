import { Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const getToken = this.authService.tokenValue;
    const isLoggedIn = getToken && getToken.token;

    if(isLoggedIn) 
    {
        request = request.clone({
            setHeaders: 
            {
                Authorization: `Bearer ${getToken.token}`
            }
        });
    }

    return next.handle(request);
  }
}
