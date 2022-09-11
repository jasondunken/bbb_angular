import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CatsComponent } from "./components/cats/cats.component";
import { UsersComponent } from "./components/users/users.component";
import { JournalsComponent } from "./components/journals/journals.component";
import { ManagementComponent } from "./components/management/management.component";

const routes: Routes = [
    { path: "cats", component: CatsComponent },
    { path: "users", component: UsersComponent },
    { path: "journals", component: JournalsComponent },
    { path: "manage", component: ManagementComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
