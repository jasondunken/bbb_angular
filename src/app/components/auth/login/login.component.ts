import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        // this.cookieService.deleteAll();
    }

    login(): void {
        this.auth.login(this.loginForm.value).subscribe(() => {
            this.router.navigateByUrl("journals");
        });
    }

    logout(): void {
        this.auth.logout();
    }

    resetPassword(): void {
        this.router.navigateByUrl("password-reset");
    }

    registerNewUser(): void {
        this.router.navigateByUrl("register");
    }
}
