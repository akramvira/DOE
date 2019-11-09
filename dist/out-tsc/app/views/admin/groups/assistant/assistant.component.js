"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var authentication_service_1 = require("../../../../_services/authentication.service");
var ngx_toastr_1 = require("ngx-toastr");
var forms_1 = require("@angular/forms");
var web_service_1 = require("./web.service");
var AssistantComponent = /** @class */ (function () {
    function AssistantComponent(webServ, authServ, toastr) {
        this.webServ = webServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.groups = new Array();
        this.selectedGroupExtensions = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewGroup = false;
        this.newGroupName = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.editing = {};
        this.selectedItemNameToDelete = "";
    }
    AssistantComponent.prototype.ngOnInit = function () {
        this.getAllData();
    };
    AssistantComponent.prototype.getAllData = function () {
        var _this = this;
        this.webServ.getAllGroups().subscribe(function (data) {
            data = data["data"];
            var groupesData = new Array();
            for (var i in data["groups"]) {
                groupesData.push(data["groups"][i]);
            }
            _this.groups = groupesData;
            _this.allExtensions = data["sub"];
            _this.remainingExtensions = _this.allExtensions;
            _this.setRemainingExtensions();
            // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    AssistantComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        console.log("inline editing rowIndex", rowIndex);
        this.editing[rowIndex + "-" + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        console.log("UPDATED!", this.groups[rowIndex][cell]);
        var newName = this.groups[rowIndex][cell];
        var id = this.groups[rowIndex]["id"];
        this.webServ
            .updateGroup({
            name: newName,
            id: id,
            sub: this.fetchData(this.selectedGroupExtensions)
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success("نام معاونت با موفقیت تغییر یافت");
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    AssistantComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    AssistantComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    AssistantComponent.prototype.onActivate = function (event) {
        if (event.type == "click") {
            this.refreshParents();
            this.parentSelected = true;
            this.selectedGroupExtensions = JSON.parse(JSON.stringify(event.row["sub"]));
            // this.convertSelectedGroupExtentionsToInt();
            this.setRemainingExtensions();
            this.activeParentId = event.row.id;
            this.itemsChanged = false;
        }
    };
    AssistantComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    AssistantComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    AssistantComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
    };
    AssistantComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.allExtensions.splice(this.allExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
                ;
            }
    };
    AssistantComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.allExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    AssistantComponent.prototype.fetchData = function (data) {
        var finalData = [];
        for (var i in data) {
            finalData.push(data[i]["id"]);
        }
        return finalData.join(",");
    };
    AssistantComponent.prototype.updateParentItems = function () {
        var _this = this;
        this.webServ
            .updateGroup({
            id: this.activeParentId,
            name: this.groups[this.activeRow]["name"],
            sub: this.fetchData(this.selectedGroupExtensions)
        })
            .subscribe(function (data) {
            _this.itemsChanged = false;
            _this.groups[_this.activeRow]["value"] = _this.selectedGroupExtensions.join(",");
            _this.refreshParents();
            _this.toastr.success("ادارات معاونت  " +
                _this.groups[_this.activeRow]["name"] +
                "  با موفقیت ثبت شد.");
            _this.getAllData();
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    AssistantComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value,
                value: []
            };
            this.webServ.addGroup(newItemData_1).subscribe(function (data) {
                _this.toastr.success("معاونت با موفقیت اضافه شد.");
                _this.groups.push({ id: data['data']['id'], name: newItemData_1.name, sub: [] });
                _this.refreshParents();
            }, function (error) {
                _this.authServ.handdleAuthErrors(error);
            });
            this.refreshParents();
            this.addingNewGroup = false;
        }
        else
            this.addingNewGroup = true;
    };
    AssistantComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            String(el).indexOf(searhKey) == 0;
        });
    };
    AssistantComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
    };
    AssistantComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeId = this.activeRow;
        this.webServ.deleteGroup(this.groups[this.activeRow]["id"]).subscribe(function (data) {
            _this.toastr.success(_this.groups[activeId]["name"] + '"  با موفقیت حذف شد.');
            _this.removeGroup(activeId);
            _this.smallModal.hide();
            _this.getAllData();
            _this.selectedGroupExtensions = [];
        }, function (error) {
            _this.smallModal.hide();
            _this.authServ.handdleAuthErrors(error);
        });
    };
    AssistantComponent.prototype.removeGroup = function (rowId) {
        this.groups.splice(rowId, 1);
    };
    tslib_1.__decorate([
        core_1.ViewChild("removeGroupModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], AssistantComponent.prototype, "smallModal", void 0);
    AssistantComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-assistant",
            templateUrl: "./assistant.component.html",
            styleUrls: ["./assistant.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], AssistantComponent);
    return AssistantComponent;
}());
exports.AssistantComponent = AssistantComponent;
//# sourceMappingURL=assistant.component.js.map