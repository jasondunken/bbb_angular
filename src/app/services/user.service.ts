import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { CreateUserDto } from "../models/user-create.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private http: HttpClient) {}

    create(user: CreateUserDto): Observable<any> {
        return this.http.post(`${environment.backend_api}/users`, user);
    }

    findAll(): Observable<any> {
        return this.http.get(`${environment.backend_api}/users`);
    }

    findOne(id: string): Observable<any> {
        return this.http.get(`${environment.backend_api}/users/${id}`);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${environment.backend_api}/users/${id}`);
    }
}
