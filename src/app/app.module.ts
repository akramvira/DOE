import { BrowserModule } from '@angular/platform-browser';
import { NgModule , forwardRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import {environment } from "../environments/environment.prod";
import { Globals } from './_services/globals';
import { P403Component } from './views/error/403.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchColumnComponent } from './components/search-column/search-column.component';
import { ExcelService } from './_services/excel.service';
import { BarChartComponent } from './views/admin/_components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './views/admin/_components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './views/admin/_components/line-chart/line-chart.component';

let productionMode = false;

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule,
    ToastrModule.forRoot()
    

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P403Component,
    P500Component,
    LoginComponent

    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass:HashLocationStrategy,
    },
    ExcelService,
    Globals
  ],
  bootstrap: [ AppComponent ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ModalModule
]
})
export class AppModule { }
