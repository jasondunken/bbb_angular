import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

import { CookieService } from "ngx-cookie-service";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { UsersComponent } from "./components/users/users.component";
import { ManagementComponent } from "./components/management/management.component";
import { JournalsComponent } from "./components/journals/journals.component";
import { AuthComponent } from "./components/auth/auth.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UsersComponent,
        ManagementComponent,
        JournalsComponent,
        AuthComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [CookieService],
    bootstrap: [AppComponent],
})
export class AppModule {}
