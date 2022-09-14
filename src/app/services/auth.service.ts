import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { LoginDto } from "../models/login.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(user: LoginDto): Observable<any> {
        return this.http.post(`${environment.backend_api}/login`, user);
    }
}
