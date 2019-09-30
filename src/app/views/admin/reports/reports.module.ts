import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportsRoutingModule } from "./reports-routing.module";
import { GroupsComponent } from "./performance-groups/groups.component";
import { AllComponent } from "./performance-all/all.component";
import { QueuesComponent } from "./queues/queues.component";
import { CallsDetailsComponent } from "./calls-details/calls-details.component";
import { GroupsBillsComponent } from "./bills-groups/groups-bills.component";
import { LinesBillsComponent } from "./bills-lines/lines-bills.component";
import { LinesComponent } from "./performance-lines/lines.component";
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
import { LineChartComponent } from "../_components/line-chart/line-chart.component";
import { DoughnutChartComponent } from "../_components/doughnut-chart/doughnut-chart.component";
import { BarChartComponent } from "../_components/bar-chart/bar-chart.component";
import { ComponentsModule } from "../_components/components/components.module";

@NgModule({
  declarations: [
    GroupsComponent,
    AllComponent,
    QueuesComponent,
    CallsDetailsComponent,
    GroupsBillsComponent,
    LinesBillsComponent,
    LinesComponent,
    ReportsComponent,
    OperatorComponent,
    SearchColumnComponent
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
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule {}
