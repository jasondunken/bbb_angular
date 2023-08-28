import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private title: Title, private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.title.setTitle("Login");
    }

    login(): void {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value).subscribe(() => {
                this.router.navigateByUrl("journals");
            });
        }
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
