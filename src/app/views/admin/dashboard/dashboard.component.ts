import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { SysinfoService } from "./_services/sysinfo.service";

import { ToastrService } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { interval } from "rxjs";
import { Toast } from "ngx-toastr";
import "chartjs-plugin-labels";
import { ExcelService } from "../../../_services/excel.service";

@Component({
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  radioModel: string = "Month";

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: "Current"
    },
    {
      data: this.mainChartData2,
      label: "Previous"
    },
    {
      data: this.mainChartData3,
      label: "BEP"
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: "index",
      position: "nearest",
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor
          };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value: any) {
              return value.charAt(0);
            }
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250
          }
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    {
      // brandInfo
      backgroundColor: hexToRgba(getStyle("--info"), 10),
      borderColor: getStyle("--info"),
      pointHoverBackgroundColor: "#fff"
    },
    {
      // brandSuccess
      backgroundColor: "transparent",
      borderColor: getStyle("--success"),
      pointHoverBackgroundColor: "#fff"
    },
    {
      // brandDanger
      backgroundColor: "transparent",
      borderColor: getStyle("--danger"),
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = "line";

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "Facebook"
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: "Twitter"
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "LinkedIn"
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: "Google+"
    }
  ];

  public brandBoxChartLabels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.1)",
      borderColor: "rgba(255,255,255,.55)",
      pointHoverBackgroundColor: "#fff"
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = "line";

  // system info Chart
  public sysInfoChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public sysInfoChartLabels: string[] = ["value"];
  public sysInfoChartType = "line";
  public sysInfoChartLegend = true;

  Memory: number = 0; // this.random(0,100);
  swap: number = 0; // this.random(0,100);
  Cpu: number = 0; //this.random(0,100);
  ActiveStatus: number = 0; //this.random(0,100);
  Hard: any = {
    capacity: 0,
    use: 0,
    available: 0
  }; //this.random(0,100);

  public sysInfoChartData: any[] = [
    { data: [this.Memory], label: "Memory" },
    { data: [this.Cpu], label: "Cpu" },
    { data: [this.ActiveStatus], label: "ActiveStatus" },
    { data: [this.Hard], label: "Hard" }
  ];

  // barChart test
  public testChartOptions: any;
  public testChartLabels: string[];
  public testChartType;
  public testChartLegend;

  public testChartData: any[];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //</editor-fold>

  public loading = true;

  public activeTrunks = 0;
  public activeTime = 0;
  public activeCalls = 0;
  public activeChannels = 0;
  public callsCountInQueue = 0;

  // Ram
  public ramDoughnutChartLabels: string[] = ["در حال استفاده", "آزاد"];
  public ramDoughnutChartData: number[] = [0, 100];
  public ramChartColors = [
    {
      backgroundColor: ["#4dbd74", "rgba(228, 229, 230, 0.63)"]
    }
  ];

  // Hard
  public hardDoughnutChartLabels: string[] = ["در حال استفاده", "آزاد"];
  public hardDoughnutChartData: number[] = [0, 100];
  public hardChartColors = [
    {
      backgroundColor: ["#20a8d8", "rgba(228, 229, 230, 0.63)"]
    }
  ];

  // Cpu
  public cpuDoughnutChartLabels: string[] = ["در حال استفاده", "آزاد"];
  public cpuDoughnutChartData: number[] = [0, 100];
  public cpuChartColors = [
    {
      backgroundColor: ["#f86c6b", "rgba(228, 229, 230, 0.63)"]
    }
  ];

  // swap
  public swapDoughnutChartLabels: string[] = ["در حال استفاده", "آزاد"];
  public swapDoughnutChartData: number[] = [0, 100];
  public swapChartColors = [
    {
      backgroundColor: ["#ffc107", "rgba(228, 229, 230, 0.63)"]
    }
  ];

  // lineChart

  showCpu: boolean = true;
  showMemory: boolean = true;
  showSwap: boolean = true;
  showActiveCalls: boolean = true;

  chartHsteps = 50;

  public lineChartData: Array<any> = [
    { data: new Array(this.chartHsteps), label: "Cpu" },
    { data: new Array(this.chartHsteps), label: "Ram" },
    { data: new Array(this.chartHsteps), label: "Swap" },
    { data: new Array(this.chartHsteps), label: "Active Calls" }
  ];

  constructor(
    private apiServ: SysinfoService,
    private toastr: ToastrService,
    private router: Router,
    private excelService: ExcelService
  ) {
    this.loading = true;
    //creating page
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
  }
  ngOnInit(): void {
    const chartsTimer = interval(2000).subscribe(data => {
      if (this.dashboardestroid) chartsTimer.unsubscribe();

      this.apiServ.getSysInfo().subscribe(
        res => {
          res = res['data'];
          this.Memory = res["ram"];
          this.Cpu = res["cpu"];
          this.swap = res["swap"];
          this.Hard.capacity = res["hard"]["capacity"];
          this.Hard.use = res["hard"]["use"];
          this.Hard.available = res["hard"]["available"];

          this.hardDoughnutChartData = [
            res["hard"]["use"],
            100 - res["hard"]["use"]
          ];

          this.ramDoughnutChartData = [res["ram"], 100 - res["ram"]];
          this.cpuDoughnutChartData = [res["cpu"], 100 - res["cpu"]];
          this.swapDoughnutChartData = [res["swap"], 100 - res["swap"]];
          /*ramDoughnutChartData
            hardDoughnutChartData
            cpuDoughnutChartData*/

          this.activeTrunks = res["activeextensions"] || 0;
          this.activeCalls = res["activecalls"] || 0;
          this.activeTime = res["activetime"];
          this.activeChannels = res["channels"];
          this.callsCountInQueue = res["queue"];

          this.sysInfoChartData = [
            { data: [this.Memory], label: "Memory" },
            { data: [this.Cpu], label: "Cpu" },
            { data: [this.ActiveStatus], label: "ActiveStatus" },
            { data: [this.Hard], label: "Hard" },
            { data: [this.Memory], label: "Memory" },
            { data: [this.Cpu], label: "Cpu" },
            { data: [this.ActiveStatus], label: "ActiveStatus" },
            { data: [this.Hard], label: "Hard" }
          ];

          if (this.lineChartData[0].data.length > this.chartHsteps) {
            this.lineChartData[0].data.shift();
          }
          if (this.lineChartData[1].data.length > this.chartHsteps) {
            this.lineChartData[1].data.shift();
          }
          if (this.lineChartData[2].data.length > this.chartHsteps) {
            this.lineChartData[2].data.shift();
          }
          if (this.lineChartData[3].data.length > this.chartHsteps) {
            this.lineChartData[3].data.shift();
          }

          this.lineChartData = [
            {
              data: this.showCpu
                ? [...this.lineChartData[0].data, this.Cpu]
                : new Array(this.chartHsteps),
              label: "Cpu"
            },
            {
              data: this.showMemory
                ? [...this.lineChartData[1].data, this.Memory]
                : new Array(this.chartHsteps),
              label: "Ram"
            },
            {
              data: this.showSwap
                ? [...this.lineChartData[2].data, this.swap]
                : new Array(this.chartHsteps),
              label: "Swap"
            },
            {
              data: this.showActiveCalls
                ? [...this.lineChartData[3].data, this.activeCalls]
                : new Array(this.chartHsteps),
              label: "Active Calls"
            }
          ];
        },
        error => {
          if (
            error.status == 400 ||
            error.status == 403 ||
            error.status == 404
          ) {
            //this.toastr.error('شما از سیستم خارج شدید!', 'پیغام سیستم');
            this.router.navigate(["/login"]);
            chartsTimer.unsubscribe();
          }
        }
      );
    });
  }

  dashboardestroid: boolean = false;
  ngOnDestroy(): void {
    this.dashboardestroid = true;
  }
}
