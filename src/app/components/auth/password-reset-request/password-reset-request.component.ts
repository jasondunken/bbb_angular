import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-password-reset-request",
    templateUrl: "./password-reset-request.component.html",
    styleUrls: ["./password-reset-request.component.css"],
})
export class PasswordResetRequestComponent implements OnInit {
    passwordResetForm: FormGroup;
    emailSent: boolean = false;

    constructor(private title: Title, private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.passwordResetForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    ngOnInit(): void {
        this.title.setTitle("Reset Password");
    }

    resetPassword(): void {
        if (this.passwordResetForm.valid) {
            this.auth.resetPasswordRequest(this.passwordResetForm.value).subscribe(() => {
                this.emailSent = true;
            });
        }
    }

    returnToLogin(): void {
        this.router.navigateByUrl("login");
    }
}
