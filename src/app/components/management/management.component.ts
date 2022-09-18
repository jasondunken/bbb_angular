import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-management",
    templateUrl: "./management.component.html",
    styleUrls: ["./management.component.css"],
})
export class ManagementComponent implements OnInit {
    currentUser: string | undefined;

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        this.auth.getUserUpdate().subscribe((username) => {
            this.currentUser = username;
        });
    }
}
