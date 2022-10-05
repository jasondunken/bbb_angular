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
    journal;
    journalEntries;

    creatingEntry: boolean = false;
    journalEntryForm: FormGroup;

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
        const journalId = this.route.snapshot.paramMap.get("id");
        this.journalService.findOne(journalId).subscribe((journal) => {
            this.journal = journal;
            this.getEntries();
        });
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
                    this.creatingEntry = false;
                    this.getEntries();
                });
        }
    }

    getEntries(): void {
        this.journalService.findAllEntries(this.journal._id).subscribe((entries) => {
            this.journalEntries = entries;
        });
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    cancel(): void {
        this.creatingEntry = false;
    }
}
