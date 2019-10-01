import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { AssistantComponent } from './assistant/assistant.component';
import { OfficeComponent } from './office/office.component';

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
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
