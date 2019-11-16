import { Component, OnInit, Input } from "@angular/core";
import "chartjs-plugin-labels";
import { ExcelService } from "../../../../_services/excel.service";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.scss"],
  host: { class: "text-left" }
})
export class DoughnutChartComponent implements OnInit {
  constructor(private excelService: ExcelService) {}
  @Input() labels: string[] = ["در حال استفاده", "آزاد"];
  @Input() data: number[] = [0, 100];
  @Input() colors = [
    {
      backgroundColor: ["#f86c6b", "rgba(228, 229, 230, 0.63)"]
    }
  ];

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
            
            var label = data.labels[tooltipItem.index] || "";
            
              if (label) {
                label += ": ";
              }
              label += isNaN(data.datasets[0]['data'][tooltipItem.index]) ? "%0" :
              '%'+ data.datasets[0]['data'][tooltipItem.index];
              return label;
          }
        }
      },
 

    plugins: {
      labels: {
        render: "percent",
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
  public doughnutChartType = "doughnut";

  ngOnInit() {}

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  export(type: string = "excel") {
    let data: any = [];

    let labelDataPeer = [];

    let tmpLineChartData = JSON.parse(JSON.stringify(this.data));
    let record = {};
    for (let index in this.labels) {
      
      record[this.labels[index].replace(/\s/g, "_")] = this.data[index];
    }
    data.push(record);
    this.exportAsXLSX(data, type);
  }

  exportAsXLSX(data, type: string = "excel"): void {
    this.excelService.exportAsExcelFile(data, this.doughnutChartType, type);
  }
}
