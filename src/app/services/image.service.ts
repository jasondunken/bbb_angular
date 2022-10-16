import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ImageService {
    apiImages = `${environment.backend_api}/images`;
    constructor(private http: HttpClient) {}

    create(imageData): Observable<any> {
        return this.http.post(this.apiImages, imageData);
    }

    findAll(): Observable<any> {
        return this.http.get(this.apiImages);
    }

    findOne(id: String): Observable<any> {
        return this.http.get(`${this.apiImages}/${id}`);
    }

    delete(id: String): Observable<any> {
        return this.http.delete(`${this.apiImages}/${id}`);
    }
}
