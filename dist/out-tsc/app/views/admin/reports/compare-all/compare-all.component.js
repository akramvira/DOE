"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("jalali-moment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var web_service_1 = require("./web.service");
var shared_service_1 = require("../../../../_services/shared.service");
var select_item_component_1 = require("../_components/select-item/select-item.component");
var ngx_toastr_1 = require("ngx-toastr");
var CompareAllComponent = /** @class */ (function () {
    function CompareAllComponent(webServ, authServe, sharedService, toaster) {
        this.webServ = webServ;
        this.authServe = authServe;
        this.sharedService = sharedService;
        this.toaster = toaster;
        this.filters = new forms_1.FormGroup({
            time: new forms_1.FormControl(0),
            type: new forms_1.FormControl(0),
            inorout: new forms_1.FormControl("in"),
            disposition: new forms_1.FormControl(0)
        });
        ////--------Charts And shared data Section------------------
        this.performanceBarChartColors = [
            {
                backgroundColor: "#86c7f3"
            }
        ];
        this.timeBarChartColors = [
            {
                backgroundColor: "#86c7f3"
            },
            {
                backgroundColor: "#4dbd74"
            }
        ];
        this.timeAvgChartColors = [
            {
                //cpu
                backgroundColor: "rgba(255, 161, 181, 0.2)",
                borderColor: "rgba(255, 161, 181, 0.9)",
                pointBackgroundColor: "rgba(255, 161, 181, 0.4)",
                pointBorderColor: "rgba(255, 161, 181, 0.4)",
                pointHoverBackgroundColor: "rgba(255, 161, 181, 0.4)",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            },
            {
                // ram
                backgroundColor: "rgba(77, 189, 116, 0)",
                borderColor: "rgba(77, 189, 116, 0.9)",
                pointBackgroundColor: "rgba(77, 189, 116, 0.4)",
                pointBorderColor: "rgba(77, 189, 116, 0.4)",
                pointHoverBackgroundColor: "rgba(77, 189, 116, 0.4)",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            }
        ];
        this.mainLabels = [];
        this.performanceChartLabels = this.mainLabels;
        this.performanceChartData = [{ data: [], label: "" }];
        this.callsBarChartLabels = this.mainLabels;
        this.callsDetailsData = [
            { data: [], label: "" },
            { data: [], label: "" },
            { data: [], label: "" }
        ];
        this.timesChartLabels = this.mainLabels;
        this.timesChartData = [{ data: [], label: "" }];
        this.timesAvgChartData = [
            { data: [], label: "" },
            { data: [], label: "" }
        ];
        this.loadTimeLabels = false;
        this.allCallsData = [{ data: [], label: "" }];
        this.lineChartLabels = this.mainLabels;
        //------date
        this.dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
        this.minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.selectedDateFrom = new forms_1.FormControl("1398/01/01");
        this.selectedDateTo = new forms_1.FormControl("1398/01/01");
        this.datePickerConfig = {};
        this.initingData = false;
        this.loadingData = false;
    }
    CompareAllComponent.prototype.activeFilter = function (event) {
        // let elem = event.target.element;
        // this.filters.value.time;
    };
    CompareAllComponent.prototype.ngOnInit = function () {
        this.setDate();
    };
    CompareAllComponent.prototype.setDate = function () {
        var _this = this;
        if (this.sharedService.minMaxTime.value) {
            this.minDate = this.sharedService.minMaxTime.value.min;
            this.maxDate = this.sharedService.minMaxTime.value.max;
            this.selectedDateFrom.setValue(this.minDate);
            this.selectedDateTo.setValue(this.maxDate);
            this.datePickerConfig = {
                format: "jYYYY/MM/DD",
                theme: "dp-material",
                min: moment(this.minDate, "jYYYY,jMM,jDD"),
                max: moment(this.maxDate, "jYYYY,jMM,jDD"),
                showGoToCurrent: true,
                hideOnOutsideClick: true,
                showNearMonthDays: true
            };
        }
        this.sharedService.minMaxTime.subscribe(function (data) {
            _this.minDate = data["min"];
            _this.maxDate = data["max"];
            _this.selectedDateFrom.setValue(_this.minDate);
            _this.selectedDateTo.setValue(_this.maxDate);
            _this.datePickerConfig = {
                format: "jYYYY/MM/DD",
                theme: "dp-material",
                min: moment(_this.minDate, "jYYYY,jMM,jDD"),
                max: moment(_this.maxDate, "jYYYY,jMM,jDD"),
                showGoToCurrent: true,
                hideOnOutsideClick: true,
                showNearMonthDays: true
            };
        });
    };
    //--------------------------------
    CompareAllComponent.prototype.updateCharts = function () {
        this.getOneGroupData();
    };
    CompareAllComponent.prototype.getOneGroupData = function () {
        var _this = this;
        var filterData = this.filters.getRawValue();
        var select1Value1 = this.select1.getSelectedValue();
        var select1Value2 = this.select2.getSelectedValue();
        if (filterData.time == "-1") {
            filterData.from = this.selectedDateFrom.value;
            filterData.to = this.selectedDateTo.value;
        }
        if (!select1Value1 || !select1Value2) {
            if (!select1Value1)
                this.toaster.warning('مورد اول مقایسه انتخاب نشده است');
            if (!select1Value2)
                this.toaster.warning('مورد دوم مقایسه انتخاب نشده است');
            return;
        }
        filterData['level1'] = select1Value1['level'];
        filterData['idmain1'] = select1Value1['id'];
        filterData['idsub1'] = select1Value1['idSub'];
        filterData['idnumber1'] = select1Value1['idnumber'];
        filterData['level2'] = select1Value2['level'];
        filterData['idmain2'] = select1Value2['id'];
        filterData['idsub2'] = select1Value2['idSub'];
        filterData['idnumber2'] = select1Value2['idnumber'];
        this.mainLabels = [select1Value1['label'], select1Value2['label']];
        filterData.time = parseInt(filterData.time);
        this.loadingData = true;
        console.log(filterData);
        this.webServ.getGroupPerformance(filterData).subscribe(function (data) {
            data = data["data"];
            var allCalsData = [];
            var answeredData = [];
            var noAnsweredData = [];
            var bussy = [];
            var performanceData = [];
            var timesData = [];
            var avgTimesData = [];
            var avgAll = [];
            for (var index in data) {
                var itemChartData = data[index]["data"];
                //   this.mainLabels.push(data[index]["name"]);
                allCalsData.push(itemChartData["all"]);
                answeredData.push(itemChartData["answer"]);
                noAnsweredData.push(itemChartData["noanswer"]);
                bussy.push(itemChartData["busy"]);
                performanceData.push(itemChartData["performane"]);
                timesData.push(itemChartData["time"]);
                avgTimesData.push(itemChartData["avg"]);
                avgAll.push(itemChartData["avgall"]);
            }
            _this.allCallsData = [{ data: allCalsData, label: "تعداد کل تماس ها" }];
            _this.callsDetailsData = [
                { data: answeredData, label: "تعداد تماس پاسخ داده شده" },
                { data: noAnsweredData, label: "تعداد تماس پاسخ داده نشده" },
                { data: bussy, label: "تعداد تماس های مشغول" }
            ];
            _this.timesChartData = [{ data: timesData, label: "مدت زمان مکالمه" }];
            _this.loadTimeLabels = true;
            _this.timesAvgChartData = [
                { data: avgTimesData, label: "میانگین زمان هر بخش" },
                { data: avgAll, label: "میانگین زمان کل" }
            ];
            var allCalls = { data: allCalsData, label: " تعداد کل تماس ها" };
            _this.allCallsData = [allCalls];
            _this.performanceChartData = [
                { data: performanceData, label: "عملکرد گروه(درصد)" }
            ];
            _this.loadingData = false;
            _this.initingData = false;
        }, function (error) {
            _this.loadingData = false;
            _this.initingData = false;
            _this.authServe.handdleAuthErrors(error);
        });
    };
    CompareAllComponent.prototype.resetCharts = function () {
        this.allCallsData = [{ data: [], label: "تعداد کل تماس ها" }];
        this.callsDetailsData = [
            { data: [], label: "تعداد تماس پاسخ داده شده" },
            { data: [], label: "تعداد تماس پاسخ داده نشده" },
            { data: [], label: "تعداد تماس های مشغول" }
        ];
        this.timesChartData = [{ data: [], label: "مدت زمان مکالمه" }];
        this.loadTimeLabels = true;
        this.timesAvgChartData = [
            { data: [], label: "میانگین زمان هر بخش" },
            { data: [], label: "میانگین زمان کل" }
        ];
        var allCalls = { data: [], label: " تعداد کل تماس ها" };
        this.allCallsData = [allCalls];
        this.performanceChartData = [
            { data: [], label: "عملکرد گروه(درصد)" }
        ];
    };
    CompareAllComponent.prototype.onSelectDate = function () {
        this.getOneGroupData();
    };
    tslib_1.__decorate([
        core_1.ViewChild('select1'),
        tslib_1.__metadata("design:type", select_item_component_1.SelectItemComponent)
    ], CompareAllComponent.prototype, "select1", void 0);
    tslib_1.__decorate([
        core_1.ViewChild('select2'),
        tslib_1.__metadata("design:type", select_item_component_1.SelectItemComponent)
    ], CompareAllComponent.prototype, "select2", void 0);
    CompareAllComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-compare-all",
            templateUrl: "./compare-all.component.html",
            styleUrls: ["./compare-all.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            shared_service_1.SharedService,
            ngx_toastr_1.ToastrService])
    ], CompareAllComponent);
    return CompareAllComponent;
}());
exports.CompareAllComponent = CompareAllComponent;
//# sourceMappingURL=compare-all.component.js.map