import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreateUserDto, UserDto } from "src/app/models/user-create.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
    createUserForm: FormGroup;
    getUserForm: FormGroup;

    userDetails: UserDto | undefined;

    constructor(private fb: FormBuilder, private userService: UserService) {
        this.createUserForm = this.fb.group({
            userName: ["", Validators.required],
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
        this.getUserForm = this.fb.group({
            userId: ["", Validators.required],
        });
        this.findAll();
    }

    ngOnInit(): void {}

    createUser(): void {
        const user: CreateUserDto = this.createUserForm.value;
        this.userService.create(user).subscribe((user: UserDto) => {
            console.log("user created: ", user);
        });
    }

    findAll(): void {
        this.userService.findAll().subscribe((users: UserDto[]) => {
            console.log("users: ", users);
        });
    }

    findOne(): void {
        const id: string = this.getUserForm.get("userId")?.value;
        this.userService.findOne(id).subscribe((user: UserDto) => {
            console.log("user details: ", user);
            this.userDetails = user;
        });
    }
}
