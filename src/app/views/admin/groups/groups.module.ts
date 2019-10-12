import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupsRoutingModule } from "./groups-routing.module";
import { GroupsComponent } from "./groups.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { AssistantComponent } from "./assistant/assistant.component";
import { OfficeComponent } from "./office/office.component";
import { LinesComponent } from "./lines/lines.component";

@NgModule({
  declarations: [
    GroupsComponent,
    AssistantComponent,
    OfficeComponent,
    LinesComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GroupsModule {}
