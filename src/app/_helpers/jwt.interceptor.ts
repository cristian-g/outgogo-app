import { Observable } from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from "../../services/auth.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public static platformVersion = '1.0.0';

    constructor(
      public auth: AuthService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = this.auth.idToken;
        if (token != null) {
            return this.continueRequest(request, next, token);
        } else {
            request = request.clone({
                setHeaders: {
                    Version: JwtInterceptor.platformVersion
                }
            });
            return next.handle(request);
        }
    }

    continueRequest(request: HttpRequest<any>, next: HttpHandler, token: string): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                Version: JwtInterceptor.platformVersion
            }
        });

        return next.handle(request);
    }

    private isAuthError(error: any): boolean {
        return error instanceof HttpErrorResponse && error.status === 498;
    }
}
