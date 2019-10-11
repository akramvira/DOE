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
      data: [78, 81, 80],
      label: 'Series A'
    }
  ];
  @Input() contentTitle: string = '';
  @Input() labels: Array<any> = [];
  public chartOptions: any =  {
    scaleShowVerticalLines: true,
    responsive: true,
    legend: {
      labels: { 
        fontFamily: 'IRANSans',
        fontColor: 'black',
        fontStyle: 'bold'
      }
    },
    tooltips: {

    callbacks: {
        label: function(tooltipItem, data) {
          console.log(data);
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            label += isNaN(tooltipItem.yLabel) ? '0' : tooltipItem.yLabel;
            return label;
        }
    },
   
      
  },
  scales: {
    xAxes: [{
    
      ticks: {
        beginAtZero: true,
        //this will fix your problem with NaN
        callback: function(label, index, labels) {
          debugger;
          console.log(label);
          return label ? label : '';
        },
        fontFamily: 'IRANSans',
        fontColor: 'black',
        fontSize: 15
      }
    }],
    yAxes: [{
      fontFamily: 'IRANSans',
      fontColor: 'black',
      fontStyle: 'bold',
      
      ticks: {
        beginAtZero: true,
        fontFamily: 'IRANSans',
        fontColor: 'black',
        fontSize: 15
      },
    }]
  },
  };


  
  @Input() colors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        '#OOEADA', '#9FC3F2', '#8C162A' , '#947CE2', '#9C91F2', '#20a8d8', '##337ab7', '#f6f5fc'],
      borderWidth: 0
    },

    {
      backgroundColor: '#9FC3F2',
      borderWidth: 0
    },
    {
      backgroundColor: '#8C162A',
      borderWidth: 0
    },
    {
      backgroundColor: '#947CE2',
      borderWidth: 0
    },
    {
      backgroundColor: '#9C91F2',
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
