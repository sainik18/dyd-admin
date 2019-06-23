import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'full-layout',
  //   pathMatch: 'full',
  // },
  // { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
   //{ path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'Login' },
    children: [
      {
        path: 'welcome',
        //loadChildren: './changelog/changelog.module#ChangeLogModule'
        component: LoginComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'content Views' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
