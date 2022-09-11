import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CreateJournalDto, JournalDto } from "src/app/models/journal.model";
import { JournalService } from "src/app/services/journal.service";

@Component({
    selector: "app-journals",
    templateUrl: "./journals.component.html",
    styleUrls: ["./journals.component.css"],
})
export class JournalsComponent implements OnInit {
    createJournalForm: FormGroup;
    getJournalForm: FormGroup;
    deleteJournalForm: FormGroup;

    journals: JournalDto[] | undefined;
    journal: JournalDto | undefined;

    deleteStatus: String = "";

    constructor(private fb: FormBuilder, private journalService: JournalService) {
        this.createJournalForm = this.fb.group({
            journalName: ["", Validators.required],
            journalDescription: ["", Validators.required],
        });
        this.getJournalForm = this.fb.group({
            journalId: ["", Validators.required],
        });
        this.deleteJournalForm = this.fb.group({
            journalId: ["", Validators.required],
        });
    }

    ngOnInit(): void {}

    createJournal(): void {
        const journal: CreateJournalDto = this.createJournalForm.value;
        this.journalService.create(journal).subscribe((journal: JournalDto) => {
            console.log("new journal created: ", journal);
        });
    }

    findAll(): void {
        this.journalService.findAll().subscribe((journals: JournalDto[]) => {
            this.journals = journals;
        });
    }

    findOne(): void {
        const id: string = this.getJournalForm.value;
        this.journalService.findOne(id).subscribe((journal: JournalDto) => {
            this.journal = journal;
        });
    }

    delete(): void {
        const id: String = this.deleteJournalForm.value;
        this.journalService.delete(id).subscribe((journal: JournalDto) => {
            console.log("journal deleted: ", journal);
        });
    }
}
