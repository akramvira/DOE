import { Component, OnInit } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { AuthenticationService } from "../../../../_services/authentication.service";
import * as moment from "jalali-moment";
import { FormControl } from "@angular/forms";
import { SharedService } from "../../../../_services/shared.service";

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

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");
  datePickerConfig = {};

  onSelectDate() {
    this.updateCharts();
  }

  ngOnInit() {
    this.setDate();
    //this.updateCharts();
  }

  minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");

  setDate() {
    if (this.sharedService.minMaxTime.value) {
      this.minDate = this.sharedService.minMaxTime.value.min;
      this.maxDate = this.sharedService.minMaxTime.value.max;

      this.selectedDateFrom.setValue(this.minDate);
      this.selectedDateTo.setValue(this.maxDate);

      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.minDate, "jYYYY,jMM,jDD"),
        max: moment(this.maxDate, "jYYYY,jMM,jDD"),
        showGoToCurrent: true,
        hideOnOutsideClick: true,
        showNearMonthDays: true
      };
    }

    this.sharedService.minMaxTime.subscribe(data => {
      this.minDate = data["min"];
      this.maxDate = data["max"];

      this.selectedDateFrom.setValue(this.minDate);
      this.selectedDateTo.setValue(this.maxDate);
      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.minDate, "jYYYY,jMM,jDD"),
        max: moment(this.maxDate, "jYYYY,jMM,jDD"),
        showGoToCurrent: true,
        hideOnOutsideClick: true,
        showNearMonthDays: true
      };
    });
  }

  loadingData = false;
  updateCharts() {
    this.loadingData = true;
    let data = {
      from: this.selectedDateFrom.value,
      to: this.selectedDateTo.value
    };
    this.reportServ.getSystemPerformance(data).subscribe(
      data => {
        data = data["data"];
        this.allData = data;

        debugger;

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
          { data: [data['in']["time"]], label: "مدت زمان کل مکالمات" },
          { data:  [data['in']["avg"]], label: " مدت زمان میانگین مکالمات" },
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
