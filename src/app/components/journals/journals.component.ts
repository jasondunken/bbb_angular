import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

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

    creatingEntry: boolean = false;
    createEntryForm: FormGroup;

    deleteStatus: String = "";

    constructor(private title: Title, private fb: FormBuilder, private journalService: JournalService) {
        this.createJournalForm = this.fb.group({
            name: ["", Validators.required],
            description: ["", Validators.required],
        });
        this.getJournalForm = this.fb.group({
            id: ["", Validators.required],
        });
        this.deleteJournalForm = this.fb.group({
            id: ["", Validators.required],
        });
        this.createEntryForm = this.fb.group({
            entryTitle: ["", Validators.required],
            entryDescription: ["", Validators.required],
            entryBody: ["", Validators.required],
        });
        this.findAll();
    }

    ngOnInit(): void {
        this.title.setTitle("Journals");
    }

    createJournal(): void {
        const journal: CreateJournalDto = this.createJournalForm.value;
        this.journalService.create(journal).subscribe((journal: JournalDto) => {
            console.log("new journal created: ", journal);
            this.findAll();
        });
    }

    findAll(): void {
        this.journalService.findAll().subscribe((journals: JournalDto[]) => {
            this.journals = journals;
        });
    }

    findOne(): void {
        const id: string = this.getJournalForm.get("id")?.value;
        this.journalService.findOne(id).subscribe((journal: JournalDto) => {
            this.journal = journal;
        });
    }

    delete(): void {
        const id: String = this.deleteJournalForm.get("id")?.value;
        this.journalService.delete(id).subscribe((journal: JournalDto) => {
            console.log("journal deleted: ", journal);
            this.findAll();
        });
    }

    createEntry(): void {
        this.creatingEntry = true;
    }

    saveEntry(): void {
        console.log("entry: ", this.createEntryForm.value);
        this.creatingEntry = false;
    }
}
