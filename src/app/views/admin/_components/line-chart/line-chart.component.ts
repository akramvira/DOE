import { Component, OnInit, Input } from "@angular/core";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
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
  @Input() isTimeChart = false;
  
 


  ngOnInit() {
    
   let isTimeChart = this.isTimeChart;
    this.options = {
      
      responsive: true,
      loneJoin: "miter",
      bezierCurve: true,
      elements: {
        point: {
          radius: 0
        },
        line: {
          tension: 0
        }
      },
      tooltips: {
        fontFamily: "IRANSans",
        fontColor: "black",
        fontStyle: "bold",
        enabled: false,
        mode: "index",
        custom: CustomTooltips,
        intersect: false,
        callbacks: {
          label: function(tooltipItem, data) {
            

            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if(isTimeChart){
              if(tooltipItem.yLabel == 0 ) return 0;
              let d = Number(tooltipItem.yLabel);
                  
              let h = Math.floor(d / 3600);
              let m = Math.floor(d % 3600 / 60);
              let s = Math.floor(d % 3600 % 60);
          

              let hDisplay = h == 0 ? '' : h >= 10 ? h+ ':' : (("0" + h) as string) + ':';
              let mDisplay = m >= 10 ? m : (("0" + m) as string);
              let sDisplay = s >= 10 ? s : (("0" + s) as string); // > 0 ? s ;// + (s == 1 ? "" : "") : "";
              let time = hDisplay + mDisplay + ":" + sDisplay;

              return label +': ' + time;
            }
            else return label + '<i class="icon icon-clock"></i> :: '  + tooltipItem.yLabel;
          }
        }
      },
      hover: {
        mode: "nearest",
        intersect: true,
        fontFamily: "IRANSans",
        fontColor: "black",
        fontStyle: "bold",
        enabled: false,
        custom: CustomTooltips,
        callbacks: {
          label: function(tooltipItem, data) {
          
            var label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              label += ": ";
            }
            label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;
            return label;
          }
        }
      },
      legend: {
        labels: { 
          fontFamily: 'IRANSans',
          fontColor: 'black',
          fontStyle: 'bold'
        }
      },
      
      plugins: {
        labels: {
          render: "value",
          fontColor: ["green", "white", "red"],
          precision: 2,
          arc: true
        },
        formatter: function(value) {
          if (isNaN(value)) {
            return "";
          }
          return value;
        }
      },
      scales: {
        yAxes: [
          {
            id: "left-y-axis",
            ticks: {
              beginAtZero:true,
              fontFamily: "IRANSans",
              fontColor: "black",
              fontSize: 13,
              userCallback: function(item) {
       
                if(isTimeChart){
                  if(item == 0 ) return 0;
                  let d = Number(item);
                  
                  
                  let h = Math.floor(d / 3600);
                  let m = Math.floor(d % 3600 / 60);
                  let s = Math.floor(d % 3600 % 60);
              

                let hDisplay = h == 0 ? '' : h >= 10 ? h+ ':' : (("0" + h) as string) + ':';
                let mDisplay = m >= 10 ? m : (("0" + m) as string);
                let sDisplay = s >= 10 ? s : (("0" + s) as string); // > 0 ? s ;// + (s == 1 ? "" : "") : "";
                let time = hDisplay + mDisplay + ":" + sDisplay;

               return time;
                }
               
                else return item;
            },
            },
            scaleLabel:{
              labelString: isTimeChart? 'مدت زمان' :  'تعداد تماس' ,
              display: true,
              fontFamily: "IRANSans",
              fontColor: "black",
              fontStyle: "bold",
            },
            
          }
        ],
        xAxes : [
          {
            fontFamily: "IRANSans",
            fontColor: "black",

            ticks: {
              beginAtZero:true,
              stepSize: 0.5,
              fontFamily: "IRANSans",
              fontColor: "black",
              fontSize: 13,
            }
          }
        ]

      },
     
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
  public options: any ;
  @Input() colors: Array<any> = [
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
