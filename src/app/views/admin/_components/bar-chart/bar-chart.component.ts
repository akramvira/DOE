import { Component, OnInit, Input } from "@angular/core";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { ExcelService } from "../../../../_services/excel.service";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"]
})
export class BarChartComponent implements OnInit {
  constructor(private excelService: ExcelService) {}

  @Input() isTimeChart: boolean = false;
  ngOnInit() {}

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  // barChart1
  @Input() datasets: Array<any> = [
    {
      data: [78, 81, 80],
      label: "Series A"
    }
  ];
  @Input() contentTitle: string = "";
  @Input() labels: Array<any> = [];

  formatTime(secs) {
    secs = parseInt(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    return hours + ":" + minutes;
  }

  public chartOptions: any = {
    scaleShowVerticalLines: true,

    barRoundness: 3,
    legend: {
      labels: {
        fontFamily: "IRANSans",
        fontColor: "black",
        fontStyle: "bold"
      }
    },
    tooltips: {
      fontFamily: "IRANSans",
      fontColor: "black",
      fontStyle: "bold",
      enabled: false,
      custom: CustomTooltips,
      callbacks: {
        label: function(tooltipItem, data) {
          console.log(data);
          var label = data.datasets[tooltipItem.datasetIndex].label || "";

          if (label) {
            label += ": ";
          }
          label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;
          return label;
        }
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            //this will fix your problem with NaN
            callback: function(label, index, labels, data) {
              console.log(label);
              return label ? label : "";
            },
            fontFamily: "IRANSans",
            fontColor: "black",
            fontSize: 13
          },
          barPercentage: 0.4
        }
      ],
      yAxes: [
        {
          fontFamily: "IRANSans",
          fontColor: "black",
          fontStyle: "bold",

          ticks: {
            beginAtZero: true,
            fontFamily: "IRANSans",
            fontColor: "black",
            fontSize: 13,
            callback: function(label, index, labels) {
              if (this.isTimeChart) return this.formatTime(label);
              else return label;
            }
          }
        }
      ]
    },

    plugins: {
      labels: {
        render: "value",
        precision: 2,
        arc: true
      },
      formatter: function(value) {
        if (isNaN(value)) {
          return "";
        }
        return value;
      }
    }
  };

  @Input() colors: Array<any> = [
    {
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1,
      barRoundness: 1
    },
    {
      backgroundColor: [
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    },
    {
      backgroundColor: [
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1,
      barRoundness: 1
    }
  ];
  public chartType = "bar";

  export(type: string = "excel") {
    let tmpData: any = JSON.parse(JSON.stringify(this.datasets));
    let data: any = [];
    data.push({
      اطلاعات: this.contentTitle
    });

    for (let it in tmpData) {
      let record = {};
      record["labels"] = tmpData[it]["label"];
      for (let index in this.labels) {
        record[this.labels[index].replace(/\s/g, "_")] =
          tmpData[it]["data"][index]; // tmpData[it]['data'].pop();
      }
      data.push(record);
    }

    this.exportAsXLSX(data, type);
  }

  exportAsXLSX(data, type: string = "excel"): void {
    this.excelService.exportAsExcelFile(data, this.chartType, type);
  }
}
