

import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AppStorage } from './storage';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    storage: AppStorage = new AppStorage();
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.storage.getItem('access_token');
        if (accessToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}