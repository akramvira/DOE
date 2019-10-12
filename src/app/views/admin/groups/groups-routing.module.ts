import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistantComponent } from './assistant/assistant.component';
import { OfficeComponent } from './office/office.component';
import { LinesComponent } from './lines/lines.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'مدیریت گروه بندی ها'
    },
    children :[
      {path: '', redirectTo :'assistant', pathMatch:'full'},
      {path: 'assistant', component: AssistantComponent, data:{title:'مدیریت معاونت ها'}},
      {path: 'office', component: OfficeComponent, data:{title:'مدیریت ادارات'}},
      {path: 'lines', component: LinesComponent, data:{title:'مدیریت داخلی ها'}},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
