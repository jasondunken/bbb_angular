import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable, ReplaySubject } from "rxjs";

import { ImageService } from "src/app/services/image.service";

@Component({
    selector: "app-image-upload",
    templateUrl: "./image-upload.component.html",
    styleUrls: ["./image-upload.component.css"],
})
export class ImageUploadComponent implements OnInit {
    @Input() journalId: string;

    imageForm: FormGroup;
    imageAsBase64;
    imageFiles;

    constructor(private fb: FormBuilder, private imageService: ImageService) {}

    ngOnInit(): void {
        this.imageForm = this.fb.group({
            tag: ["", Validators.required],
        });
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

    cancelAddImage(): void {}
}
