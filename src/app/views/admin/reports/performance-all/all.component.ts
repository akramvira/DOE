import { Component, OnInit, ViewChild } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { AuthenticationService } from "../../../../_services/authentication.service";
import * as moment from "jalali-moment";
import { FormControl } from "@angular/forms";
import { SharedService } from "../../../../_services/shared.service";
import { DaterangeComponent } from '../_components/daterange/daterange.component';

@Component({
  selector: "app-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"]
})
export class AllComponent implements OnInit {
  constructor(
    private reportServ: ReportsService,
    private authServe: AuthenticationService,
    private sharedService: SharedService
  ) {}

  public inPerformanceLabel: string[]= [' عملکرد موفق', 'عملکرد ناموفق'] ;;
  public inPerformanceColors = [
    {
      backgroundColor: ["#4dbd74", "#eeeeee"]
    }
  ];

  public inPercentsColors = [
    {
      backgroundColor: ["#a5deb9", "#f86c6b", '#ffda6a']
    }
  ];
  public callsBarColors = [
    {
      backgroundColor: ["#009688"]
    },
    {
      backgroundColor: ["#ffc107"]
    }
  ];
  
  public barChartInColors = [
    {
      backgroundColor: "#d1d1d1",
      borderColor: "#d1d1d1",
      borderWidth: 1
    },
    {
      backgroundColor: "#4dbd74",
      borderColor: "#4dbd74",
      borderWidth: 1
    },
    {
      backgroundColor: "#e32234",
      borderColor: "#e32234",
      borderWidth: 1
    },
    {
      backgroundColor: "#ffc107",
      borderColor: "#ffc107",
      borderWidth: 1
    }
  ];

  public barChartOutColors = [
    {
      backgroundColor: "#d1d1d1",
      borderColor: "#d1d1d1",
      borderWidth: 1
    },
    {
      backgroundColor: "#009688",
      borderColor: "#009688",
      borderWidth: 1
    },
    {
      backgroundColor: "#673ab7",
      borderColor: "#673ab7",
      borderWidth: 1
    },
    {
      backgroundColor: "#795548",
      borderColor: "#795548",
      borderWidth: 1
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

  ngOnInit() {
  }


  loadingData = false;
  updateCharts() {
    this.loadingData = true;
    let data = {
      from: this.dateRange.selectedDateFrom.value,
      to: this.dateRange.selectedDateTo.value
    };
    this.reportServ.getSystemPerformance(data).subscribe(
      data => {
        data = data["data"];
        this.allData = data;

        this.barChartDataIn = [
          { data: [data["in"]["all"]], label: "کل تماس ها" },
          { data: [data["in"]["answer"]], label: " پاسخ داده شده" },
          { data: [data["in"]["noanswer"]], label: " پاسخ داده نشده" },
          { data: [data["in"]["busy"]], label: " مشغول" }
        ];

        this.inDetailsPercent = [data["in"]['panswer'], data["in"]['pnoanswer'], data["in"]['pbusy']];
        this.outDetailsPercent = [data["out"]['pbetweenco'], data["out"]['pco'], data["out"]['pmobile']];

        this.barchartCallsAll = [
          { data: [data['in']["time"]], label: "  کل مکالمات ورودی" },
          { data: [data['out']["time"]], label: "   کل مکالمات خروجی" },
        ];

        this.barchartCallsAvg = [
          { data:  [data['in']["avg"]], label: "   میانگین مکالمات ورودی" },
          { data:  [data['out']["avg"]], label: "   میانگین مکالمات خروجی" },
        ];

        
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
  public barchartCallsAll: any[] = [
    { data: [0], label: "مدت زمان کل مکالمات" },
    { data: [0], label: " مدت زمان میانگین مکالمات" },
  ];

  public barChartDataOut: any[] = [
    { data: [0], label: "کل تماس ها" },
    { data: [0], label: "شهری" },
    { data: [0], label: "بین شهری" },
    { data: [0], label: "موبایل" }
  ];
  public barchartCallsAvg: any[] = [
    { data: [0], label: "مدت زمان کل مکالمات" },
    { data: [0], label: " مدت زمان میانگین مکالمات" },
  ];
}
