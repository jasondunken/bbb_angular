import { Component, Input, OnInit } from "@angular/core";
import { ImageService } from "src/app/services/image.service";

@Component({
    selector: "app-image-list",
    templateUrl: "./image-list.component.html",
    styleUrls: ["./image-list.component.css"],
})
export class ImageListComponent implements OnInit {
    @Input() journalId: string;

    images: [];

    constructor(private imageService: ImageService) {}

    ngOnInit(): void {
        this.imageService.getJournalImages(this.journalId).subscribe((images) => {
            this.images = images;
        });
    }
}
