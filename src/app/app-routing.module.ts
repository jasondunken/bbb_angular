import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CatsComponent } from "./components/cats/cats.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
    { path: "cats", component: CatsComponent },
    { path: "users", component: UsersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
