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
  @Input() isPercentChart: boolean = false;
  @Input() unitLabel: string = "";

  ngOnInit() {
    let isTimeChart = this.isTimeChart;
    let isPercentChart = this.isPercentChart;
    let unitLabel = this.unitLabel;

    let stepSizee = 1;

    this.chartOptions = {
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
            if (isTimeChart) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
  
              let d = Number(tooltipItem.yLabel);
              let day = Math.floor(d / (3600*24));
              d = d % (3600*24);
              let h = Math.floor(d / 3600);
              let m = Math.floor(d % 3600 / 60);
              let s = Math.floor(d % 3600 % 60);
          
              let hDisplay = h >= 10 ? h : "0"+ h as string;
              let mDisplay = m >= 10  ? m : "0"+m as string ;
              let sDisplay = s >= 10 ? s : "0"+ s as string ; // > 0 ? s ;// + (s == 1 ? "" : "") : "";
              let time = day + 'd '+ hDisplay +":"+ mDisplay +":"+ sDisplay;  

              return (
                label +
                " : " +
                time
              );
              // else return label + ' ' + tooltipItem.yLabel;
            } else if (isPercentChart) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += isNaN(tooltipItem.yLabel)
                ? "0"
                : tooltipItem.yLabel + "%";
              return label;
            } else {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;

              if (unitLabel) label = label + unitLabel;

              return label;
            }
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
                return label ? label : "";
              },
              fontFamily: "IRANSans",
              fontColor: "black",
              fontSize: 13
            },
            barPercentage: 0.9
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
              
              min: 0 ,
              
              max: isPercentChart? 100 : undefined,
              userCallback: function(item) {

                if (isTimeChart){
                  let d = Number(item);
                  
                  let day = Math.floor(d / (3600*24));
                  d = d % (3600*24);
                  let h = Math.floor(d / 3600);
                  let m = Math.floor(d % 3600 / 60);
                  let s = Math.floor(d % 3600 % 60);
              
                  let hDisplay = h >= 10 ? h : "0"+ h as string;
                  let mDisplay = m >= 10  ? m : "0"+m as string ;
                  let sDisplay = s >= 10 ? s : "0"+ s as string ; // > 0 ? s ;// + (s == 1 ? "" : "") : "";
                  let time = day + 'd '+ hDisplay +":"+ mDisplay +":"+ sDisplay; 
              
                  return time;
                }
                  
                else if (isPercentChart) return item + "%";
                else return item;
              }
            }
          }
        ]
      },

      plugins: {
        labels: {
          render: "value",
          precision: 2,
          arc: true,
          callback: item => {
            console.log(item);
            return 0;
          }
        },
        userCallback: function(value) {
          console.log(value);
          if (isNaN(value)) {
            return "";
          }

          if (isTimeChart){
            let d = Number(value);
              
            let day = Math.floor(d / (3600*24));
            d = d % (3600*24);
            let h = Math.floor(d / 3600);
            let m = Math.floor(d % 3600 / 60);
            let s = Math.floor(d % 3600 % 60);
        
            let hDisplay = h >= 10 ? h : "0"+ h as string;
            let mDisplay = m >= 10  ? m : "0"+m as string ;
            let sDisplay = s >= 10 ? s : "0"+ s as string ; // > 0 ? s ;// + (s == 1 ? "" : "") : "";
            let time = day + 'd '+ hDisplay +":"+ mDisplay +":"+ sDisplay; 
        
            return time;
          }
            
          else if (isPercentChart) return value + "%";
          else return value;
        }
      }
    };
  }

  public chartClicked(e: any): void {}

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



  public chartOptions: any;
  @Input() colors: Array<any> = [
    {
      backgroundColor: "rgba(77, 189, 116, 1)",
      borderColor: "rgba(77, 189, 116, 1)",
      borderWidth: 1
    },
    {
      backgroundColor: "rgba(255, 99, 132, 1)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1
    },
    {
      backgroundColor: "rgba(255, 193, 7, 1)",
      borderColor: "rgba(255, 193, 7, 1)",
      borderWidth: 1
    },
    {
      backgroundColor: "rgba(255, 100, 50, 1)",
      borderColor: "rgba(255, 193, 7, 1)",
      borderWidth: 1
    }
  ];

  @Input() chartType = "bar";

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
