"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("jalali-moment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var web_service_1 = require("./web.service");
var ngx_toastr_1 = require("ngx-toastr");
var shared_service_1 = require("../../../../_services/shared.service");
var PerformanceL1Component = /** @class */ (function () {
    function PerformanceL1Component(webServ, authServe, toaster, sharedService) {
        this.webServ = webServ;
        this.authServe = authServe;
        this.toaster = toaster;
        this.sharedService = sharedService;
        this.dropdownSettings = {};
        this.groups = new Array();
        this.filters = new forms_1.FormGroup({
            time: new forms_1.FormControl(0),
            type: new forms_1.FormControl(0),
            inorout: new forms_1.FormControl("in"),
            disposition: new forms_1.FormControl(0),
            selectedItems: new forms_1.FormControl([])
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
            },
        ];
        this.mainLabels = [];
        this.performanceChartLabels = this.mainLabels;
        this.performanceChartData = [{ data: [], label: '' }];
        this.callsBarChartLabels = this.mainLabels;
        this.callsDetailsData = [{ data: [], label: '' }, { data: [], label: '' }, { data: [], label: '' }];
        this.timesChartLabels = this.mainLabels;
        this.timesChartData = [{ data: [], label: '' }];
        this.timesAvgChartData = [{ data: [], label: '' }, { data: [], label: '' }];
        this.loadTimeLabels = false;
        this.allCallsData = [{ data: [], label: '' }];
        this.lineChartLabels = this.mainLabels;
        this.dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
        this.minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.selectedDateFrom = new forms_1.FormControl("1398/01/01");
        this.selectedDateTo = new forms_1.FormControl("1398/01/01");
        this.datePickerConfig = {};
        this.initingData = false;
        this.loadingData = false;
        this.selectedGroups = this.filters.value.selectedItems;
        this.showAnsweredCalls = true;
        this.showNoAnsweredCalls = true;
        this.showLineAllCalls = true;
    }
    //--------------------------------
    PerformanceL1Component.prototype.setDate = function () {
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
            _this.minDate = data['min'];
            _this.maxDate = data['max'];
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
    PerformanceL1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.setDate();
        this.initingData = true;
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
        var data = [];
        this.webServ.getExtensionsAndGroups().subscribe(function (data) {
            data = data["data"];
            var groupesData = new Array();
            for (var i in data) {
                groupesData.push({
                    item_id: data[i]["id"],
                    item_text: data[i]["name"]
                });
            }
            _this.groups = groupesData;
            _this.filters.patchValue({
                selectedItems: []
            });
            // this.updateCharts();
            _this.initingData = false;
            _this.toaster.warning('لطفا جهت نمایش آمار، ابتدا فیلتر مورد نظر را انتخاب کرده و روی دکمه فیلتر کلیک کنید.', 'پیغام سیستم');
        }, function (error) {
            _this.initingData = false;
            _this.toaster.warning('لطفا جهت نمایش آمار، ابتدا فیلتر مورد نظر را انتخاب کرده و روی دکمه فیلتر کلیک کنید.', 'پیغام سیستم');
            _this.authServe.handdleAuthErrors(error);
        });
    };
    PerformanceL1Component.prototype.activeFilter = function (event) {
        var elem = event.target.element;
        this.filters.value.time;
    };
    PerformanceL1Component.prototype.onSelectAll = function (item) { };
    PerformanceL1Component.prototype.onItemSelect = function (item) {
        var labels = [];
        for (var index in this.filters.value.selectedItems) {
            labels.push(this.filters.value.selectedItems[index]["item_text"]);
        }
        this.mainLabels = labels;
        //this.updateCharts();
    };
    PerformanceL1Component.prototype.onActivate = function (event) {
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
    PerformanceL1Component.prototype.onSelectGroup = function (selectedRows) {
        this.selectedGroups = selectedRows["selected"];
        this.selectedGroups.length;
        // this.updateCharts();
    };
    PerformanceL1Component.prototype.updateCharts = function () {
        var filterData = this.filters.getRawValue();
        this.lineChartLabels = this.mainLabels;
        this.callsBarChartLabels = this.mainLabels;
        this.performanceChartLabels = this.mainLabels;
        var labels = [];
        for (var index in this.filters.value.selectedItems) {
            labels.push(this.filters.value.selectedItems[index]["item_text"]);
        }
        this.mainLabels = labels;
        this.getChartsData(filterData);
    };
    PerformanceL1Component.prototype.getChartsData = function (filterData) {
        var _this = this;
        filterData["id"] = [];
        if (filterData.selectedItems.length == 0)
            return;
        for (var item in filterData.selectedItems) {
            filterData["id"].push(filterData.selectedItems[item]["item_id"]);
        }
        filterData["id"] = filterData["id"].join(",");
        if (filterData.time == "-1") {
            (filterData.from = this.selectedDateFrom.value),
                (filterData.to = this.selectedDateTo.value);
        }
        if (!filterData["id"]) {
            this.toaster.warning('لطفا یک معاونت انتخاب کنید.');
            return;
        }
        filterData.time = parseInt(filterData.time);
        this.loadingData = true;
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
            _this.mainLabels = [];
            for (var index in data) {
                var itemChartData = data[index]["data"];
                _this.mainLabels.push(data[index]["name"]);
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
            _this.timesChartData = [
                { data: timesData, label: "مدت زمان مکالمه" }
            ];
            _this.loadTimeLabels = true;
            _this.timesAvgChartData = [
                { data: avgTimesData, label: "میانگین زمان هر بخش" },
                { data: avgAll, label: "میانگین زمان کل" }
            ];
            console.log(_this.timesAvgChartData);
            var allCalls = _this.showLineAllCalls
                ? { data: allCalsData, label: " تعداد کل تماس ها" }
                : { data: [], label: " تعداد کل تماس ها" };
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
    PerformanceL1Component.prototype.resetCharts = function () {
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
    PerformanceL1Component.prototype.onSelectDate = function () {
        this.getChartsData(this.filters.getRawValue());
    };
    PerformanceL1Component = tslib_1.__decorate([
        core_1.Component({
            selector: "app-performance-l1",
            templateUrl: "./performance-l1.component.html",
            styleUrls: ["./performance-l1.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService,
            shared_service_1.SharedService])
    ], PerformanceL1Component);
    return PerformanceL1Component;
}());
exports.PerformanceL1Component = PerformanceL1Component;
//# sourceMappingURL=performance-l1.component.js.map