import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import {SettingsComponent} from "./settings/settings.component";
import {AdminRoutingModule} from "./admin-routing.module";

import { 
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileComponent } from './profile/profile.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Globals } from '../../_services/globals';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BarChartComponent } from './_components/bar-chart/bar-chart.component';
import { LineChartComponent } from './_components/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './_components/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './_components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    SettingsModule,
    ProgressbarModule,
    NgxDatatableModule,
    ModalModule,
    ChartsModule
  
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers : [Globals]
})
export class AdminModule { }
