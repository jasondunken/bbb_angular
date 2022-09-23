import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    gotoWebGames(): void {
        window.location.href = "http://localhost:3000/games/games.html";
    }

    login(): void {
        this.router.navigateByUrl("/");
    }
}
