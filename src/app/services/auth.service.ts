import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(loginDto: any): Observable<any> {
        console.log("loginDto: ", loginDto);
        return this.http.post(`${environment.backend_api}/login`, loginDto);
    }
}
