"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var reports_service_1 = require("../_service/reports.service");
var forms_1 = require("@angular/forms");
var moment = require("jalali-moment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var LinesComponent = /** @class */ (function () {
    function LinesComponent(reportsServ, authServe) {
        this.reportsServ = reportsServ;
        this.authServe = authServe;
        this.dropdownSettings = {};
        this.groups = new Array();
        this.filters = new forms_1.FormGroup({
            time: new forms_1.FormControl("daily"),
            type: new forms_1.FormControl("all"),
            inorout: new forms_1.FormControl("all"),
            selectedItems: new forms_1.FormControl([])
        });
        this.dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
        this.selectedDateFrom = new forms_1.FormControl("98/01/01");
        this.selectedDateTo = new forms_1.FormControl("98/01/01");
        this.datePickerConfig = {
            format: "YY/MM/DD",
            theme: "dp-material"
        };
        this.selectedGroups = this.filters.value.selectedItems;
        this.showAnsweredCalls = false;
        this.showNoAnsweredCalls = false;
        this.showLineAllCalls = true;
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.performanceBarChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.performanceBarChartColors = [
            {
                backgroundColor: "#86c7f3"
            }
        ];
        this.dailyTimes = [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00"
        ];
        this.monthlyTimes = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30"
        ];
        this.yearlyTimes = [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"
        ];
        this.timeLabels = {
            daily: this.dailyTimes,
            monthly: this.monthlyTimes,
            yearly: this.yearlyTimes,
            choosely: ""
        };
        this.performanceBarChartLabels = this.dailyTimes;
        this.performanceBarChartType = "bar";
        this.performanceBarChartLegend = true;
        this.performanceBarChartData = [];
        this.callsBarChartLabels = this.dailyTimes;
        this.callsBarChartData = [];
        this.lineChartData = [];
        this.lineChartLabels = this.dailyTimes;
        this.lineChartColours = [
            {
                //
                backgroundColor: "rgba(255, 161, 181, 0.1)",
                borderColor: "rgba(255, 161, 181, 0.4)",
                pointBackgroundColor: "rgba(148,159,177,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            },
            {
                //
                backgroundColor: "rgba(77, 189, 116, 0.1)",
                borderColor: "rgba(77, 189, 116, 0.4)",
                pointBackgroundColor: "rgba(148,159,177,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            },
            {
                //
                backgroundColor: "rgba(255, 193, 7, 0.1)",
                borderColor: "rgba(255, 193, 7, 0.4)",
                pointBackgroundColor: "rgba(77,83,96,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(77,83,96,1)"
            },
            {
                //
                backgroundColor: "rgba(32, 168, 216, 0.1)",
                borderColor: "rgba(32, 168, 216, 0.4)",
                pointBackgroundColor: "rgba(148,159,177,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            }
        ];
    }
    LinesComponent.prototype.activeFilter = function (event) {
        var elem = event.target.element;
        this.filters.value.time;
    };
    LinesComponent.prototype.onSelectAll = function (item) { };
    LinesComponent.prototype.onItemSelect = function (item) {
        this.updateCharts();
    };
    LinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dropdownSettings = {
            singleSelection: false,
            idField: "item_id",
            textField: "item_text",
            selectAllText: "انتخاب همه",
            unSelectAllText: "حذف همه موارد",
            searchPlaceholderText: "جستجو",
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.filters.value.selectedItems;
        this.reportsServ.getExtensionsAndGroups().subscribe(function (data) {
            var groupesData = new Array();
            for (var i in data["groups"]) {
                groupesData.push({
                    item_id: i,
                    item_text: data["groups"][i]["name"]
                });
            }
            _this.groups = groupesData;
        }, function (error) {
            _this.authServe.handdleAuthErrors(error);
        });
        this.updateCharts();
    };
    LinesComponent.prototype.onActivate = function (event) {
        //debugger;
        if (event.type == "click") {
            // this.parentSelected = true;
            // this.selectedGroupExtensions = event.row.value.split(',');
            // this.convertSelectedGroupExtentionsToInt();
            // this.setRemainingExtensions();
            // this.activeParentId =  event.row.id;
            // this.itemsChanged = false;
        }
    };
    LinesComponent.prototype.onSelectGroup = function (selectedRows) {
        this.selectedGroups = selectedRows["selected"];
        this.selectedGroups.length;
        this.updateCharts();
    };
    LinesComponent.prototype.updateCharts = function () {
        var _this = this;
        var filterData = this.filters.getRawValue();
        this.lineChartLabels = this.timeLabels[filterData.time];
        this.callsBarChartLabels = this.timeLabels[filterData.time];
        this.performanceBarChartLabels = this.timeLabels[filterData.time];
        if (filterData.selectedItems.length == 1) {
            filterData["id"] = filterData.selectedItems[0]["item_id"];
            this.reportsServ.getGroupPerformance(filterData).subscribe(function (data) {
                _this.lineChartData = [];
                _this.callsBarChartData = [];
                _this.performanceBarChartData = [];
                var allCalsData = [];
                var answeredData = [];
                var noAnsweredData = [];
                var performanceData = [];
                for (var index in data) {
                    allCalsData.push(data[index]["all"]);
                    answeredData.push(data[index]["answer"]);
                    noAnsweredData.push(data[index]["noanswer"]);
                    performanceData.push(data[index]["noanswer"]);
                }
                _this.callsBarChartData = [
                    { data: allCalsData, label: "همه" },
                    { data: answeredData, label: "پاسخ داده شده" },
                    { data: noAnsweredData, label: "پاسخ داده نشده" }
                ];
                var allCalls = _this.showLineAllCalls
                    ? { data: allCalsData, label: "همه" }
                    : {};
                var answerCalls = _this.showAnsweredCalls
                    ? { data: answeredData, label: "پاسخ داده شده" }
                    : {};
                var noanswerCalls = _this.showNoAnsweredCalls
                    ? { data: noAnsweredData, label: "پاسخ داده نشده" }
                    : {};
                _this.lineChartData = [allCalls, answerCalls, noanswerCalls];
                _this.pieChartData = [];
                _this.performanceBarChartData = [
                    { data: performanceData, label: "عملکرد گروه" }
                ];
            }, function (error) {
                _this.authServe.handdleAuthErrors(error);
            });
        }
        else if (filterData.selectedItems.length > 1) {
            filterData.selectedItems.forEach(function (item) {
                filterData["id"].push(item["item_id"]);
            });
            this.reportsServ.getGroupPerformance(filterData).subscribe(function (data) {
                _this.lineChartLabels = _this.timeLabels[_this.filters.value.time];
                _this.callsBarChartLabels = _this.timeLabels[_this.filters.value.time];
                var allCalsData = [];
                var answeredData = [];
                var noAnsweredData = [];
                var performanceData = [];
                _this.filters.value.selectedItems.forEach(function (item) {
                    allCalsData.push(item["all"]);
                    answeredData.push(item["answer"]);
                    noAnsweredData.push(item["noanswer"]);
                    performanceData.push(item["noanswer"]);
                });
                _this.callsBarChartData = [
                    { data: allCalsData, label: "همه" },
                    { data: answeredData, label: "پاسخ داده شده" },
                    { data: noAnsweredData, label: "پاسخ داده نشده" }
                ];
            }, function (error) {
                _this.authServe.handdleAuthErrors(error);
            });
        }
    };
    LinesComponent.prototype.onSelectDate = function () { };
    LinesComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-lines",
            templateUrl: "./lines.component.html",
            styleUrls: ["./lines.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [reports_service_1.ReportsService,
            authentication_service_1.AuthenticationService])
    ], LinesComponent);
    return LinesComponent;
}());
exports.LinesComponent = LinesComponent;
//# sourceMappingURL=lines.component.js.map