import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { CreateJournalDto, CreateJournalEntryDto } from "../models/journal.model";

@Injectable({
    providedIn: "root",
})
export class JournalService {
    apiJournals = `${environment.backend_api}/journals`;
    constructor(private http: HttpClient) {}

    create(journal: CreateJournalDto): Observable<any> {
        return this.http.post(this.apiJournals, journal);
    }

    findAll(): Observable<any> {
        return this.http.get(this.apiJournals);
    }

    findOne(id: String): Observable<any> {
        return this.http.get(`${this.apiJournals}/${id}`);
    }

    delete(id: String): Observable<any> {
        return this.http.delete(`${this.apiJournals}/${id}`);
    }

    createJournalEntry(journalEntry: CreateJournalEntryDto): Observable<any> {
        return this.http.post(`${environment.backend_api}/journal/entries`, journalEntry);
    }
}
