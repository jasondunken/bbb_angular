import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageService } from "src/app/services/image.service";

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

    // edit or preview
    editingEntry: boolean = true;
    entryPreviewHtml: string = "";

    addingImage: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private journalService: JournalService,
        private imageService: ImageService
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

    editEntry(): void {
        this.editingEntry = true;
    }

    previewEntry(): void {
        this.editingEntry = false;
        this.entryPreviewHtml = this.journalEntryForm.get("body").value;
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

    addImage(): void {
        this.addingImage = true;
    }

    cancelAddImage(): void {
        this.addingImage = false;
    }

    selectImageFile($event): void {
        console.log("event: ", $event);
    }

    uploadImage(): void {}

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    cancel(): void {
        this.creatingEntry = false;
    }
}
