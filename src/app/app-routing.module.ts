import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CatsComponent } from "./components/cats/cats.component";

const routes: Routes = [{ path: "cats", component: CatsComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
