import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-password-reset",
    templateUrl: "./password-reset.component.html",
    styleUrls: ["./password-reset.component.css"],
})
export class PasswordResetComponent implements OnInit {
    passwordResetForm: FormGroup;
    emailSent: boolean = false;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.passwordResetForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    ngOnInit(): void {}

    resetPassword(): void {
        if (this.passwordResetForm.valid) {
            this.auth.resetPassword(this.passwordResetForm.value).subscribe(() => {
                this.emailSent = true;
            });
        }
    }

    returnToLogin(): void {
        this.router.navigateByUrl("login");
    }
}
