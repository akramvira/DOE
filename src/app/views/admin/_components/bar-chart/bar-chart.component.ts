import { Component, OnInit, Input } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ExcelService } from '../../../../_services/excel.service';
import { strict } from 'assert';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(private excelService: ExcelService) { }

  ngOnInit() {
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  // barChart1
  @Input() datasets: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  @Input() contentTitle: string = '';
  @Input() labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public chartOptions: any =  {
    scaleShowVerticalLines: false,
    responsive: true
  };
  @Input() colors: Array<any> = [
    {
      backgroundColor: '#c8ced3',
      borderWidth: 0
    },

    {
      backgroundColor: '#4dbd74',
      borderWidth: 0
    },
    {
      backgroundColor: '#ffa1b5',
      borderWidth: 0
    },
  ];
  public chartType = 'bar';



  export(type: string = "excel") {
    let tmpData: any = JSON.parse(JSON.stringify(this.datasets));
    let data: any = [];
    data.push({
      'اطلاعات': this.contentTitle
    });

    for (let it in tmpData) {
      let record = {};
      record['labels'] = tmpData[it]['label'];
      for (let index in this.labels) {
        
          record[this.labels[index].replace(/\s/g,'_')] = tmpData[it]['data'][index]; // tmpData[it]['data'].pop();
      }
      data.push(record);
  }

 

    debugger;
    this.exportAsXLSX(data, type);
  }

  
  exportAsXLSX(data, type: string = "excel"): void {
    this.excelService.exportAsExcelFile(data, this.chartType, type);
  }




}
