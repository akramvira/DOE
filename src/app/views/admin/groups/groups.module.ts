import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupsRoutingModule}from './groups-routing.module'
import { GroupsComponent } from './groups.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    NgxDatatableModule,ReactiveFormsModule,
    ModalModule.forRoot()

  ]
})
export class GroupsModule { }
