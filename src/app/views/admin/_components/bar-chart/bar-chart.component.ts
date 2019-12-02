import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
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
  @Input() title: string = "";
  @Input() timeType: string = "full"; // min , hour

  ngOnInit() {
    this.setChartConfig();
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
      backgroundColor: "#d0002c",
      borderColor: "#d0002c",
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

  zoomOut() {}


  ngOnChanges(changes: SimpleChanges) {
    this.setChartConfig()
}


isZoomMode:boolean =false;

setChartConfig(){
  {

    let barsCount = 0;
    for(let i in this.datasets){
      barsCount += this.datasets[i]['data'].length
      debugger;
    }

    
    
    let isTimeChart = this.isTimeChart;
    let isPercentChart = this.isPercentChart;
    let unitLabel = this.unitLabel;

    let topNumbersType = !isPercentChart? "value" : 'percent';
    let stepSizee = isPercentChart? 10: 1;
    let timeType = this.timeType;

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
              //let day = Math.floor(d / (3600*24));
              //d = d % (3600*24);
              let h = Math.floor(d / 3600);
              let m = Math.floor((d % 3600) / 60);
              let s = Math.floor((d % 3600) % 60);

              let hDisplay = h >= 10 ? h : (("0" + h) as string);
              let mDisplay = m >= 10 ? m : (("0" + m) as string);
              let sDisplay = s >= 10 ? s : (("0" + s) as string); // > 0 ? s ;// + (s == 1 ? "" : "") : "";
              let time = hDisplay + ":" + mDisplay + ":" + sDisplay;

              return ' '+ label + '<i class="icon icon-clock"></i> :: ' + time;
              // else return label + ' ' + tooltipItem.yLabel;
            } else if (isPercentChart) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += isNaN(tooltipItem.yLabel)
                ? "0"
                : tooltipItem.yLabel + "%";
              return ' '+ label;
            } else {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;

              //if (unitLabel) label = label + 'تماس';

              return ' '+ label + ' تماس';
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
            scaleLabel:{
              labelString: isTimeChart? 'مدت زمان' : isPercentChart?'درصد': 'تعداد تماس' ,
              display: true,
              fontFamily: "IRANSans",
              fontColor: "black",
              fontStyle: "bold",
            },
            ticks: {
              beginAtZero: true,
              fontFamily: "IRANSans",
              fontColor: "black",
              fontSize: 11,
              padding:10,
              margin:100,
              min: 0,
              maxTicksLimi:10,
              max: isPercentChart ? 100 : undefined,
              userCallback: function(item) {
                if (isTimeChart) {
                  if(item == 0) return 0;
                  let d = Number(item);

                  let day = Math.floor(d / (3600 * 24));
                  //d = d % (3600*24);
                  let h = Math.floor(d / 3600);
                  let m = Math.floor((d % 3600) / 60);
                  let s = Math.floor((d % 3600) % 60);

                  let hDisplay = h >= 10 ? h : (("0" + h) as string);
                  let mDisplay = m >= 10 ? m : (("0" + m) as string);
                  let sDisplay = s >= 10 ? s : (("0" + s) as string); // > 0 ? s ;// + (s == 1 ? "" : "") : "";

                  let time = '';
                  if(timeType == 'min')
                     time =  mDisplay + ":" + sDisplay;
                 else if(timeType == 'hour')
                    time = hDisplay + ":" + mDisplay;// + ":" + sDisplay;
                 else 
                     time = hDisplay + ":" + mDisplay;// + ":" + sDisplay;

                  return time;
                } else if (isPercentChart) return item + "%";
                else return item;
              }
            }
            
            
          }
        ]
      },
      

      plugins: {
        labels: {
          render: function (args) {
            
            console.log('barsCount', barsCount);
            if(!this.isZoomMode && barsCount > 10) return '';
            if(args.value == 0)
              return '';

            if(isPercentChart)
              return '%' + args.value;
            else if(isTimeChart){
              

              let d = Number(args.value);

              let day = Math.floor(d / (3600 * 24));
              //d = d % (3600*24);
              let h = Math.floor(d / 3600);
              let m = Math.floor((d % 3600) / 60);
              let s = Math.floor((d % 3600) % 60);
  
              let hDisplay = h >= 10 ? h : (("0" + h) as string);
              let mDisplay = m >= 10 ? m : (("0" + m) as string);
              let sDisplay = s >= 10 ? s : (("0" + s) as string); // > 0 ? s ;// + (s == 1 ? "" : "") : "";
              let time = hDisplay + ":" + mDisplay + ":" + sDisplay;
  
              return time;
            }
             
             else return args.value;
      
          },
          precision: 2,
          arc: true
        },
        userCallback: function(value) {
        
          console.log(value);
          if (isNaN(value)) {
            return "";
          }

          if (isTimeChart) {
            let d = Number(value);

            let day = Math.floor(d / (3600 * 24));
            //d = d % (3600*24);
            let h = Math.floor(d / 3600);
            let m = Math.floor((d % 3600) / 60);
            let s = Math.floor((d % 3600) % 60);

            let hDisplay = h >= 10 ? h : (("0" + h) as string);
            let mDisplay = m >= 10 ? m : (("0" + m) as string);
            let sDisplay = s >= 10 ? s : (("0" + s) as string); // > 0 ? s ;// + (s == 1 ? "" : "") : "";
            let time = hDisplay + ":" + mDisplay + ":" + sDisplay;

            return time;
          } else if (isPercentChart) return value + "%";
          else return value;
        }
      }
    };
  }
}

onCloseModal(){
  debugger;
}

}
