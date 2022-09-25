import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { JournalService } from "src/app/services/journal.service";
import { CreateJournalDto, JournalDto } from "src/app/models/journal.model";

@Component({
    selector: "app-journal-list",
    templateUrl: "./journal-list.component.html",
    styleUrls: ["./journal-list.component.css"],
})
export class JournalListComponent implements OnInit {
    journals;

    creatingJournal: boolean = false;
    createJournalForm: FormGroup;

    constructor(private journalService: JournalService, private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.journalService.findAll().subscribe((journals) => {
            this.journals = journals;
        });
        this.createJournalForm = this.fb.group({
            name: ["", Validators.required],
            description: ["", Validators.required],
        });
    }

    addNewJournal(): void {
        this.creatingJournal = true;
    }

    createJournal(): void {
        if (this.createJournalForm.valid) {
            const journal: CreateJournalDto = this.createJournalForm.value;
            this.journalService.create(journal).subscribe((journal: JournalDto) => {
                console.log("new journal created: ", journal);
                this.creatingJournal = false;
                this.router.navigateByUrl(`journals/${journal._id}`);
            });
        }
    }

    gotoJournal(id): void {
        this.router.navigateByUrl(`journals/${id}`);
    }

    cancelCreateJournal(): void {
        this.creatingJournal = false;
    }
}
