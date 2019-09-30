import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../_service/reports.service';
import * as moment from 'jalali-moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lines-bills',
  templateUrl: './lines-bills.component.html',
  styleUrls: ['./lines-bills.component.scss']
})
export class LinesBillsComponent implements OnInit  {

  groups = new Array();
  bills :any;
  page = new Page();

  constructor(private reportsServ : ReportsService) { }
  ngOnInit() {
    this.reportsServ.getExtensionsAndGroups()
    .subscribe(
      (data)=>{ 
        let groupesData = new Array();
        for(var i in data['groups']){
          groupesData.push(data['groups'][i]);
        }
        this.groups = groupesData;
        
      }, 
      (error)=>{console.log(error)}
      );

      this.reportsServ.getGroupsBills({})
      .subscribe(
        (data)=>{ 
          let billsData = new Array();
          for(var i in data){
      //      debugger;
          if(i == 'all') continue;
            data['groupId'] = i;
            for(let j in data[i])
              billsData.push({groupId : j, ...data[i][j]});
          }

          //debugger;
          this.bills = billsData;

          this.page.pageNumber = 0;
          this.page.size = 20;
        
          this.setPage({ offset: 0 });
    
          this.page.pageNumber=1;
          this.page.size=10;
          this.page.totalElements=100;
          this.page.totalPages=10;
        }, 
        (error)=>{console.log(error)}
        )
  
  }

  setActiveRow(){}
  onActivate(event){}

 setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;

    this.page.size=10;
    this.page.totalElements=100;
    this.page.totalPages=10;

    //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      //this.page = {size:2,};//pagedData.page;
      //this.users = 4;//pagedData.data;
   // });
  }


  dateObject = moment('1395-11-22','jYYYY,jMM,jDD');
  selectedDate = new FormControl('');

  datePickerConfig = {
    format: 'YY/M/D',
    allowMultiSelect :true,
    theme: 'dp-material'
}

@ViewChild('billsTable') table: any;
toggleExpandGroup(group) {
  console.log('Toggled Expand Group!', group);
  this.table.groupHeader.toggleExpandGroup(group);
}

onDetailToggle(event) {
  console.log('Detail Toggled', event);
}



}
class Page {
  //The number of elements in the page
  size: number = 0;
  //The total number of elements
  totalElements: number = 0;
  //The total number of pages
  totalPages: number = 0;
  //The current page number
  pageNumber: number = 0;
}
