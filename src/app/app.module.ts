
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

import * as $ from 'jquery';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { userService } from './user.service';
import { QuotesComponent } from './quotes/quotes.component';
import { DevotionsComponent } from './devotions/devotions.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { ActivityComponent } from './activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewdevotionComponent } from './newdevotion/newdevotion.component';
import { EditdevotionComponent } from './editdevotion/editdevotion.component';




@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        RegisterComponent,
        LoginComponent,
        QuotesComponent,
        DevotionsComponent,
        UsersComponent,
        SettingsComponent,
        ActivityComponent,
        DashboardComponent,
        NewdevotionComponent,
        EditdevotionComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SnotifyModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthGuard,
        userService,
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        SnotifyService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }