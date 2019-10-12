import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";

import { AdminRoutingModule } from "./admin-routing.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsModule } from "./settings/settings.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ProfileComponent } from "./profile/profile.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Globals } from "../../_services/globals";
import { ModalModule } from "ngx-bootstrap/modal";
import { ChartsModule } from "ng2-charts";
import { ComponentsModule } from './_components/components/components.module';

@NgModule({
  declarations: [AdminComponent, ProfileComponent],
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
    ChartsModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Globals]
})
export class AdminModule {}
