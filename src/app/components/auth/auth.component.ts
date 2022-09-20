import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CookieService } from "ngx-cookie-service";

import { LoginResponseDto } from "src/app/models/login.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private cookieService: CookieService) {
        this.loginForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        // this.cookieService.deleteAll();
    }

    login(): void {
        this.auth.login(this.loginForm.value).subscribe((response: LoginResponseDto) => {
            console.log("login response: ", response);
        });
    }

    logout(): void {
        this.auth.logout();
    }
}
