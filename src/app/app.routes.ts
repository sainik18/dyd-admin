import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const AppRoutes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
imports: [RouterModule.forRoot(AppRoutes)],
exports: [RouterModule]
})

export class AppRoutingModule { }