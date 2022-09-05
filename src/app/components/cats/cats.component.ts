import { Component, OnInit } from "@angular/core";

import { MongoService } from "src/app/services/mongo.service";

import { Cat } from "src/app/models/cat.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-cats",
    templateUrl: "./cats.component.html",
    styleUrls: ["./cats.component.css"],
})
export class CatsComponent implements OnInit {
    createCatForm: FormGroup;
    getCatForm: FormGroup;

    catDetails: Cat | undefined;

    constructor(private fb: FormBuilder, private catService: MongoService) {
        this.createCatForm = this.fb.group({
            catName: ["", Validators.required],
            catAge: [null, Validators.required],
            catBreed: ["", Validators.required],
        });
        this.getCatForm = this.fb.group({
            catId: ["", Validators.required],
        });
        this.getCats();
    }

    ngOnInit(): void {}

    createCat(): void {
        const cat: Cat = this.createCatForm.value;
        this.catService.createCat(cat).subscribe((cat: Cat) => {
            console.log("cat created: ", cat);
        });
    }

    getCats(): void {
        this.catService.getCats().subscribe((cats) => {
            console.log("cats: ", cats);
        });
    }

    getCat(): void {
        const id: string = this.getCatForm.get("catId")?.value;
        this.catService.getCat(id).subscribe((cat: Cat) => {
            console.log("cat details: ", cat);
            this.catDetails = cat;
        });
    }
}
