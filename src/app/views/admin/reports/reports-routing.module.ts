import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './performance-all/all.component';
import { CallsDetailsComponent } from './calls-details/calls-details.component';
import { QueuesComponent } from './queues/queues.component';
import { GroupsBillsComponent } from './bills-groups/groups-bills.component';
import { ReportsComponent } from './reports.component';
import { AuthGuardService } from '../../../_services/auth-guard.service';
import { OperatorComponent } from './operator/operator.component';
import { PerformanceL1Component } from './performance-l1/performance-l1.component';
import { PerformanceL2Component } from './performance-l2/performance-l2.component';
import { PerformanceL3Component } from './performance-l3/performance-l3.component';
import { CompareAllComponent } from './compare-all/compare-all.component';

const routes: Routes = [
  {   path: '',
      data:{title: 'گزارشات'},
      component: ReportsComponent,
      children:[ 
          {path: '', redirectTo :'all', pathMatch :'full' },
          {path: 'all', component:AllComponent, data:{title:'عملکرد کلی سیستم'}},
          {path: 'performance-l1', component:PerformanceL1Component, data:{title:'عملکرد معاونت ها'}},
          {path: 'performance-l2', component:PerformanceL2Component, data:{title:'عملکرد ادارات '}},
          {path: 'performance-l3', component:PerformanceL3Component, data:{title:'عملکرد داخلی ها '}},
          {path: 'comapre-all', component:CompareAllComponent, data:{title:' مقایسه کلی '}},
          {path: 'groups-bills', component:GroupsBillsComponent, data:{title:'قبوض گروه ها'}},
          {path: 'queues', component:QueuesComponent, data:{title:'وضعیت صف ها', accessName: 'queues' },
          canActivate: [AuthGuardService]},
          {path: 'operator', component:OperatorComponent, data:{title:'عملکرد اپراتور', accessName: 'operators' },
          canActivate: [AuthGuardService]},
          {path: 'calls-details', component:CallsDetailsComponent, data:{title:'ریز مکالمات سیستم'}},

          
         
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
