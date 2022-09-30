import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = this.auth.currentUser;
        console.log("authGuard: ", user);
        console.log("authGuard.route.data: ", route.data);
        if (user) {
            if (route.data["roles"] && route.data["roles"].indexOf(user.roles[0]) === -1) {
                this.router.navigate(["/"]);
                return false;
            }
            return true;
        }
        this.router.navigate(["/login"]), { queryParams: { returnUrl: state.url } };
        return false;
    }
}
