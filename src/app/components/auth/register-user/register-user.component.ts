import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from "src/app/services/user.service";
import { CreateUserDto } from "src/app/models/user.model";

@Component({
    selector: "app-register-user",
    templateUrl: "./register-user.component.html",
    styleUrls: ["./register-user.component.css"],
})
export class RegisterUserComponent implements OnInit {
    createUserForm: FormGroup;

    registering: boolean = true;

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.createUserForm = this.fb.group({
            userName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
            verifyPassword: ["", Validators.required],
        });
    }

    ngOnInit(): void {}

    createUser(): void {
        if (this.createUserForm.get("password").value != this.createUserForm.get("verifyPassword").value) return;
        if (this.createUserForm.valid) {
            const user: CreateUserDto = this.createUserForm.value;
            this.userService.create(user).subscribe(() => {
                this.registering = false;
            });
        }
    }

    returnToLogin(): void {
        this.router.navigateByUrl("login");
    }
}
