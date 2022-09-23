import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { CookieService } from "ngx-cookie-service";

import { AuthService } from "src/app/services/auth.service";
import { LoginResponseDto } from "src/app/models/login.model";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
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

    resetPassword(): void {}

    registerNewUser(): void {}
}
