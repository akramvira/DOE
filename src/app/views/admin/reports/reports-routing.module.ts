import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './performance-all/all.component';
import { CallsDetailsComponent } from './calls-details/calls-details.component';
import { QueuesComponent } from './queues/queues.component';
import { GroupsBillsComponent } from './bills-groups/groups-bills.component';
import { GroupsComponent } from './performance-groups/groups.component';
import { LinesBillsComponent } from './bills-lines/lines-bills.component';
import { LinesComponent } from './performance-lines/lines.component';
import { ReportsComponent } from './reports.component';
import { AuthGuardService } from '../../../_services/auth-guard.service';
import { OperatorComponent } from './operator/operator.component';

const routes: Routes = [
  {   path: '',
      data:{title: 'گزارشات'},
      component: ReportsComponent,
      children:[ 
          {path: '', redirectTo :'all', pathMatch :'full' },
          {path: 'all', component:AllComponent, data:{title:'عملکرد کلی سیستم'}},
          {path: 'lines', component:LinesComponent, data:{title:'عملکرد داخلی ها'}},
          {path: 'lines-bills', component:LinesBillsComponent, data:{title:'قبوض داخلی ها'}},
          {path: 'groups', component:GroupsComponent, data:{title:'گروه ها'}},
          {path: 'groups-bills', component:GroupsBillsComponent, data:{title:'قبوض گروه ها'}},
          {path: 'queues', component:QueuesComponent, data:{title:'وضعیت صف ها', accessName: 'queues' },
          canActivate: [AuthGuardService]},
          {path: 'operator', component:OperatorComponent, data:{title:'عملکرد اپراتور', accessName: 'operators' },
          canActivate: [AuthGuardService]},
          {path: 'calls-details', component:CallsDetailsComponent, data:{title:'ریز مکالمات سیستم'}},
          {path: 'all', component:AllComponent, data:{title:'عملکرد کلی سیستم'}}
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
