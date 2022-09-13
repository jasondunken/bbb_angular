import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService) {
        this.loginForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    ngOnInit(): void {}

    login(): void {
        this.auth.login(this.loginForm.value).subscribe((token: string) => {
            console.log("jwt_token: ", token);
        });
    }
}
