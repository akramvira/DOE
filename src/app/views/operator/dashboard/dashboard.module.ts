import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { SysinfoService} from "../_services/sysinfo.service";
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../_services/authentication.service";

var environment_production = true;

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),

    /*
    HttpClientModule,
    environment_production ?
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }) : []
  */

  ],
  providers : [SysinfoService],
  declarations: [ DashboardComponent ]
})
export class DashboardModule {
  constructor(private authService : AuthenticationService, private router: Router){

  }
}
