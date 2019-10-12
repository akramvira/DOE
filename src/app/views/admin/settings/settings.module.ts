import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import { TabsModule } from 'ngx-bootstrap/tabs';

import { 
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    FormGroup
 } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressbarModule } from 'ngx-bootstrap';
import { ComponentsModule } from '../_components/components/components.module';


@NgModule({
  declarations: [
    SettingsComponent,
    FileUploadComponent

  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    ProgressbarModule.forRoot(),
    ComponentsModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FileUploadComponent]
  
})
export class SettingsModule {

 }
