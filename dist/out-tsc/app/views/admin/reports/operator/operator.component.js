"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var web_service_1 = require("./web.service");
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../../../../_services/authentication.service");
var core_2 = require("@angular/core");
var shared_service_1 = require("../../../../_services/shared.service");
var daterange_component_1 = require("../_components/daterange/daterange.component");
var globals_1 = require("../../../../_services/globals");
var ngx_toastr_1 = require("ngx-toastr");
var OperatorComponent = /** @class */ (function () {
    function OperatorComponent(webService, authServe, sharedService, toaster) {
        this.webService = webService;
        this.authServe = authServe;
        this.sharedService = sharedService;
        this.toaster = toaster;
        this.inPerformanceLabel = ['عملکرد'];
        this.inPerformanceColors = [
            {
                backgroundColor: ["#20a8d8", "#eeeeee"]
            }
        ];
        this.inPercentsColors = [
            {
                backgroundColor: ["#a5deb9", "#f86c6b", '#ffda6a']
            }
        ];
        this.inPerformanceData = [1, 100];
        this.inDetailsPercent = [1, 0, 0];
        this.outDetailsPercent = [1, 0, 0];
        this.allData = [];
        this.globData = [];
        this.mainDropdownSettings = {};
        this.operatorSelect = new forms_1.FormControl();
        this.loadingData = false;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ["عملکرد کل سیستم"];
        this.detailPercentLabelsIn = [' پاسخ داده شده', ' پاسخ داده نشده', ' مشغول'];
        this.detailPercentLabelsOut = [' بین شهری', ' شهری', ' موبایل'];
        this.barChartDataIn = [
            { data: [0], label: "کل تماس ها" },
            { data: [0], label: " پاسخ داده شده" },
            { data: [0], label: " پاسخ داده نشده" },
            { data: [0], label: "مشغول" }
        ];
        this.barChartDataTimeIn = [
            { data: [0], label: "مدت زمان کل مکالمات" },
            { data: [0], label: " مدت زمان میانگین مکالمات" },
        ];
        this.barChartDataOut = [
            { data: [0], label: "کل تماس ها" },
            { data: [0], label: "شهری" },
            { data: [0], label: "بین شهری" },
            { data: [0], label: "موبایل" }
        ];
        this.barChartDataTimeOut = [
            { data: [0], label: "مدت زمان کل مکالمات" },
            { data: [0], label: " مدت زمان میانگین مکالمات" },
        ];
    }
    OperatorComponent.prototype.onSelectDate = function () {
        // this.updateCharts();
    };
    OperatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webService.getAllOperator().subscribe(function (data) {
            _this.operators = data;
        }, function (error) {
            _this.authServe.handdleAuthErrors(error);
        });
        this.mainDropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "name",
            selectAllText: "انتخاب همه",
            unSelectAllText: "حذف همه موارد",
            searchPlaceholderText: "جستجو",
            itemsShowLimit: 1,
            noDataAvailablePlaceholderText: "بدون اطلاعات",
            limitSelection: 1,
            allowSearchFilter: true
        };
    };
    OperatorComponent.prototype.updateCharts = function () {
        var _this = this;
        this.loadingData = true;
        var data = {
            id: globals_1.Globals.fetchData(this.operatorSelect.value, false),
            from: this.dateRange.selectedDateFrom.value,
            to: this.dateRange.selectedDateTo.value
        };
        if (!data.id) {
            this.loadingData = false;
            this.toaster.warning('اپراتوری انتخاب نشده است.');
            return;
        }
        this.webService.getOperatorData(data).subscribe(function (data) {
            data = data["data"];
            _this.phoneNumber = data['phonenumber'];
            _this.data_login = data['data_login'];
            _this.data_logout = data['data_logout'];
            data = data["data"];
            _this.barChartDataIn = [
                { data: [data["in"]["all"]], label: "کل تماس ها" },
                { data: [data["in"]["answer"]], label: " پاسخ داده شده" },
                { data: [data["in"]["noanswer"]], label: " پاسخ داده نشده" },
                { data: [data["in"]["busy"]], label: " مشغول" }
            ];
            _this.inDetailsPercent = [data["in"]['panswer'], data["in"]['pnoanswer'], data["in"]['pbusy']];
            _this.outDetailsPercent = [data["out"]['pbetweenco'], data["out"]['pco'], data["out"]['pmobile']];
            _this.barChartDataTimeIn = [
                { data: [data['in']["time"]], label: "مدت زمان کل مکالمات" },
                { data: [data['in']["avg"]], label: " مدت زمان میانگین مکالمات" },
            ];
            _this.barChartDataTimeOut = [
                { data: [data['out']["time"]], label: "مدت زمان کل مکالمات" },
                { data: [data['out']["avg"]], label: " مدت زمان میانگین مکالمات" },
            ];
            _this.inPerformanceData = [
                data["in"]["performance"],
                100 - data["in"]["performance"]
            ];
            _this.barChartDataOut = [
                { data: [data["out"]["all"]], label: "کل تماس ها" },
                { data: [data["out"]["co"]], label: "شهری" },
                { data: [data["out"]["betweenco"]], label: "بین شهری" },
                { data: [data["out"]["mobile"]], label: "موبایل" }
            ];
            _this.loadingData = false;
        }, function (error) {
            _this.loadingData = false;
            _this.authServe.handdleAuthErrors(error);
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild('daterange'),
        tslib_1.__metadata("design:type", daterange_component_1.DaterangeComponent)
    ], OperatorComponent.prototype, "dateRange", void 0);
    OperatorComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-operator',
            templateUrl: './operator.component.html',
            styleUrls: ['./operator.component.scss'],
            encapsulation: core_2.ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            shared_service_1.SharedService,
            ngx_toastr_1.ToastrService])
    ], OperatorComponent);
    return OperatorComponent;
}());
exports.OperatorComponent = OperatorComponent;
//# sourceMappingURL=operator.component.js.map