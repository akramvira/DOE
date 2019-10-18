import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { SysinfoService } from "../_services/sysinfo.service";

import {CommonModule} from "@angular/common";
import * as CanvasJS from 'canvasjs';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
//<editor-fold>

  radioModel: string = 'Month';


  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';



  // system info Chart
  public sysInfoChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public sysInfoChartLabels: string[] = ['value'];
  public sysInfoChartType = 'bar';
  public sysInfoChartLegend = true;

  Memory :number = 0 ;// this.random(0,100);
  Cpu :number = 0 ;//this.random(0,100);
  ActiveStatus :number = 0 ;//this.random(0,100);
  Hard : any = {
    capacity : 0,
    use : 0,
    available : 0
  } ;//this.random(0,100);


  public sysInfoChartData: any[] = [
    {data: [this.Memory], label: 'Memory'},
    {data: [this.Cpu], label: 'Cpu'},
    {data: [this.ActiveStatus], label: 'ActiveStatus'},
    {data: [this.Hard], label: 'Hard'}
  ];



  // barChart test
  public testChartOptions: any ;
  public testChartLabels: string[] ;
  public testChartType ;
  public testChartLegend ;

  public testChartData: any[] ;


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }


  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



  //</editor-fold>

  public loading = true;

  public activeTrunks = 990;
  public activeCalls = 990;
  public activeChannels = 990;
  public callsCountInQueue = 990;


  constructor (private apiServ: SysinfoService,
    private authServe : AuthenticationService
               ){
    this.loading = true;
        //creating page
        for (let i = 0; i <= this.mainChartElements; i++) {
            this.mainChartData1.push(this.random(50, 200));
            this.mainChartData2.push(this.random(80, 100));
            this.mainChartData3.push(65);
          }
  }
  ngOnInit(  ): void {
    setInterval(()=>{

      this.apiServ.getSysInfo().subscribe(
        (res) => {

          this.Memory = this.random(0,100);// res['data']['ram'];
          this.Cpu = this.random(0,100);//res['data']['cpu'];
          this.Hard.capacity = this.random(0,100);//res['data']['hard']['capacity'];
          this.Hard.user = this.random(0,100);//res['data']['hard']['user'];
          this.Hard.available = this.random(0,100);//res['data']['hard']['available'];

          this.activeTrunks = this.random(0,100);//res['data']['activeTrunks'];
          this.activeCalls = this.random(0,100);//res['data']['activeCalls'];
          this.activeChannels = this.random(0,100);// res['data']['activeChannels'];
          this.callsCountInQueue = this.random(0,100);//res['data']['callsCountInQueue'];

          this.sysInfoChartData = [
            {data: [this.Memory], label: 'Memory'},
            {data: [this.Cpu], label: 'Cpu'},
            {data: [this.ActiveStatus], label: 'ActiveStatus'},
            {data: [this.Hard], label: 'Hard'}
          ];


          /* let chartData = res['data'][4][1];

           this.testChartData  = [
             {data: Number(chartData[0][1]), label: chartData[0][0]},
             {data: Number(chartData[1][1]), label: chartData[1][0]},
             {data: Number(chartData[2][1]), label: chartData[2][0]},
             {data: Number(chartData[3][1]), label: chartData[3][0]},
             {data: Number(chartData[4][1]), label: chartData[4][0]},
             {data: Number(chartData[5][1]), label: chartData[5][0]},
             {data: Number(chartData[6][1]), label: chartData[6][0]},
             {data: Number(chartData[7][1]), label: chartData[7][0]},
             {data: Number(chartData[8][1]), label: chartData[8][0]},
             {data: Number(chartData[9][1]), label: chartData[9][0]},
             {data: Number(chartData[10][1]), label: chartData[10][0]},
             {data: Number(chartData[11][1]), label: chartData[11][0]},

           ];*/


        },
        error=>{
          this.authServe.handdleAuthErrors(error);
        }
      );

      this.lineChart1Data = [
        {
          data: [100 , 50 , 50, 50 , 50, 50, 50],
          label: 'Series A'
        }
      ];

    } , 1000);


 /*   let dataPoints = [];
    let y = 0;
    for ( var i = 0; i < 10000; i++ ) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y});
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Performance Demo - 10000 DataPoints"
      },
      subtitles:[{
        text: "Try Zooming and Panning"
      }],
      data: [
        {
          type: "line",
          dataPoints: dataPoints
        }]
    });

    chart.render();*/

  }

}
