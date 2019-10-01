import { Component, OnInit, Input } from "@angular/core";

import "chartjs-plugin-labels";
import { ExcelService } from "../../../../_services/excel.service";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"]
})
export class LineChartComponent implements OnInit {
  constructor(private excelService: ExcelService) {}
  chartHsteps = 50;
  ngOnInit() {
    
    this.lineChartOptions == {
      animation: true,
      responsive: true,
      loneJoin: "miter",
      bezierCurve: true,
      elements: {
        point: {
          radius: 0
        },
        line: {
          tension: 0
        },
        scales: {
          yAxes: [
            {
              type: "linear",
              id: "left-y-axis",
              ticks: {
                max: 100,
                min: 100,
                stepSize: 0.5
              }
            }
          ]
        }
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      }
    };
    
  }

  exportAsXLSX(data, type: string = "excel"): void {
    this.excelService.exportAsExcelFile(data, this.lineChartType, type);
  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  @Input() datasets: Array<any> = [];
  @Input() contentTitle: string = "";

  export(type: string = "excel") {
    let data: any = [];

    data.push({
      "نام نمودار": this.contentTitle
    });

    data.push({
      labels: this.labels
    });
    let labelDataPeer = [];

    let tmpLineChartData = JSON.parse(JSON.stringify(this.datasets));

    for (let dataItem in this.labels) {
      let record = {};
      for (let index in tmpLineChartData) {
        record[tmpLineChartData[index].label] = tmpLineChartData[index][
          "data"
        ].pop();
      }
      labelDataPeer.push(record);
    }

    for (let index in labelDataPeer) {
      data.push(labelDataPeer[index]);
    }

    debugger;
    this.exportAsXLSX(data, type);
  }

  lineChartMaxYAxes = 100;

  @Input() labels: Array<any> = new Array(this.chartHsteps).fill("");
  public lineChartOptions: any ;
  public lineChartColours: Array<any> = [
    {
      //cpu
      backgroundColor: "rgba(255, 161, 181, 0.2)",
      borderColor: "rgba(255, 161, 181, 0.4)",
      pointBackgroundColor: "rgba(255, 161, 181, 0.4)",
      pointBorderColor: "rgba(255, 161, 181, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 161, 181, 0.4)",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // ram
      backgroundColor: "rgba(77, 189, 116, 0.2)",
      borderColor: "rgba(77, 189, 116, 0.4)",
      pointBackgroundColor: "rgba(77, 189, 116, 0.4)",
      pointBorderColor: "rgba(77, 189, 116, 0.4)",
      pointHoverBackgroundColor: "rgba(77, 189, 116, 0.4)",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // swap
      backgroundColor: "rgba(255, 193, 7, 0.2)",
      borderColor: "rgba(255, 193, 7, 0.4)",
      pointBackgroundColor: "rgba(255, 193, 7, 0.4)",
      pointBorderColor: "rgba(255, 193, 7, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 193, 7, 0.4)",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      // active
      backgroundColor: "rgba(32, 168, 216, 0.2)",
      borderColor: "rgba(32, 168, 216, 0.4)",
      pointBackgroundColor: "rgba(32, 168, 216, 0.4)",
      pointBorderColor: "rgba(32, 168, 216, 0.4)",
      pointHoverBackgroundColor: "rgba(32, 168, 216, 0.4)",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
}
