import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";
import { Role } from "./models/role.enum";

import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterUserComponent } from "./components/auth/register-user/register-user.component";
import { PasswordResetComponent } from "./components/auth/password-reset/password-reset.component";
import { JournalListComponent } from "./components/journals/journal-list/journal-list.component";
import { JournalComponent } from "./components/journals/journal/journal.component";
import { ManagementComponent } from "./components/management/management.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterUserComponent },
    { path: "password-reset", component: PasswordResetComponent },
    { path: "journals", component: JournalListComponent },
    { path: "journals/:id", component: JournalComponent },
    { path: "manage", component: ManagementComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: "**", redirectTo: "" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
