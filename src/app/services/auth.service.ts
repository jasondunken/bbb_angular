import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { timeout, catchError, tap, takeUntil } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { LoginDto, LoginResponseDto } from "../models/login.model";

@Injectable({
    providedIn: "root",
})
export class AuthService implements OnDestroy {
    private ngUnsubscribe = new Subject<boolean>();

    private userUpdated: BehaviorSubject<any> | undefined;
    currentUser: LoginResponseDto | undefined;

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
        this.userUpdated = new BehaviorSubject<any>(null);
        const JWT = this.cookieService.get("bitbytebytes.io/JWT");
        if (JWT) {
            const username = this.cookieService.get("bitbytebytes.io/username");
            const roles = JSON.parse(this.cookieService.get("bitbytebytes.io/roles"));
            this.currentUser = { JWT, username, roles };
            this.userUpdated.next(username);
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    login(user: LoginDto): Observable<any> {
        return this.http.post(`${environment.backend_api}/login`, user).pipe(
            takeUntil(this.ngUnsubscribe),
            tap((response: LoginResponseDto) => {
                if (response.JWT) {
                    this.cookieService.set("bitbytebytes.io/JWT", response.JWT, 1); // expires in days
                    this.cookieService.set("bitbytebytes.io/username", response.username, 1); // expires in days
                    this.cookieService.set("bitbytebytes.io/roles", JSON.stringify(response.roles), 1); // expires in days
                    this.userUpdated.next(response.username);
                    this.currentUser = response;
                }
            }),
            catchError((err) => {
                return of({ error: "failed to login!", err });
            })
        );
    }

    logout(): void {
        this.cookieService.deleteAll();
        this.userUpdated.next(null);
        this.router.navigateByUrl("/");
    }

    resetPasswordRequest(email: string): Observable<any> {
        return this.http.post(`${environment.backend_api}/reset`, email);
    }

    validateToken(token: string): Observable<any> {
        return this.http.post(`${environment.backend_api}/validate`, { token });
    }

    resetPassword(email: string, newPassword: string): Observable<any> {
        return this.http.patch(`${environment.backend_api}/reset`, { email, newPassword });
    }

    getAuthToken(): string {
        return this.cookieService.get("bitbytebytes.io/JWT");
    }

    getUserRoles(): Observable<any> {
        return of({ roles: this.currentUser.roles });
    }

    getUserUpdate(): BehaviorSubject<any> {
        return this.userUpdated;
    }
}
