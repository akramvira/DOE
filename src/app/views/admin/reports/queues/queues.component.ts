import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../user-management/_services/users.service';
import { ReportsService } from '../_service/reports.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormControl } from '@angular/forms';
import * as moment from 'jalali-moment';
import { DaterangeComponent } from '../_components/daterange/daterange.component';

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class QueuesComponent implements OnInit{
  page = new Page();
  //rows = new Array<CorporateEmployee>();
  
public barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public timesBarChartLabels: any[] ;
public serviceLevelBarChartLabels: any[] ;
public callsBarChartLabels: any[] ;
public barChartType = 'bar';
public barChartLegend = true;

public timesBarChartData: any[] = [];
public callsBarChartData: any[] = [];
public serviceLevelbarChartData: any[] = [];

    queueData : any[];
    storedData :any = []
  
  constructor(  
    private reportServ : ReportsService,
    private authServ : AuthenticationService,
    private toastr: ToastrService ) { 
    
  }

  chartCallsData : any;
  chartTimeData : any;
  chartServiceLevelData : any;
  @ViewChild('daterange') daterange :DaterangeComponent;

  ngOnInit() {
    
    let data = {
      from : this.daterange.selectedDateFrom.value,
      to : this.daterange.selectedDateTo.value
    }
      this.reportServ.gerChartsData(data).subscribe(
        (data)=>{
          debugger;
          data=data['data'];
          let arrayData = [];
          for(let i in data ){
            arrayData.push({ id: data[i]['id'],
             name:data[i]['name'] ,
             ...data[i]['data'], agents: data[i]['agents'] });
          }

          this.queueData = arrayData;
        //this.setPage(data); 



        //time chart-----------------------------------
        this.chartTimeData = data;
        let chartData = [
          {data:[], label: 'مدت زمان انتظار'},
          {data:[], label: 'مدت زمان مکالمه'},
          ];
        let chartLabels = [];

        for(let item in this.chartTimeData ){
          chartLabels.push(item);
          chartData[0].data.push( parseInt(this.chartTimeData[item]['holdtime']));
          chartData[1].data.push(  parseInt(this.chartTimeData[item]['talktime']));
        }

        this.timesBarChartLabels = chartLabels
        this.timesBarChartData = chartData;

        ///--/time chart-----------------------------------



        //answer no answer data--------------------
          
        this.chartCallsData = data;

         chartData = [
          {data:[], label: 'پاسخ داده شده'},
          {data:[], label: 'پاسخ داده نشده'},
          ];
         chartLabels = [];

        for(let item in this.chartCallsData ){
          chartLabels.push(item);
          chartData[0].data.push( parseInt(this.chartCallsData[item]['answered']));
          chartData[1].data.push(  parseInt(this.chartCallsData[item]['unanswered']));
        }
        this.callsBarChartLabels = chartLabels
        this.callsBarChartData = chartData;
        //-----------------------------------



        //---performance----------------------------------
         chartData = [
          {data:[], label: 'درصد سرویس دهی'},
          ];
         chartLabels = [];

        for(let item in data ){
          chartLabels.push(item);
          chartData[0].data.push( parseInt(data[item]));
        }
        

        this.serviceLevelBarChartLabels = chartLabels
        this.serviceLevelbarChartData = chartData;
        //---//performance----------------------------------
      },
      (error)=>{
        this.authServ.handdleAuthErrors(error);
      }
      );


  }
  @ViewChild('queuesTable') table: any;

 toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  filterData(){
    
    this.filter.from = this.selectedDateFrom.value;
    this.filter.to = this.selectedDateTo.value;
      

    // this.reportServ.filterCallsDetails(this.filter).subscribe(
    //   (data)=>{
    //   this.showData(data);
    //   },
    //   (error)=>{});
  }
  

  onDetailToggle(event){}
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
  FilterData(event) {
    
  this.tempData = JSON.parse(JSON.stringify(this.storedData));
  let columnName = event.currentTarget.id;
  
  const val = event.target.value.toLowerCase();

  this.filter[columnName] = val;


  this.filterData();

  // const filteredData = this.tempData.filter(function(d) {
  //   return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
  // });

  // this.data= filteredData;
  // this.myTable.offset = 0;
  }

  

onSelectDate(){
  this.filterData();
}

get getData(){
  return this.storedData;
}
  
set setData(filteredData){
  this.queueData = filteredData;
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