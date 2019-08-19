import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  public apiBasePath:string = 'http://192.168.10.10/api';
  //public apiBasePath:string = 'http://outgogo.cristiangonzalez.com/api';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = req.url;
        if (url.includes('api')) {
            const modifiedUrl = url.replace('/api', this.apiBasePath);
            const apiRequest = req.clone({ url: `${modifiedUrl}` });
            return next.handle(apiRequest);
        } else {
            const apiRequest = req.clone({ url: `${url}` });
            return next.handle(apiRequest);
        }
    }
}
