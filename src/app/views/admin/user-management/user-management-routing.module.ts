import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UserManagementComponent } from './user-management.component';
import {UsersComponent} from "./users/users.component";

import { RolesComponent } from './roles/roles.component';
import { AuthGuardService } from '../../../_services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent ,
    data: {
      title: 'مدیریت کاربران'
    },
    children:[
      {
        path : '',
        redirectTo : 'users',
        pathMatch :'full'
      },
      {
        path :"new-user",
        component:  NewUserComponent,
        data: {
          title: ' ایجاد کاربر جدید'
        }
      },
      {
        path :"users",
        component:  UsersComponent,
        data: {
          title: 'نمایش کاربران'
        }
        },
      
      {
        path :"roles",
        component:  RolesComponent,
        data: {
          title: 'مقام ها'
          , accessName: 'userRols'},
          canActivate: [AuthGuardService],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
