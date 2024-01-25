import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
    currentUser: string | undefined;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.auth.getUserUpdate().subscribe((username) => {
            this.currentUser = username;
        });
    }

    gotoWebGames(): void {
        window.location.assign("../index.html");
    }

    goRetro(): void {
        window.location.href = "../retro.html";
    }

    login(): void {
        if (this.currentUser) {
            this.auth.logout();
            return;
        }
        this.router.navigateByUrl("/");
    }
}
