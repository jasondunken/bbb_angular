import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { CreateUserDto } from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    apiUsers = `${environment.backend_api}/users`;
    constructor(private http: HttpClient) {}

    create(user: CreateUserDto): Observable<any> {
        return this.http.post(this.apiUsers, user);
    }

    findAll(): Observable<any> {
        return this.http.get(this.apiUsers);
    }

    findOne(id: String): Observable<any> {
        return this.http.get(`${this.apiUsers}/${id}`);
    }

    delete(id: String): Observable<any> {
        return this.http.delete(`${this.apiUsers}/${id}`);
    }
}
