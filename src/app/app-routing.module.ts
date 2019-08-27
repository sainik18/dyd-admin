import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuotesComponent } from './quotes/quotes.component';
import { DevotionsComponent } from './devotions/devotions.component';
import { UsersComponent } from './users/users.component';
import { ActivityComponent } from './activity/activity.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewdevotionComponent } from './newdevotion/newdevotion.component';
import { EditdevotionComponent } from './editdevotion/editdevotion.component';
import { AuthResolver } from './auth.resolver';
import { TestimoniesComponent } from './testimonies/testimonies.component';

const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'full-layout',
  //   pathMatch: 'full',
  // },
  // { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
   //{ path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'content Views' }
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: '',
        component: DashboardComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'newdevotion',
        component: NewdevotionComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'editdevotion/:id',
        component: EditdevotionComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'devotion',
        component: DevotionsComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'testimonies',
        component: TestimoniesComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'users',
        component: UsersComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'activity',
        component: ActivityComponent,
        resolve: { message: AuthResolver}
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve: { message: AuthResolver}
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
