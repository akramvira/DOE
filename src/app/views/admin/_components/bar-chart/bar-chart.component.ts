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
  ngOnInit() {

    let isTimeChart = this.isTimeChart;
    let isPercentChart = this.isPercentChart;
    this.chartOptions ={
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
      
            if(isTimeChart){
              var label = data.datasets[tooltipItem.datasetIndex].label || '';

              if(isTimeChart)
              return label+' : ' + new Date( tooltipItem.yLabel * 1000).toISOString().substr(11, 8);
              else return label + ' ' + tooltipItem.yLabel;
            }
            else if(isPercentChart){
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
  
              if (label) {
                label += ": ";
              }
              label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel+'%';
              return label;
            }
            else {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
  
              if (label) {
                label += ": ";
              }
              label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;
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
            barPercentage: 0.4
          }
        ],
        yAxes: [
          {
            fontFamily: "IRANSans",
            fontColor: "black",
            fontStyle: "bold",
            ticks: {
              stepSize: 1,
              beginAtZero: true,
              fontFamily: "IRANSans",
              fontColor: "black",
              fontSize: 13,
              userCallback: function(item) {
                if(isTimeChart)
                return new Date(item * 1000).toISOString().substr(11, 8);
                else if(isPercentChart)
                  return item +'%'
                else return item;
            },
            }
          }
        ]
      },
  
      plugins: {
        labels: {
          render: "value",
          precision: 2,
          arc: true,
          callback:(item)=>{console.log(item)}
        },
        userCallback: function(value) {
          console.log(value);
          if (isNaN(value)) {
            return "";
          }

          if(isTimeChart)
            return new Date( value * 1000).toISOString().substr(11, 8);
          else if(isPercentChart) return value+'%';
          else return value;
        }
      }
    };
  
  }

  public chartClicked(e: any): void {

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

  public chartOptions: any ;
  @Input() colors: Array<any> = [
    {
      backgroundColor:  "rgba(77, 189, 116, 0.5)"
      ,
      borderColor:  "rgba(77, 189, 116, 0.9)"
      ,
      borderWidth: 1,
    },
    {
      backgroundColor:  "rgba(255, 99, 132, 0.5)"
      ,
      borderColor:  "rgba(255, 99, 132, 0.9)"
      ,
      borderWidth: 1,
    },
    {
      backgroundColor: 
        "rgba(255, 193, 7, 0.6)"
      ,
      borderColor: "rgba(255, 193, 7, 0.9)"
      ,
      borderWidth: 1
    },
    {
      backgroundColor: 
        "rgba(255, 100, 50, 0.6)"
      ,
      borderColor: "rgba(255, 193, 7, 0.9)"
      ,
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
