import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SettingsComponent} from "./settings/settings.component";
import {AdminComponent} from "./admin.component";
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from '../../_services/auth-guard.service';
import { AuthenticationService } from '../../_services/authentication.service';


const routes: Routes = [
      {
        path : '',
        component : AdminComponent,
        redirectTo :'dashboard'
        
      },
      {
        path:'dashboard',
        
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data : {title : 'داشبورد مدیریت', accessName: 'dashboard'},
        canActivate: [AuthGuardService],
        
      },
      {
        path:'settings',
        component : SettingsComponent,
        data : {title : 'تنظیمات اولیه سیستم', accessName: 'setting'},
        canActivate: [AuthGuardService],
      },
      {
        path:'users-management',
        loadChildren: './user-management/user-management.module#UserManagementModule',
        data : {title : 'مدیریت کاربران', accessName: 'users' },
        canActivate: [AuthGuardService]
      } ,
      {
        path:'groups',
        loadChildren: './groups/groups.module#GroupsModule',
        data : {title : 'مدیریت گروه بندی ها', accessName: 'groupExtensions' },
        canActivate: [AuthGuardService]
      },
      {
        path:'reports',
        loadChildren: './reports/reports.module#ReportsModule',
        data : {title : 'گزارشات', accessName: 'reports'},
        canActivate: [AuthGuardService]
      },
      {
        path:'profile',
        component: ProfileComponent,
        data : {title : 'اطلاعات کاربری'}
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers : [AuthenticationService]
})
export class AdminRoutingModule {}
