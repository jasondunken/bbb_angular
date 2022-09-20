import { Component, OnInit } from "@angular/core";

import { JournalService } from "src/app/services/journal.service";

@Component({
    selector: "app-journal-list",
    templateUrl: "./journal-list.component.html",
    styleUrls: ["./journal-list.component.css"],
})
export class JournalListComponent implements OnInit {
    journals;

    constructor(private journalService: JournalService) {}

    ngOnInit(): void {
        this.journalService.findAll().subscribe((journals) => {
            this.journals = journals;
            console.log("journals: ", journals);
        });
    }
}
