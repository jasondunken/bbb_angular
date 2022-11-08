import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable, ReplaySubject } from "rxjs";

import { ImageService } from "src/app/services/image.service";
import { JournalService } from "src/app/services/journal.service";

@Component({
    selector: "app-journal",
    templateUrl: "./journal.component.html",
    styleUrls: ["./journal.component.css"],
})
export class JournalComponent implements OnInit {
    journal;
    journalId;
    journalEntries;

    creatingEntry: boolean = false;
    journalEntryForm: FormGroup;

    // edit or preview
    editingEntry: boolean = true;
    entryPreviewHtml: string = "";

    imageForm: FormGroup;
    addingImage: boolean = false;
    imageAsBase64: string;
    imageFiles = [];

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

        this.imageForm = this.fb.group({
            tag: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.journalId = this.route.snapshot.paramMap.get("id");
        this.journalService.findOne(this.journalId).subscribe((journal) => {
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

    editJournalEntry(event, entryId: string): void {
        event.stopPropagation();
        console.log(`edit existing entry not yet implemented $entryId{}`);
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

    selectImageFile(event): void {
        console.log("selectEvent: ", event);
        this.imageFiles = event.target.files;
        this.convertToBase64(event.target.files[0]).subscribe((base64) => {
            this.imageAsBase64 = base64;
        });
    }

    convertToBase64(imageFile): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(imageFile);
        reader.onload = (event) => result.next(btoa(event.target.result.toString()));
        return result;
    }

    uploadImage(): void {
        if (this.imageAsBase64 && this.imageForm.valid) {
            this.imageService
                .create({ tag: this.imageForm.get("tag").value, imageData: this.imageAsBase64 })
                .subscribe((result) => {
                    console.log("create image: ", result);
                });
        }
    }

    uploadImage2(): void {
        console.log("imageFiles: ", this.imageFiles);
        const reader = new FileReader();
        const images = [];
        for (let i = 0; i < this.imageFiles["length"]; i++) {
            reader.readAsBinaryString(this.imageFiles[i]);
            reader.onload = (event) => {
                images.push(event.target.result);
                this.imageService.uploadImages(images).subscribe((response) => {
                    console.log("image: ", response);
                });
            };
        }
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    cancel(): void {
        this.creatingEntry = false;
    }

    archiveJournal(journalId: string): void {
        console.log(`archive not yet implemented ${journalId}`);
    }
}
