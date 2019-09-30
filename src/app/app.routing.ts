import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';



export const routes: Routes = [
    {
    path: '',
    redirectTo: '/admin',
    /*canActivate : [AuthGuardService],*/
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    data: {
      title: 'پنل مدیریت'
    },
    loadChildren: './views/admin/admin.module#AdminModule'
  },
  {
    path: 'operator',
    data: {
      title: 'پنل مدیریت'
    },
    loadChildren: './views/operator/operator.module#OperatorModule'
  },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'صفحه 404'
    }
  },
  {
    path: '403',
    component: P403Component,
    data: {
      title: 'صفحه 403'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'صفحه 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'صفحه ورود'
    }
  },

  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
