import { Component, OnInit, Input } from "@angular/core";
import "chartjs-plugin-labels";
import { ExcelService } from "../../../../_services/excel.service";

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
      debugger;
      record[this.labels[index].replace(/\s/g, "_")] = this.data[index];
    }
    data.push(record);

    debugger;
    this.exportAsXLSX(data, type);
  }

  exportAsXLSX(data, type: string = "excel"): void {
    this.excelService.exportAsExcelFile(data, this.doughnutChartType, type);
  }
}
