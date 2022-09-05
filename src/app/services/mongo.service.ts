import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { Cat } from "../models/cat.model";

@Injectable({
    providedIn: "root",
})
export class MongoService {
    constructor(private http: HttpClient) {}

    createCat(cat: Cat): Observable<any> {
        return this.http.post(`${environment.backend_api}/cats`, cat);
    }

    getCats(): Observable<any> {
        return this.http.get(`${environment.backend_api}/cats`);
    }

    getCat(id: string): Observable<any> {
        return this.http.get(`${environment.backend_api}/cats/${id}`);
    }

    deleteCat(id: string): Observable<any> {
        return this.http.delete(`${environment.backend_api}/cats/${id}`);
    }
}
