import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable, of } from "rxjs";
import { timeout, catchError } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { LoginDto } from "../models/login.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

    login(user: LoginDto): Observable<any> {
        return this.http.post(`${environment.backend_api}/login`, user).pipe(
            timeout(5000),
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
}
