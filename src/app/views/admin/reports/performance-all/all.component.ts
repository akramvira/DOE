import { Component, OnInit } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { AuthenticationService } from "../../../../_services/authentication.service";
import * as moment from "jalali-moment";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"]
})
export class AllComponent implements OnInit {
  constructor(
    private reportServ: ReportsService,
    private authServe: AuthenticationService
  ) {}

  public inPerformanceLabel: string[] = ["عملکرد کلی سیستم", " "];
  public inPerformanceColors = [
    {
      backgroundColor: ["#20a8d8", "#eeeeee"]
    }
  ];

  public inPerformanceData: number[] = [1, 100];

  allData: any = [];
  globData: any = [];

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");
  datePickerConfig = {
    format: "YYYY/MM/DD",
    theme: "dp-material"
  };

  onSelectDate() {
    
    this.updateCharts();
  }

  ngOnInit() {
    this.updateCharts();
  }


  updateCharts(){
    let data = {
      from: this.selectedDateFrom.value,
      to: this.selectedDateTo.value
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
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ["عملکرد کل سیستم"];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartDataIn: any[] = [
    { data: [0], label: "کل تماس ها" },
    { data: [0], label: " پاسخ داده شده" },
    { data: [0], label: " پاسخ داده نشده" },
    { data: [0], label: "مشغول" }
  ];

  public barChartDataOut: any[] = [
    { data: [0], label: "کل تماس ها" },
    { data: [0], label: "شهری" },
    { data: [0], label: "بین شهری" },
    { data: [0], label: "موبایل" }
  ];
}
