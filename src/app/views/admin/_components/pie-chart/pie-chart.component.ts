import { Component, OnInit, Input } from "@angular/core";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { ExcelService } from "../../../../_services/excel.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"]
})
export class PieChartComponent implements OnInit {
  constructor(private excelService: ExcelService) {}

  ngOnInit() {
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  @Input() contentTitle: string = "";
  @Input() data: number[] = [1, 100];
  @Input() labels: string[] = ["پاسخ داده نشده", "پاسخ داده شده"];

  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  @Input() colors: Array<any> = [];
  public chartType = "pie";

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
    this.excelService.exportAsExcelFile(data, this.chartType, type);
  }
}
