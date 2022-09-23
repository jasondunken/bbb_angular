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

    journalEntryForm: FormGroup;
    creatingEntry: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private journalService: JournalService
    ) {
        this.journalEntryForm = this.fb.group({
            entryTitle: ["", Validators.required],
            entryDescription: ["", Validators.required],
            entryBody: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.journalService.findOne(id).subscribe((journal) => {
            this.journal = journal;
        });
    }

    createEntry(): void {
        this.creatingEntry = true;
    }

    saveEntry(): void {
        console.log("entry: ", this.journalEntryForm.value);
        this.creatingEntry = false;
    }
}
