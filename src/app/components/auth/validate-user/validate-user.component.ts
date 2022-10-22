import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-validate-user",
    templateUrl: "./validate-user.component.html",
    styleUrls: ["./validate-user.component.css"],
})
export class ValidateUserComponent implements OnInit {
    validateUserToken: string;
    user;

    constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.validateUserToken = this.route.snapshot.paramMap.get("token");
        this.auth.validateToken(this.validateUserToken).subscribe((response) => {
            this.user = response.user;
        });
    }

    returnToLogin(): void {
        this.router.navigateByUrl("login");
    }
}
