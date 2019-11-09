"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var coreui_utilities_1 = require("@coreui/coreui/dist/js/coreui-utilities");
var coreui_plugin_chartjs_custom_tooltips_1 = require("@coreui/coreui-plugin-chartjs-custom-tooltips");
var sysinfo_service_1 = require("./_services/sysinfo.service");
var rxjs_1 = require("rxjs");
require("chartjs-plugin-labels");
var authentication_service_1 = require("../../../_services/authentication.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(apiServ, authServ) {
        this.apiServ = apiServ;
        this.authServ = authServ;
        this.radioModel = "Month";
        // mainChart
        this.mainChartElements = 27;
        this.mainChartData1 = [];
        this.mainChartData2 = [];
        this.mainChartData3 = [];
        this.mainChartData = [
            {
                data: this.mainChartData1,
                label: "Current"
            },
            {
                data: this.mainChartData2,
                label: "Previous"
            },
            {
                data: this.mainChartData3,
                label: "BEP"
            }
        ];
        /* tslint:disable:max-line-length */
        this.mainChartLabels = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Monday",
            "Thursday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ];
        /* tslint:enable:max-line-length */
        this.mainChartOptions = {
            tooltips: {
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips,
                intersect: true,
                mode: "index",
                position: "nearest",
                callbacks: {
                    labelColor: function (tooltipItem, chart) {
                        return {
                            backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor
                        };
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: function (value) {
                                return value.charAt(0);
                            }
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            stepSize: Math.ceil(250 / 5),
                            max: 250
                        }
                    }
                ]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3
                }
            },
            legend: {
                display: false
            }
        };
        this.mainChartColours = [
            {
                // brandInfo
                backgroundColor: coreui_utilities_1.hexToRgba(coreui_utilities_1.getStyle("--info"), 10),
                borderColor: coreui_utilities_1.getStyle("--info"),
                pointHoverBackgroundColor: "#fff"
            },
            {
                // brandSuccess
                backgroundColor: "transparent",
                borderColor: coreui_utilities_1.getStyle("--success"),
                pointHoverBackgroundColor: "#fff"
            },
            {
                // brandDanger
                backgroundColor: "transparent",
                borderColor: coreui_utilities_1.getStyle("--danger"),
                pointHoverBackgroundColor: "#fff",
                borderWidth: 1,
                borderDash: [8, 5]
            }
        ];
        this.mainChartLegend = false;
        this.mainChartType = "line";
        // system info Chart
        this.sysInfoChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.sysInfoChartLabels = ["value"];
        this.sysInfoChartType = "line";
        this.sysInfoChartLegend = true;
        this.Memory = 0; // this.random(0,100);
        this.swap = 0; // this.random(0,100);
        this.Cpu = 0; //this.random(0,100);
        this.ActiveStatus = 0; //this.random(0,100);
        this.Hard = {
            capacity: 0,
            use: 0,
            available: 0
        }; //this.random(0,100);
        this.sysInfoChartData = [
            { data: [this.Memory], label: "Memory" },
            { data: [this.Cpu], label: "Cpu" },
            { data: [this.ActiveStatus], label: "ActiveStatus" },
            { data: [this.Hard], label: "Hard" }
        ];
        this.loading = true;
        this.activeTrunks = 0;
        this.activeTime = 0;
        this.activeCalls = 0;
        this.activeChannels = 0;
        this.callsCountInQueue = 0;
        // Ram
        this.ramDoughnutChartLabels = ["در حال استفاده", "آزاد"];
        this.ramDoughnutChartData = [0, 100];
        this.ramChartColors = [
            {
                backgroundColor: ["#4dbd74", "rgba(228, 229, 230, 0.63)"]
            }
        ];
        // Hard
        this.hardDoughnutChartLabels = ["در حال استفاده", "آزاد"];
        this.hardDoughnutChartData = [0, 100];
        this.hardChartColors = [
            {
                backgroundColor: ["#20a8d8", "rgba(228, 229, 230, 0.63)"]
            }
        ];
        // Cpu
        this.cpuDoughnutChartLabels = ["در حال استفاده", "آزاد"];
        this.cpuDoughnutChartData = [0, 100];
        this.cpuChartColors = [
            {
                backgroundColor: ["#f86c6b", "rgba(228, 229, 230, 0.63)"]
            }
        ];
        // swap
        this.swapDoughnutChartLabels = ["در حال استفاده", "آزاد"];
        this.swapDoughnutChartData = [0, 100];
        this.swapChartColors = [
            {
                backgroundColor: ["#ffc107", "rgba(228, 229, 230, 0.63)"]
            }
        ];
        // lineChart
        this.showCpu = true;
        this.showMemory = true;
        this.showSwap = true;
        this.showActiveCalls = true;
        this.chartHsteps = 50;
        this.lineChartData = [
            { data: new Array(this.chartHsteps), label: "Cpu" },
            { data: new Array(this.chartHsteps), label: "Ram" },
            { data: new Array(this.chartHsteps), label: "Swap" },
            { data: new Array(this.chartHsteps), label: "Active Calls" }
        ];
        this.dashboardestroid = false;
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
        var chartsTimer = rxjs_1.interval(2000).subscribe(function (data) {
            if (_this.dashboardestroid)
                chartsTimer.unsubscribe();
            _this.apiServ.getSysInfo().subscribe(function (res) {
                res = res["data"];
                _this.Memory = res["ram"];
                _this.Cpu = res["cpu"];
                _this.swap = res["swap"];
                _this.Hard.capacity = res["hard"]["capacity"];
                _this.Hard.use = res["hard"]["use"];
                _this.Hard.available = res["hard"]["available"];
                _this.hardDoughnutChartData = [
                    res["hard"]["use"],
                    100 - res["hard"]["use"]
                ];
                _this.ramDoughnutChartData = [res["ram"], 100 - res["ram"]];
                _this.cpuDoughnutChartData = [res["cpu"], 100 - res["cpu"]];
                _this.swapDoughnutChartData = [res["swap"], 100 - res["swap"]];
                _this.activeTrunks = res["activeextensions"] || 0;
                _this.activeCalls = res["activecalls"] || 0;
                _this.activeTime = res["activetime"];
                _this.activeChannels = res["channels"];
                _this.callsCountInQueue = res["queue"];
                _this.sysInfoChartData = [
                    { data: [_this.Memory], label: "Memory" },
                    { data: [_this.Cpu], label: "Cpu" },
                    { data: [_this.ActiveStatus], label: "ActiveStatus" },
                    { data: [_this.Hard], label: "Hard" },
                    { data: [_this.Memory], label: "Memory" },
                    { data: [_this.Cpu], label: "Cpu" },
                    { data: [_this.ActiveStatus], label: "ActiveStatus" },
                    { data: [_this.Hard], label: "Hard" }
                ];
                if (_this.lineChartData[0].data.length > _this.chartHsteps) {
                    _this.lineChartData[0].data.shift();
                }
                if (_this.lineChartData[1].data.length > _this.chartHsteps) {
                    _this.lineChartData[1].data.shift();
                }
                if (_this.lineChartData[2].data.length > _this.chartHsteps) {
                    _this.lineChartData[2].data.shift();
                }
                if (_this.lineChartData[3].data.length > _this.chartHsteps) {
                    _this.lineChartData[3].data.shift();
                }
                _this.lineChartData = [
                    {
                        data: _this.showCpu
                            ? _this.lineChartData[0].data.concat([_this.Cpu]) : new Array(_this.chartHsteps),
                        label: "Cpu"
                    },
                    {
                        data: _this.showMemory
                            ? _this.lineChartData[1].data.concat([_this.Memory]) : new Array(_this.chartHsteps),
                        label: "Ram"
                    },
                    {
                        data: _this.showSwap
                            ? _this.lineChartData[2].data.concat([_this.swap]) : new Array(_this.chartHsteps),
                        label: "Swap"
                    },
                    {
                        data: _this.showActiveCalls
                            ? _this.lineChartData[3].data.concat([_this.activeCalls]) : new Array(_this.chartHsteps),
                        label: "Active Calls"
                    }
                ];
            }, function (error) {
                if (error.status == 400 ||
                    error.status == 403 ||
                    error.status == 401 ||
                    error.status == 404) {
                    _this.authServ.handdleAuthErrors(error);
                    chartsTimer.unsubscribe();
                }
            });
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.dashboardestroid = true;
    };
    DashboardComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "dashboard.component.html"
        }),
        tslib_1.__metadata("design:paramtypes", [sysinfo_service_1.SysinfoService,
            authentication_service_1.AuthenticationService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map