import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";

import { Observable, throwError } from "rxjs";

import { AuthService } from "../services/auth.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.body?.password) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.auth.getAuthToken()}`, "Content-Type": "application/json" },
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.auth.logout();
                }
                return throwError(() => {
                    new Error(err);
                });
            })
        );
    }
}
