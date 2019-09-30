import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users/users.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ModalModule, ModalBackdropComponent } from "ngx-bootstrap";
import { 
  ReactiveFormsModule
} from '@angular/forms';
import { UsersService } from './_services/users.service';
import { RolesComponent } from './roles/roles.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    UserManagementComponent,
    RolesComponent,
    NewUserComponent,
    UsersComponent
    ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    TabsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
providers : [UsersService],
schemas : [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class UserManagementModule { }
