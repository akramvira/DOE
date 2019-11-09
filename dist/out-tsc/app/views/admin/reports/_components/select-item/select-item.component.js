"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var web_service_1 = require("./web.service");
var authentication_service_1 = require("../../../../../_services/authentication.service");
var forms_1 = require("@angular/forms");
var SelectItemComponent = /** @class */ (function () {
    function SelectItemComponent(webServ, authServe) {
        this.webServ = webServ;
        this.authServe = authServe;
        //---------------------selected items ----------------
        this.mainDropdownSettings = {};
        this.officeDropdownSettings = {};
        this.lineDropdownSettings = {};
        this.groups = new Array();
        this.allSub1Data = [];
        //---------------------item 1 ----------------
        this.selectedItem1 = new forms_1.FormGroup({
            level: new forms_1.FormControl("0"),
            main: new forms_1.FormControl(),
            sub1: new forms_1.FormControl(),
            sub2: new forms_1.FormControl()
        });
        this.selectedItem2 = new forms_1.FormGroup({
            level: new forms_1.FormControl("0"),
            main: new forms_1.FormControl(),
            sub1: new forms_1.FormControl(),
            sub2: new forms_1.FormControl()
        });
        this.activeSub1_1 = [];
        this.activeSub1_2 = [];
        this.lines = [];
        this.isMultipleSelectionPossible = false;
        this.selectedGroups = this.selectedItem1.value.main;
    }
    SelectItemComponent.prototype.ngOnInit = function () {
        this.id1 = '_' + Math.random().toString(36).substr(2, 9);
        this.id2 = '_' + (Math.random() + 1).toString(36).substr(2, 9);
        this.id3 = '_' + (Math.random() + 2).toString(36).substr(2, 9);
        this.getAllLevelsData();
        this.updateDropdownsSetting();
    };
    SelectItemComponent.prototype.itemsValue = function () {
        return "hi its value";
    };
    SelectItemComponent.prototype.getAllLevelsData = function () {
        var _this = this;
        this.webServ.getExtensionsAndGroups().subscribe(function (data) {
            data = data["data"];
            _this.selectedItem1.patchValue({
                main: 0
            });
            var mainData = new Array();
            var selectedMain = 0;
            for (var i in data) {
                if (!selectedMain)
                    selectedMain = data[i];
                mainData.push({
                    id: data[i]["id"],
                    name: data[i]["name"],
                    item_id: data[i]["id"],
                    item_text: data[i]["name"]
                });
                _this.allSub1Data[data[i]["id"]] = [];
                _this.allSub1Data[data[i]["id"]] = data[i]["sub"];
            }
            _this.groups = mainData;
            _this.activeSub1_1 = _this.allSub1Data[selectedMain["id"]];
            _this.activeSub1_2 = _this.allSub1Data[selectedMain["id"]];
        }, function (error) {
            _this.authServe.handdleAuthErrors(error);
        });
    };
    SelectItemComponent.prototype.updateDropdownsData1 = function () {
        this.updateDropdownsSetting();
        //clear sub1
        this.activeSub1_1 = [];
        this.selectedItem1.patchValue({
            main: [],
            sub1: [],
            sub2: []
        });
        if (this.selectedItem1.value.level == 2) //lines
         {
            this.updateLines();
        }
    };
    //read data from array and join with , to send for Api
    SelectItemComponent.prototype.fetchData = function (data) {
        var finalData = [];
        for (var i in data) {
            finalData.push(data[i]["id"]);
        }
        return finalData.join(",");
    };
    SelectItemComponent.prototype.getLevel = function (level) {
        if (level == 1)
            return this.selectedItem1.value.level;
        else
            return this.selectedItem1.value.level;
    };
    SelectItemComponent.prototype.updateDropdownsSetting = function () {
        if (this.isMultipleSelectionPossible) {
            var mainSettings = {
                singleSelection: false,
                idField: "id",
                textField: "name",
                selectAllText: "انتخاب همه",
                unSelectAllText: "حذف همه موارد",
                searchPlaceholderText: "جستجو",
                itemsShowLimit: 1,
                noDataAvailablePlaceholderText: "بدون اطلاعات",
                allowSearchFilter: true
            };
            var mainLimitSelections = void 0;
            var sub1LimitSelections = void 0;
            var sub2LimitSelections = void 0;
            var unlimitted = 10000;
            if (this.selectedItem1.value.level == 0) {
                mainLimitSelections = unlimitted;
                sub1LimitSelections = unlimitted;
                sub2LimitSelections = unlimitted;
            }
            else if (this.selectedItem1.value.level == 1) {
                mainLimitSelections = 1;
                sub1LimitSelections = unlimitted;
                sub2LimitSelections = unlimitted;
            }
            else {
                mainLimitSelections = 1;
                sub1LimitSelections = 1;
                sub2LimitSelections = unlimitted;
            }
            this.mainDropdownSettings = tslib_1.__assign({}, mainSettings, { limitSelection: mainLimitSelections });
            this.officeDropdownSettings = tslib_1.__assign({}, mainSettings, { limitSelection: sub1LimitSelections });
            this.lineDropdownSettings = tslib_1.__assign({}, mainSettings, { limitSelection: sub2LimitSelections });
        }
        else {
            var mainSettings = {
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
            this.lineDropdownSettings =
                this.mainDropdownSettings =
                    this.officeDropdownSettings = mainSettings;
        }
    };
    SelectItemComponent.prototype.onSelectAll = function (item) { };
    SelectItemComponent.prototype.onMain1Select = function (item) {
        this.activeSub1_1 = this.allSub1Data[item["id"]];
        this.selectedItem1.patchValue({
            sub1: [],
            sub2: []
        });
        this.updateLines();
    };
    SelectItemComponent.prototype.onDeSelectMain = function () {
        this.activeSub1_1 = [];
        this.selectedItem1.patchValue({
            sub1: [],
            sub2: []
        });
        return;
    };
    SelectItemComponent.prototype.onDeSelectSub1 = function (item) {
        this.updateLines();
    };
    SelectItemComponent.prototype.getSelectedItems = function () {
        var data = {
            level1: 1,
            idmain1: 1,
            idsub1: 1,
            idnumber1: 1,
            level2: 1,
            idmain2: 1,
            idsub2: 1,
            idnumber2: 1,
            time: "",
            from: "",
            inorout: "",
            type: ""
        };
    };
    SelectItemComponent.prototype.activeSub1_1elected = function (item) {
        //this.updateLines);
    };
    SelectItemComponent.prototype.updateLines = function () {
        var _this = this;
        var sub1 = [];
        var data = {
            level: this.selectedItem1.value.level,
            idmain: this.fetchData(this.selectedItem1.value.main),
            idsub: this.fetchData(this.selectedItem1.value.sub1)
        };
        if (data.level == 2)
            // line select
            this.webServ.getNumbers(data).subscribe(function (data) {
                _this.lines = data["data"];
            }, function (error) {
                _this.authServe.handdleAuthErrors(error);
            });
    };
    SelectItemComponent.prototype.getSelectedValue = function () {
        var filterData = [];
        var selectedItem1 = this.selectedItem1.getRawValue();
        if (selectedItem1.level == 0 && (!selectedItem1.main || !selectedItem1.main.length))
            return;
        if (selectedItem1.level == 1 &&
            (!selectedItem1.main || !selectedItem1.main.length) &&
            (!selectedItem1.sub1 || !selectedItem1.sub1.length))
            return;
        if (selectedItem1.level == 2 && (!selectedItem1.sub2 || !selectedItem1.sub2.length))
            return;
        filterData["id"] = this.fetchData(selectedItem1.main);
        filterData["idSub"] = this.fetchData(selectedItem1.sub1);
        filterData["idnumber"] = this.fetchData(selectedItem1.sub2);
        filterData["level"] = this.selectedItem1.value.level;
        if (filterData["level"] == 0)
            filterData["label"] = selectedItem1.main[0]['name'];
        else if (filterData["level"] == 1)
            filterData["label"] = selectedItem1.sub1[0]['name'];
        else
            filterData["label"] = selectedItem1.sub2[0]['name'];
        return filterData;
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], SelectItemComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectItemComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], SelectItemComponent.prototype, "isMultipleSelectionPossible", void 0);
    SelectItemComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-select-item",
            templateUrl: "./select-item.component.html",
            styleUrls: ["./select-item.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService])
    ], SelectItemComponent);
    return SelectItemComponent;
}());
exports.SelectItemComponent = SelectItemComponent;
//# sourceMappingURL=select-item.component.js.map