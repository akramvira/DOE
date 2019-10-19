import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../user-management/_services/users.service';
import { ReportsService } from '../_service/reports.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-calls-details',
  templateUrl: './calls-details.component.html',
  styleUrls: ['./calls-details.component.scss']
})
export class CallsDetailsComponent implements OnInit {
  page = new Page();
  //rows = new Array<CorporateEmployee>();
  
    data : any[];
    storedData :any = []
  
  constructor(  
    private reportServ : ReportsService,
    private authServ : AuthenticationService,
    private toastr: ToastrService ) { 
    
  }

  ngOnInit() {
      this.reportServ.getCallsDetails().subscribe(
        (data)=>{
          console.log(data);
          this.showData(data);
        //this.setPage(data); 
      },
      (error)=>{
        this.authServ.handdleAuthErrors(error);
      }
      );

  

  }

  showData(data){
    this.data = data['data'];
    this.storedData = data['data'];
  
    this.page.pageNumber = 1;
    this.page.size = data['per_page'];
    this.page.totalElements= data['total'] ;
    this.page.totalPages= data['last_page'];
  }


  filterData(){
    
  //   this.tempData = JSON.parse(JSON.stringify(this.storedData));
  // let columnName = event.currentTarget.id;
  
  // const val = event.target.value.toLowerCase();

  // this.filter[columnName] = val;



  // const filteredData = this.tempData.filter(function(d) {
  //   return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
  // });

  // this.data= filteredData;
  // this.myTable.offset = 0;
  
    this.filter.from = this.selectedDateFrom.value;
    this.filter.to = this.selectedDateTo.value;
      

    this.reportServ.filterCallsDetails(this.filter).subscribe(
      (data)=>{
      this.showData(data);
      },
      (error)=>{});
  }
  


  //pagination

  setPage(pageInfo){
    debugger;
    this.page.pageNumber = pageInfo.offset+1;

    this.filterData();
    //this.page.size= pageInfo[''];
   // this.page.totalElements=100;
   // this.page.totalPages=10;

    //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      //this.page = {size:2,};//pagedData.page;
      //this.users = 4;//pagedData.data;
   // });
  }
 

  @ViewChild(DatatableComponent) myTable: DatatableComponent;
  tempData : any = [];
  dateObject = moment('1395-11-22','jYYYY,jMM,jDD');
  selectedDateFrom = new FormControl('');
  selectedDateTo = new FormControl('');
  disposition = new FormControl('all');
  src = new FormControl('');
  dest = new FormControl('');

  datePickerConfig = {
    format: 'jYYYY/MM/DD',
    theme: 'dp-material',
    unSelectOnClick : true,
    showGoToCurrent :true,
    drops : 'left'
}


  filter = {
    from: this.selectedDateFrom.value,
    to:this.selectedDateTo.value,
    dst:'',
    src:'',
    disposition:'',
  }


onSelectDate(){
  this.filterData();
}

get getData(){
  return this.storedData;
}
  
set setData(filteredData){
  this.data = filteredData;
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
