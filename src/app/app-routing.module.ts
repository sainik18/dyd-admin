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
    data: { title: 'Login' },
    children: [
      {
        path: '',
        //loadChildren: './changelog/changelog.module#ChangeLogModule'
        component: DashboardComponent
      },
      {
        path: 'newdevotion',
        component: NewdevotionComponent
      },
      {
        path: 'editdevotion/:id',
        component: EditdevotionComponent
      },
      {
        path: 'devotion',
        //loadChildren: './changelog/changelog.module#ChangeLogModule'
        component: DevotionsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
    //component: RegisterComponent,
    //data: { title: 'content Views' }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
