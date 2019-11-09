"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../../../../_services/authentication.service");
var web_service_1 = require("./web.service");
var shared_service_1 = require("../../../../_services/shared.service");
var daterange_component_1 = require("../_components/daterange/daterange.component");
var ngx_toastr_1 = require("ngx-toastr");
var PerformanceL2Component = /** @class */ (function () {
    function PerformanceL2Component(webServ, authServe, sharedService, toaster) {
        this.webServ = webServ;
        this.authServe = authServe;
        this.sharedService = sharedService;
        this.toaster = toaster;
        this.asDropdownSettings = {};
        this.officeDropdownSettings = {};
        this.groups = new Array();
        this.filters = new forms_1.FormGroup({
            time: new forms_1.FormControl(0),
            type: new forms_1.FormControl(0),
            inorout: new forms_1.FormControl("in"),
            disposition: new forms_1.FormControl(0),
            selectedItems: new forms_1.FormControl([]),
            selectedSub1: new forms_1.FormControl([])
        });
        this.allSub1Data = [];
        this.offices = this.filters.value.selectedItems[0]
            ? this.allSub1Data[this.filters.value.selectedItems[0]["id"]]
            : [];
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
        this.initingData = false;
        this.loadingData = false;
        //--------------------------------
        this.selectedGroups = this.filters.value.selectedItems;
        this.showAnsweredCalls = true;
        this.showNoAnsweredCalls = true;
        this.showLineAllCalls = true;
    }
    PerformanceL2Component.prototype.activeFilter = function (event) {
        var elem = event.target.element;
        this.filters.value.time;
    };
    PerformanceL2Component.prototype.onSelectAll = function (item) {
        //  this.updateCharts();
    };
    PerformanceL2Component.prototype.onItemSelect = function (item) {
        this.offices = this.allSub1Data[item["id"]];
        this.filters.patchValue({
            selectedSub1: []
        });
        //this.updateCharts();
    };
    PerformanceL2Component.prototype.onDeSelectMain = function () {
        this.offices = [];
        this.filters.patchValue({
            selectedSub1: []
        });
        return;
    };
    PerformanceL2Component.prototype.onDeSelectSub1 = function (item) {
        //this.updateCharts();
    };
    PerformanceL2Component.prototype.officeSelected = function (item) {
        // this.getChartsData();
    };
    PerformanceL2Component.prototype.ngOnInit = function () {
        var _this = this;
        this.asDropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "name",
            selectAllText: "انتخاب همه",
            unSelectAllText: "حذف همه موارد",
            searchPlaceholderText: "جستجو",
            itemsShowLimit: 1,
            limitSelection: 1,
            allowSearchFilter: true
        };
        this.officeDropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "name",
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
            _this.filters.patchValue({
                selectedItems: []
            });
            var groupesData = new Array();
            var selectedMain = 0;
            for (var i in data) {
                if (!selectedMain)
                    selectedMain = data[i];
                groupesData.push({
                    id: data[i]["id"],
                    name: data[i]["name"],
                    item_id: data[i]["id"],
                    item_text: data[i]["name"]
                });
                _this.allSub1Data[data[i]["id"]] = [];
                _this.allSub1Data[data[i]["id"]] = data[i]["sub"];
            }
            _this.groups = groupesData;
            _this.offices = _this.allSub1Data[selectedMain["id"]];
            _this.filters.patchValue({
                selectedItems: [],
                selectedSub1: []
            });
        }, function (error) {
            _this.authServe.handdleAuthErrors(error);
        });
    };
    PerformanceL2Component.prototype.updateCharts = function () {
        this.mainLabels = [];
        for (var i in this.filters.value.selectedSub1) {
            this.mainLabels.push(this.filters.value.selectedSub1[i]["name"]);
        }
        this.getChartsData();
    };
    PerformanceL2Component.prototype.getChartsData = function () {
        var _this = this;
        var filterData = this.filters.getRawValue();
        if (!filterData.selectedItems.length)
            return;
        if (!filterData.selectedSub1.length)
            return;
        filterData["idsub"] = [];
        filterData["id"] = filterData.selectedItems[0]["id"];
        for (var item in filterData.selectedSub1) {
            filterData["idsub"].push(filterData.selectedSub1[item]["id"]);
        }
        filterData["idsub"] = filterData["idsub"].join(",");
        if (filterData.time == "-1") {
            (filterData.from = this.dateRange.selectedDateFrom.value),
                (filterData.to = this.dateRange.selectedDateTo.value);
        }
        if (!filterData["idsub"] || !filterData["id"]) {
            this.toaster.warning('لطفا معاونت و اداره مورد نظر خود را انتخاب کنید.');
            return;
        }
        this.loadingData = true;
        filterData.time = parseInt(filterData.time);
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
            _this.timesChartData = [{ data: timesData, label: "مدت زمان مکالمه" }];
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
    PerformanceL2Component.prototype.onSelectDate = function () {
        this.getChartsData();
    };
    tslib_1.__decorate([
        core_1.ViewChild('daterange'),
        tslib_1.__metadata("design:type", daterange_component_1.DaterangeComponent)
    ], PerformanceL2Component.prototype, "dateRange", void 0);
    PerformanceL2Component = tslib_1.__decorate([
        core_1.Component({
            selector: "app-performance-l2",
            templateUrl: "./performance-l2.component.html",
            styleUrls: ["./performance-l2.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            shared_service_1.SharedService,
            ngx_toastr_1.ToastrService])
    ], PerformanceL2Component);
    return PerformanceL2Component;
}());
exports.PerformanceL2Component = PerformanceL2Component;
//# sourceMappingURL=performance-l2.component.js.map