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
var PerformanceL3Component = /** @class */ (function () {
    function PerformanceL3Component(webServ, authServe, sharedService, toaster) {
        this.webServ = webServ;
        this.authServe = authServe;
        this.sharedService = sharedService;
        this.toaster = toaster;
        this.asDropdownSettings = {};
        this.officeDropdownSettings = {};
        this.lineDropdownSettings = {};
        this.groups = new Array();
        this.filters = new forms_1.FormGroup({
            time: new forms_1.FormControl(0),
            type: new forms_1.FormControl(0),
            inorout: new forms_1.FormControl("in"),
            disposition: new forms_1.FormControl(0),
            selectedItems: new forms_1.FormControl([]),
            selectedSub1: new forms_1.FormControl([]),
            selectedSub2: new forms_1.FormControl([])
        });
        this.allSub1Data = [];
        this.offices = this.filters.value.selectedItems[0]
            ? this.allSub1Data[this.filters.value.selectedItems[0]["id"]]
            : [];
        this.lines = [];
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
        this.datePickerConfig = {};
        this.initingData = false;
        this.loadingData = false;
        //--------------------------------
        this.selectedGroups = this.filters.value.selectedItems;
        this.showAnsweredCalls = true;
        this.showNoAnsweredCalls = true;
        this.showLineAllCalls = true;
    }
    PerformanceL3Component.prototype.activeFilter = function (event) {
        var elem = event.target.element;
        this.filters.value.time;
    };
    PerformanceL3Component.prototype.onSelectAll = function (item) { };
    PerformanceL3Component.prototype.onItemSelect = function (item) {
        this.offices = this.allSub1Data[item["id"]];
        this.filters.patchValue({
            selectedSub1: []
        });
        this.updateLines();
    };
    PerformanceL3Component.prototype.onDeSelectMain = function () {
        this.offices = [];
        this.filters.patchValue({
            selectedSub1: [],
            selectedSub2: []
        });
        this.updateLines();
        return;
    };
    PerformanceL3Component.prototype.onDeSelectSub1 = function (item) {
        this.updateLines();
    };
    PerformanceL3Component.prototype.updateLines = function () {
        var _this = this;
        var sub1 = [];
        for (var i in this.filters.value.selectedSub1) {
            sub1.push(this.filters.value.selectedSub1[i]["id"]);
        }
        var data = {
            idmain: (this.filters.value.selectedItems[0] && this.filters.value.selectedItems[0]["id"]) ?
                this.filters.value.selectedItems[0]['id'] : '',
            idsub: sub1.join(",")
        };
        this.webServ.getNumbers(data).subscribe(function (data) {
            _this.lines = data["data"];
            _this.filters.patchValue({
                selectedSub2: []
            });
        }, function (error) {
            _this.authServe.handdleAuthErrors(error);
        });
    };
    PerformanceL3Component.prototype.officeSelected = function (item) {
        this.updateLines();
    };
    PerformanceL3Component.prototype.ngOnInit = function () {
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
            limitSelection: 1,
            allowSearchFilter: true
        };
        this.lineDropdownSettings = {
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
            _this.updateLines();
        }, function (error) {
            _this.authServe.handdleAuthErrors(error);
        });
    };
    PerformanceL3Component.prototype.updateCharts = function () {
        this.mainLabels = [];
        for (var i in this.filters.value.selectedSub2) {
            this.mainLabels.push(this.filters.value.selectedSub2[i]["name"]);
        }
        this.lineChartLabels = this.mainLabels;
        this.getOneGroupData();
    };
    PerformanceL3Component.prototype.getOneGroupData = function () {
        var _this = this;
        var filterData = this.filters.getRawValue();
        if (!filterData.selectedSub2.length) {
            this.toaster.warning('لطفا داخلی مورد نظر را انتخاب کنید.');
            return;
        }
        if (!((filterData.selectedItems.length && filterData.selectedSub1.length) ||
            (!filterData.selectedItems.length && !filterData.selectedSub1.length))) {
            this.toaster.warning('لطفا معاونت و اداره را انتخاب کنید');
            return;
        }
        filterData["idsub"] = [];
        filterData["id"] = filterData.selectedItems.length ? filterData.selectedItems[0]["id"] : '';
        for (var item in filterData.selectedSub1) {
            filterData["idsub"].push(filterData.selectedSub1[item]["id"]);
        }
        filterData["idnumber"] = [];
        for (var item in this.lines) {
            filterData["idnumber"].push(this.lines[item]["id"]);
        }
        filterData["idnumber"] = filterData["idnumber"].join(',');
        filterData["idsub"] = filterData["idsub"].join(",");
        if (filterData.time == "-1") {
            (filterData.from = this.dateRange.selectedDateFrom.value),
                (filterData.to = this.dateRange.selectedDateTo.value);
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
    PerformanceL3Component.prototype.onSelectDate = function () {
        this.getOneGroupData();
    };
    tslib_1.__decorate([
        core_1.ViewChild('daterange'),
        tslib_1.__metadata("design:type", daterange_component_1.DaterangeComponent)
    ], PerformanceL3Component.prototype, "dateRange", void 0);
    PerformanceL3Component = tslib_1.__decorate([
        core_1.Component({
            selector: "app-performance-l3",
            templateUrl: "./performance-l3.component.html",
            styleUrls: ["./performance-l3.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            shared_service_1.SharedService,
            ngx_toastr_1.ToastrService])
    ], PerformanceL3Component);
    return PerformanceL3Component;
}());
exports.PerformanceL3Component = PerformanceL3Component;
//# sourceMappingURL=performance-l3.component.js.map