import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "./components/users/users.component";
import { ManagementComponent } from "./components/management/management.component";
import { JournalListComponent } from "./components/journals/journal-list/journal-list.component";

const routes: Routes = [
    { path: "users", component: UsersComponent },
    { path: "journals", component: JournalListComponent },
    { path: "manage", component: ManagementComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
