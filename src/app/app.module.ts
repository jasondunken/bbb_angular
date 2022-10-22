import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { UsersComponent } from "./components/users/users.component";
import { ManagementComponent } from "./components/management/management.component";
import { JournalsComponent } from "./components/journals/journals.component";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { JournalListComponent } from "./components/journals/journal-list/journal-list.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { PasswordResetRequestComponent } from "./components/auth/password-reset-request/password-reset-request.component";
import { RegisterUserComponent } from "./components/auth/register-user/register-user.component";
import { JournalComponent } from "./components/journals/journal/journal.component";
import { EntryComponent } from "./components/journals/entry/entry.component";

import { IfRolesDirective } from "./directives/if-roles.directive";
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { ValidateUserComponent } from './components/auth/validate-user/validate-user.component';

@NgModule({
    declarations: [
        IfRolesDirective,
        AppComponent,
        HeaderComponent,
        UsersComponent,
        ManagementComponent,
        JournalsComponent,
        AuthComponent,
        JournalListComponent,
        LoginComponent,
        PasswordResetRequestComponent,
        RegisterUserComponent,
        JournalComponent,
        EntryComponent,
        PasswordResetComponent,
        ValidateUserComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
    ],
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
