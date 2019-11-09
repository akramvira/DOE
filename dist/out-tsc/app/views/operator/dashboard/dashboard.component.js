"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var coreui_utilities_1 = require("@coreui/coreui/dist/js/coreui-utilities");
var coreui_plugin_chartjs_custom_tooltips_1 = require("@coreui/coreui-plugin-chartjs-custom-tooltips");
var sysinfo_service_1 = require("../_services/sysinfo.service");
var authentication_service_1 = require("../../../_services/authentication.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(apiServ, authServe) {
        this.apiServ = apiServ;
        this.authServe = authServe;
        //<editor-fold>
        this.radioModel = 'Month';
        // lineChart1
        this.lineChart1Data = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Series A'
            }
        ];
        this.lineChart1Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart1Options = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips
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
        this.lineChart1Colours = [
            {
                backgroundColor: coreui_utilities_1.getStyle('--primary'),
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart1Legend = false;
        this.lineChart1Type = 'line';
        // lineChart2
        this.lineChart2Data = [
            {
                data: [1, 18, 9, 17, 34, 22, 11],
                label: 'Series A'
            }
        ];
        this.lineChart2Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart2Options = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips
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
        this.lineChart2Colours = [
            {
                backgroundColor: coreui_utilities_1.getStyle('--info'),
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart2Legend = false;
        this.lineChart2Type = 'line';
        // lineChart3
        this.lineChart3Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'Series A'
            }
        ];
        this.lineChart3Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart3Options = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips
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
        this.lineChart3Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
            }
        ];
        this.lineChart3Legend = false;
        this.lineChart3Type = 'line';
        // barChart1
        this.barChart1Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
                label: 'Series A'
            }
        ];
        this.barChart1Labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
        this.barChart1Options = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips
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
        this.barChart1Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderWidth: 0
            }
        ];
        this.barChart1Legend = false;
        this.barChart1Type = 'bar';
        // mainChart
        this.mainChartElements = 27;
        this.mainChartData1 = [];
        this.mainChartData2 = [];
        this.mainChartData3 = [];
        this.mainChartData = [
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
        this.mainChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        /* tslint:enable:max-line-length */
        this.mainChartOptions = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                    labelColor: function (tooltipItem, chart) {
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
                            callback: function (value) {
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
        this.mainChartColours = [
            {
                backgroundColor: coreui_utilities_1.hexToRgba(coreui_utilities_1.getStyle('--info'), 10),
                borderColor: coreui_utilities_1.getStyle('--info'),
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: 'transparent',
                borderColor: coreui_utilities_1.getStyle('--success'),
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: 'transparent',
                borderColor: coreui_utilities_1.getStyle('--danger'),
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5]
            }
        ];
        this.mainChartLegend = false;
        this.mainChartType = 'line';
        // social box charts
        this.brandBoxChartData1 = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Facebook'
            }
        ];
        this.brandBoxChartData2 = [
            {
                data: [1, 13, 9, 17, 34, 41, 38],
                label: 'Twitter'
            }
        ];
        this.brandBoxChartData3 = [
            {
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'LinkedIn'
            }
        ];
        this.brandBoxChartData4 = [
            {
                data: [35, 23, 56, 22, 97, 23, 64],
                label: 'Google+'
            }
        ];
        this.brandBoxChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.brandBoxChartOptions = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips
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
        this.brandBoxChartColours = [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff'
            }
        ];
        this.brandBoxChartLegend = false;
        this.brandBoxChartType = 'line';
        // system info Chart
        this.sysInfoChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.sysInfoChartLabels = ['value'];
        this.sysInfoChartType = 'bar';
        this.sysInfoChartLegend = true;
        this.Memory = 0; // this.random(0,100);
        this.Cpu = 0; //this.random(0,100);
        this.ActiveStatus = 0; //this.random(0,100);
        this.Hard = {
            capacity: 0,
            use: 0,
            available: 0
        }; //this.random(0,100);
        this.sysInfoChartData = [
            { data: [this.Memory], label: 'Memory' },
            { data: [this.Cpu], label: 'Cpu' },
            { data: [this.ActiveStatus], label: 'ActiveStatus' },
            { data: [this.Hard], label: 'Hard' }
        ];
        //</editor-fold>
        this.loading = true;
        this.activeTrunks = 990;
        this.activeCalls = 990;
        this.activeChannels = 990;
        this.callsCountInQueue = 990;
        this.loading = true;
        //creating page
        for (var i = 0; i <= this.mainChartElements; i++) {
            this.mainChartData1.push(this.random(50, 200));
            this.mainChartData2.push(this.random(80, 100));
            this.mainChartData3.push(65);
        }
    }
    // events
    DashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            _this.apiServ.getSysInfo().subscribe(function (res) {
                _this.Memory = _this.random(0, 100); // res['data']['ram'];
                _this.Cpu = _this.random(0, 100); //res['data']['cpu'];
                _this.Hard.capacity = _this.random(0, 100); //res['data']['hard']['capacity'];
                _this.Hard.user = _this.random(0, 100); //res['data']['hard']['user'];
                _this.Hard.available = _this.random(0, 100); //res['data']['hard']['available'];
                _this.activeTrunks = _this.random(0, 100); //res['data']['activeTrunks'];
                _this.activeCalls = _this.random(0, 100); //res['data']['activeCalls'];
                _this.activeChannels = _this.random(0, 100); // res['data']['activeChannels'];
                _this.callsCountInQueue = _this.random(0, 100); //res['data']['callsCountInQueue'];
                _this.sysInfoChartData = [
                    { data: [_this.Memory], label: 'Memory' },
                    { data: [_this.Cpu], label: 'Cpu' },
                    { data: [_this.ActiveStatus], label: 'ActiveStatus' },
                    { data: [_this.Hard], label: 'Hard' }
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
            }, function (error) {
                _this.authServe.handdleAuthErrors(error);
            });
            _this.lineChart1Data = [
                {
                    data: [100, 50, 50, 50, 50, 50, 50],
                    label: 'Series A'
                }
            ];
        }, 1000);
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
    };
    DashboardComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: 'dashboard.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [sysinfo_service_1.SysinfoService,
            authentication_service_1.AuthenticationService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map