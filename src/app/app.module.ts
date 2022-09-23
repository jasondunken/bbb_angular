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
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { JournalListComponent } from './components/journals/journal-list/journal-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { JournalComponent } from './components/journals/journal/journal.component';
import { EntryComponent } from './components/journals/entry/entry.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UsersComponent,
        ManagementComponent,
        JournalsComponent,
        AuthComponent,
        JournalListComponent,
        LoginComponent,
        PasswordResetComponent,
        RegisterUserComponent,
        JournalComponent,
        EntryComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
