import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ReportsService } from '../_service/reports.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'jalali-moment';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class OperatorComponent implements OnInit {

  constructor(
    private reportServ : ReportsService,
    private authServ : AuthenticationService,
    ) { }
  page = new Page();
  //rows = new Array<CorporateEmployee>();
  
  data : any[];
  storedData :any = []
  operatorsData = [];
  @ViewChild(DatatableComponent) myTable: DatatableComponent;
  tempData : any = [];
  
  filter = {
    from:'',
    to:'',
    dst:'',
    src:'',
    disposition:'',
  }

  dateObject = moment('1395-11-22','jYYYY,jMM,jDD');

  timeType = 'fully'; 
  timeFilter = new FormGroup({
    from : new FormControl(''),
    to : new FormControl('')
  }
  );

  //charts-----------------------------------------------------
  public pieChartLabels: string[] = ['پاسخ داده نشده', 'پاسخ داده شده'];
  public pieChartData: number[] = [1,100];
  public pieChartType = 'pie';
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public lineChartData: Array<any> = [
    {data: new Array(20), label: 'همه'},
    {data:  new Array(20), label: 'پاسخ داده شده'},
    {data:  new Array(20), label: 'پاسخ داده نشده'}
  ];
  
  public lineChartLabels: Array<any>  = 
  ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00', '24:00'
   ];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    loneJoin : "miter"
  };
  public lineChartColours: Array<any> = [
    { 
      backgroundColor: 'rgba(255, 161, 181, 0.1)',
      borderColor: 'rgba(255, 161, 181, 0.4)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
     backgroundColor: 'rgba(77, 189, 116, 0.1)',
      borderColor: 'rgba(77, 189, 116, 0.4)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { 
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
      borderColor: 'rgba(255, 193, 7, 0.4)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { 
      backgroundColor: 'rgba(32, 168, 216, 0.1)',
      borderColor: 'rgba(32, 168, 216, 0.4)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
    public lineChartLegend = true;
    public lineChartType = 'line';
//charts-----------------------------------------------------

  showData(data){
    this.operatorsData = data['data'];
    this.storedData = data['data'];
  
    this.page.pageNumber = 1;
    this.page.size = data['per_page'];
    this.page.totalElements= data['total'] ;
    this.page.totalPages= data['last_page'];
  }
  filterData(){

    debugger;

    this.filter['id'] = this.selectedOperatorId;

    if(this.timeType == 'fully')
      this.reportServ.getOperatorPefrormance(this.selectedOperatorId).subscribe(
        (data)=>{
        this.showData(data);
        },
        (error)=>{});

    else if(this.timeType == 'monthly')
    this.reportServ.getOperatorMonthlyPefrormance(this.filter).subscribe(
      (data)=>{
      this.showData(data);
      },
      (error)=>{});
    
      else {
        this.reportServ.getOperatorPefrormanceWithDate(this.filter).subscribe(
          (data)=>{
          this.showData(data);
          },
          (error)=>{});
      }
  }
  

  //pagination
  setPage(pageInfo){
    
    this.page.pageNumber = pageInfo.offset;

    this.page.size= pageInfo[''];
    this.page.totalElements=100;
    this.page.totalPages=10;

    //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      //this.page = {size:2,};//pagedData.page;
      //this.users = 4;//pagedData.data;
   // });
  }
 


  FilterData(event) {
    
  this.tempData = JSON.parse(JSON.stringify(this.storedData));
  let columnName = event.currentTarget.id;
  
  const val = event.target.value.toLowerCase();

  this.filter[columnName] = val;


  this.filterData();

  const filteredData = this.tempData.filter(function(d) {
    
    return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
  });

  this.operatorsData= filteredData;
  // this.myTable.offset = 0;
  }

 setActiveRow(index){

 }
  

  datePickerConfig = {
    format: 'YY/M/D',
    allowMultiSelect :true,
    theme: 'dp-material',
    unSelectOnClick : true,
    showGoToCurrent :true
}

onSelectDateFrom(){
  debugger;
}

onSelectDateTo(){
  debugger;
}
get getData(){
  return this.storedData;
}
  
set setData(filteredData){
  this.operatorsData = filteredData;
}

  
operators :any = [];
targetOperator : any ;

  ngOnInit() {
    this.reportServ.getAllOperator().subscribe((data)=>{
      this.operators = data;
    },
    (error)=>{
      this.authServ.handdleAuthErrors(error);
    })
  }

  onActivate(event) {
    if(event.type == 'click') {
      this.selectedOperatorId = event.row.id;

      this.reportServ.getOperatorData(this.selectedOperatorId).subscribe(
        (data)=>{
          
          debugger;
          this.targetOperator = data;
          

    //console.log(this.targetOperator );
    //debugger;
          data =data['detail'];

         // debugger;
          this.pieChartData = [data['answer'], data['noanswer']];
          this.barChartData  = [
            {data: [data['all']] , label: 'همه'},
            {data: [data['answer']] , label: 'پاسخ داده شده'},
            {data: [data['noanswer']] , label: 'پاسخ داده نشده'}
          ];
          

        },
        (error)=>{}
        );
    }
  }

  selectedOperatorId :any = 0;




    // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = 
  ['1398/1/4 - 1396/3/1'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [0], label: 'کل'},
    {data: [0], label: ' پاسخ داده شده'},
    {data: [0], label: ' پاسخ داده نشده'}
  ];


  filterChartsByTime(){
    let filterData = this.timeFilter.getRawValue();
    filterData['id'] = this.selectedOperatorId;
    
    debugger;
    this.reportServ.getOperatorPefrormanceWithDate(filterData).subscribe(
      (data)=>{
        debugger;
      },
      (error)=>{
        this.authServ.handdleAuthErrors(error);
      })
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
