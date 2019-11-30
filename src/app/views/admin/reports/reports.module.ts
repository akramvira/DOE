import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportsRoutingModule } from "./reports-routing.module";
import { AllComponent } from "./performance-all/all.component";
import { QueuesComponent } from "./queues/queues.component";
import { CallsDetailsComponent } from "./calls-details/calls-details.component";
import { GroupsBillsComponent } from "./bills-groups/groups-bills.component";
import { ReportsComponent } from "./reports.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { OperatorComponent } from "./operator/operator.component";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";
import { SearchColumnComponent } from "../../../components/search-column/search-column.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ComponentsModule } from "../_components/components/components.module";
import { PerformanceL1Component } from './performance-l1/performance-l1.component';
import { PerformanceL2Component } from './performance-l2/performance-l2.component';
import { PerformanceL3Component } from './performance-l3/performance-l3.component';
import { CompareAllComponent } from './compare-all/compare-all.component';
import {NgxPrintModule} from 'ngx-print';
import { SelectItemComponent } from './_components/select-item/select-item.component';
import { DaterangeComponent } from './_components/daterange/daterange.component';


@NgModule({
  declarations: [
    AllComponent,
    QueuesComponent,
    CallsDetailsComponent,
    GroupsBillsComponent,
    ReportsComponent,
    OperatorComponent,
    SearchColumnComponent,
    PerformanceL1Component,
    PerformanceL2Component,
    PerformanceL3Component,
    CompareAllComponent,
    SelectItemComponent,
    DaterangeComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TabsModule,
    NgxDatatableModule,
    ChartsModule,
    DpDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ComponentsModule,
    NgxPrintModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule {}
