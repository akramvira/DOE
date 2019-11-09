"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var reports_service_1 = require("../_service/reports.service");
var moment = require("jalali-moment");
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../../../../_services/authentication.service");
var web_service_1 = require("./web.service");
var shared_service_1 = require("../../../../_services/shared.service");
var select_item_component_1 = require("../_components/select-item/select-item.component");
var ngx_toastr_1 = require("ngx-toastr");
var GroupsBillsComponent = /** @class */ (function () {
    function GroupsBillsComponent(reportsServ, authService, webSerice, sharedService, toaster) {
        this.reportsServ = reportsServ;
        this.authService = authService;
        this.webSerice = webSerice;
        this.sharedService = sharedService;
        this.toaster = toaster;
        this.page = new Page();
        //------date
        this.dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
        this.minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.selectedDateFrom = new forms_1.FormControl("1398/01/01");
        this.selectedDateTo = new forms_1.FormControl("1398/01/01");
        this.time = new forms_1.FormControl("0");
        this.datePickerConfig = {};
        this.loadingData = false;
    }
    GroupsBillsComponent.prototype.ngOnInit = function () {
        this.setDate();
    };
    GroupsBillsComponent.prototype.onActivate = function (event) { };
    GroupsBillsComponent.prototype.setPage = function (pageInfo) {
        this.page.pageNumber = pageInfo.offset;
        this.page.size = 10;
        this.page.totalElements = 100;
        this.page.totalPages = 10;
        //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
        //this.page = {size:2,};//pagedData.page;
        //this.users = 4;//pagedData.data;
        // });
    };
    GroupsBillsComponent.prototype.setDate = function () {
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
    GroupsBillsComponent.prototype.toggleExpandGroup = function (group) {
        console.log("Toggled Expand Group!", group);
        this.table.groupHeader.toggleExpandGroup(group);
    };
    GroupsBillsComponent.prototype.onDetailToggle = function (event) {
        console.log("Detail Toggled", event);
    };
    GroupsBillsComponent.prototype.setActiveRow = function () { };
    GroupsBillsComponent.prototype.getBillsData = function () {
        var _this = this;
        var filterData = {};
        filterData["time"] = this.time.value;
        filterData["from"] = this.selectedDateFrom.value || '';
        filterData["to"] = this.selectedDateTo.value || '';
        var selectedItem = this.selectItem.getSelectedValue();
        if (this.time.value == "-1") {
            filterData['from'] = this.selectedDateFrom.value;
            filterData['to'] = this.selectedDateTo.value;
        }
        if (!selectedItem)
            this.toaster.warning('مورد اول مقایسه انتخاب نشده است');
        filterData['level'] = selectedItem['level'];
        filterData['idmain'] = selectedItem['id'];
        filterData['idsub'] = selectedItem['idSub'];
        filterData['idnumber'] = selectedItem['idnumber'];
        this.loadingData = true;
        this.webSerice.getBills(filterData).subscribe(function (data) {
            data = data['data'];
            var dataCount = 0;
            var billsData = new Array();
            _this.printDateTo = data['to'];
            _this.printDateFrom = data['from'];
            for (var i in data) {
                //      
                // if (i == "all") continue;
                // data["groupId"] = i;
                if (i == 'from' || i == 'to')
                    continue;
                dataCount++;
                var itemData = [];
                itemData['id'] = data[i]['id'];
                itemData['name'] = data[i]['name'];
                itemData['abonmah'] = data[i]['data']['abonmah'];
                itemData['betweanco'] = data[i]['data']['betweanco'];
                itemData['co'] = data[i]['data']['co'];
                itemData['mobile'] = data[i]['data']['mobile'];
                itemData['sum'] = data[i]['data']['sum'];
                billsData.push(itemData);
            }
            _this.bills = billsData;
            _this.page.pageNumber = 0;
            _this.page.size = 20;
            _this.setPage({ offset: 0 });
            _this.page.pageNumber = 1;
            _this.page.size = 10;
            _this.page.totalElements = dataCount;
            _this.page.totalPages = 10;
            _this.loadingData = false;
        }, function (error) {
            _this.loadingData = false;
            _this.authService.handdleAuthErrors(error);
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild('selectItem'),
        tslib_1.__metadata("design:type", select_item_component_1.SelectItemComponent)
    ], GroupsBillsComponent.prototype, "selectItem", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("billsTable"),
        tslib_1.__metadata("design:type", Object)
    ], GroupsBillsComponent.prototype, "table", void 0);
    GroupsBillsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-groups-bills",
            templateUrl: "./groups-bills.component.html",
            styleUrls: ["./groups-bills.component.scss"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [reports_service_1.ReportsService,
            authentication_service_1.AuthenticationService,
            web_service_1.WebService,
            shared_service_1.SharedService,
            ngx_toastr_1.ToastrService])
    ], GroupsBillsComponent);
    return GroupsBillsComponent;
}());
exports.GroupsBillsComponent = GroupsBillsComponent;
var Page = /** @class */ (function () {
    function Page() {
        //The number of elements in the page
        this.size = 0;
        //The total number of elements
        this.totalElements = 0;
        //The total number of pages
        this.totalPages = 0;
        //The current page number
        this.pageNumber = 0;
    }
    return Page;
}());
//# sourceMappingURL=groups-bills.component.js.map