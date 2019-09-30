import { Component, OnInit } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { AuthenticationService } from '../../../../_services/authentication.service';
import * as moment from 'jalali-moment';

@Component({
  selector: "app-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"]
})
export class AllComponent implements OnInit {
  constructor(
    private reportServ: ReportsService,
    private authServe : AuthenticationService
    ) {
    }
  
  public pieChartLabels: string[] = ["پاسخ داده نشده", "پاسخ داده شده"];
  public pieChartData: number[] = [1, 100];

  allData: any = [];
  ngOnInit() {
    this.reportServ.getSystemPerformance().subscribe(
      data => {
        this.pieChartData = [data["answer"], data["noanswer"]];
        this.pieChartLabels = [
          "پاسخ داده شده ", 
          "پاسخ داده نشده" 
        ];
        this.allData = data;

        this.barChartData = [
          { data: [1000], label: "کل" },
          { data: [343], label: " پاسخ داده شده" },
          { data: [600], label: " پاسخ داده نشده" }
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

  public barChartData: any[] = [
    { data: [0], label: "کل" },
    { data: [0], label: " پاسخ داده شده" },
    { data: [0], label: " پاسخ داده نشده" }
  ];


}
