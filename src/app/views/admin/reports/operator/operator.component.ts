import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { WebService } from './web.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'jalali-moment';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ViewEncapsulation } from '@angular/core';
import { SharedService } from '../../../../_services/shared.service';
import { DaterangeComponent } from '../_components/daterange/daterange.component';
import { Globals } from '../../../../_services/globals';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class OperatorComponent implements OnInit  {
  constructor(
    private webService: WebService,
    private authServe: AuthenticationService,
    private sharedService: SharedService,
    private toaster: ToastrService
  ) {}

  public inPerformanceLabel: string[] ;
  public inPerformanceColors = [
    {
      backgroundColor: ["#20a8d8", "#eeeeee"]
    }
  ];

  public inPercentsColors = [
    {
      backgroundColor: ["#a5deb9", "#f86c6b", '#ffda6a']
    }
  ];
  
  public inPerformanceData: number[] = [1, 100];

  public inDetailsPercent: number[] = [1,0,0];
  public outDetailsPercent: number[] = [1,0,0];

  allData: any = [];
  globData: any = [];

  @ViewChild('daterange') dateRange : DaterangeComponent;

  onSelectDate() {
   // this.updateCharts();
  }
  operators :any;
  mainDropdownSettings={};
  ngOnInit() {
    this.webService.getAllOperator().subscribe((data)=>{
      this.operators = data;
    },
    (error)=>{
      this.authServe.handdleAuthErrors(error);
    })

    this.mainDropdownSettings  = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: "بدون اطلاعات",
      limitSelection:1,
      allowSearchFilter: true
    };

  }

  operatorSelect :FormControl = new FormControl();
  loadingData = false;
  phoneNumber;
  data_login;
  data_logout ;
  updateCharts() {
    this.loadingData = true;
  
    let data = {
      id: Globals.fetchData(this.operatorSelect.value,false),
      from: this.dateRange.selectedDateFrom.value,
      to: this.dateRange.selectedDateTo.value
    };

    if(!data.id)
    {
      this.loadingData= false;
      this.toaster.warning('اپراتوری انتخاب نشده است.');
      return;
    }
  
  
   
    this.webService.getOperatorData(data).subscribe(
      data => {
        data = data["data"];
        this.phoneNumber = data['phonenumber'];
        this.data_login = data['data_login'];
        this.data_logout = data['data_logout'];
        
        data = data["data"];
        this.barChartDataIn = [
          { data: [data["in"]["all"]], label: "کل تماس ها" },
          { data: [data["in"]["answer"]], label: " پاسخ داده شده" },
          { data: [data["in"]["noanswer"]], label: " پاسخ داده نشده" },
          { data: [data["in"]["busy"]], label: " مشغول" }
        ];

   
        this.inDetailsPercent = [data["in"]['panswer'], data["in"]['pnoanswer'], data["in"]['pbusy']];
        this.outDetailsPercent = [data["out"]['pbetweenco'], data["out"]['pco'], data["out"]['pmobile']];

        this.barChartDataTimeIn = [
          { data: [data['in']["time"]], label: "مدت زمان کل مکالمات" },
          { data:  [data['in']["avg"]], label: " مدت زمان میانگین مکالمات" },
        ];

        this.barChartDataTimeOut = [
          { data: [data['out']["time"]], label: "مدت زمان کل مکالمات" },
          { data:  [data['out']["avg"]], label: " مدت زمان میانگین مکالمات" },
        ];

        debugger;
        this.inPerformanceData = [
          data["in"]["performance"],
          100 - data["in"]["performance"]
        ];

        this.barChartDataOut = [
          { data: [data["out"]["all"]], label: "کل تماس ها" },
          { data: [data["out"]["co"]], label: "شهری" },
          { data: [data["out"]["betweenco"]], label: "بین شهری" },
          { data: [data["out"]["mobile"]], label: "موبایل" }
        ];


        this.loadingData = false;
      },
      error => {
        this.loadingData = false;
        this.authServe.handdleAuthErrors(error);
      }
    );
  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ["عملکرد کل سیستم"];
  public detailPercentLabelsIn: string[] = [' پاسخ داده شده',' پاسخ داده نشده',' مشغول'];
  public detailPercentLabelsOut: string[] = [' بین شهری',' شهری',' موبایل'];


  public barChartDataIn: any[] = [
    { data: [0], label: "کل تماس ها" },
    { data: [0], label: " پاسخ داده شده" },
    { data: [0], label: " پاسخ داده نشده" },
    { data: [0], label: "مشغول" }
  ];
  public barChartDataTimeIn: any[] = [
    { data: [0], label: "مدت زمان کل مکالمات" },
    { data: [0], label: " مدت زمان میانگین مکالمات" },
  ];

  public barChartDataOut: any[] = [
    { data: [0], label: "کل تماس ها" },
    { data: [0], label: "شهری" },
    { data: [0], label: "بین شهری" },
    { data: [0], label: "موبایل" }
  ];
  public barChartDataTimeOut: any[] = [
    { data: [0], label: "مدت زمان کل مکالمات" },
    { data: [0], label: " مدت زمان میانگین مکالمات" },
  ];
}


