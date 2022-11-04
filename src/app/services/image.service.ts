import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { ImageDto } from "../models/image.model";

@Injectable({
    providedIn: "root",
})
export class ImageService {
    apiImages = `${environment.backend_api}/images`;
    constructor(private http: HttpClient) {}

    create(image: ImageDto): Observable<any> {
        return this.http.post(this.apiImages, image);
    }

    findAll(): Observable<any> {
        return this.http.get(this.apiImages);
    }

    findOne(tag: String): Observable<any> {
        return this.http.get(`${this.apiImages}/${tag}`);
    }

    delete(id: String): Observable<any> {
        return this.http.delete(`${this.apiImages}/${id}`);
    }

    uploadImages(images): Observable<any> {
        console.log("images[]: ", images);
        if (images.length === 1) {
            return this.http.post(`${environment.backend_api}/images/image`, images[0]);
        }
        return this.http.post(`${environment.backend_api}/images/image/multiple`, images);
    }

    getJournalImages(journalId): Observable<any> {
        return this.http.get(`${environment.backend_api}/images/${journalId}`);
    }
}
