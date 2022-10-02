import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { JournalService } from "src/app/services/journal.service";

@Component({
    selector: "app-journal",
    templateUrl: "./journal.component.html",
    styleUrls: ["./journal.component.css"],
})
export class JournalComponent implements OnInit {
    journalId;
    journal;
    journalEntries;

    journalEntryForm: FormGroup;
    creatingEntry: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private journalService: JournalService
    ) {
        this.journalEntryForm = this.fb.group({
            title: ["", Validators.required],
            body: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.journalId = this.route.snapshot.paramMap.get("id");
        this.journalService.findOne(this.journalId).subscribe((journal) => {
            this.journal = journal;
        });
        this.getEntries();
    }

    backToJournals(): void {
        this.router.navigateByUrl("journals");
    }

    createEntry(): void {
        this.creatingEntry = true;
    }

    saveEntry(): void {
        if (this.journalEntryForm.valid) {
            this.journalService
                .createJournalEntry({ journalId: this.journal._id, ...this.journalEntryForm.value })
                .subscribe((response) => {
                    console.log("response: ", response);
                    this.creatingEntry = false;
                    this.getEntries();
                });
        }
    }

    getEntries(): void {
        this.journalService.findAllEntries(this.journalId).subscribe((entries) => {
            this.journalEntries = entries;
            console.log("entries: ", entries);
        });
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    cancel(): void {
        this.creatingEntry = false;
    }
}
