import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-password-reset",
    templateUrl: "./password-reset.component.html",
    styleUrls: ["./password-reset.component.css"],
})
export class PasswordResetComponent implements OnInit {
    token: string;
    tokenValid: boolean;

    passwordResetForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.passwordResetForm = this.fb.group({
            password: ["", Validators.required],
            confirmPassword: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.token = this.route.snapshot.paramMap.get("token");
        this.auth.validateToken(this.token).subscribe((response) => {
            this.tokenValid = response.tokenValid;
        });
    }

    resetPassword(): void {
        if (this.passwordResetForm.valid) {
            this.auth.resetPassword("email", "password").subscribe(() => {
                this.returnToLogin();
            });
        }
    }

    returnToLogin(): void {
        this.router.navigateByUrl("login");
    }
}
