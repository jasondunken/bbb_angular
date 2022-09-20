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
        const username = this.cookieService.get("bitbytebytes.io/username");
        this.userUpdated = new BehaviorSubject<any>(username);
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
        this.cookieService.delete("bitbytebytes.io/JWT");
        this.router.navigateByUrl("/manage");
    }

    getAuthToken(): string {
        return this.cookieService.get("bitbytebytes.io/JWT");
    }

    getUserUpdate(): BehaviorSubject<any> {
        return this.userUpdated;
    }
}
