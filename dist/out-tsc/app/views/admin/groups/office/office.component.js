"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var authentication_service_1 = require("../../../../_services/authentication.service");
var ngx_toastr_1 = require("ngx-toastr");
var forms_1 = require("@angular/forms");
var web_service_1 = require("./web.service");
var OfficeComponent = /** @class */ (function () {
    function OfficeComponent(webServ, authServ, toastr) {
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
    OfficeComponent.prototype.ngOnInit = function () {
        this.getAllData();
    };
    OfficeComponent.prototype.getAllData = function () {
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
    OfficeComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        console.log("inline editing rowIndex", rowIndex);
        this.editing[rowIndex + "-" + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        ;
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
            _this.toastr.success("نام اداره با موفقیت تغییر یافت");
        }, function (error) {
            console.log(error);
        });
    };
    OfficeComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    OfficeComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    OfficeComponent.prototype.onActivate = function (event) {
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
    OfficeComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    OfficeComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    OfficeComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.selectedGroupExtensions.forEach(function (e, i) {
            $this.selectedGroupExtensions[i] = parseInt($this.selectedGroupExtensions[i]);
        });
    };
    OfficeComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.allExtensions.splice(this.allExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
            }
    };
    OfficeComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.allExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    OfficeComponent.prototype.fetchData = function (data) {
        var finalData = [];
        for (var i in data) {
            finalData.push(data[i]["id"]);
        }
        return finalData.join(",");
    };
    OfficeComponent.prototype.updateParentItems = function () {
        var _this = this;
        var ids = [];
        for (var index in this.selectedGroupExtensions) {
            ids.push(this.selectedGroupExtensions[index]["id"]);
        }
        var activeId = this.activeRow;
        this.webServ
            .updateGroup({
            id: this.activeParentId,
            name: this.groups[this.activeRow]["name"],
            sub: this.fetchData(this.selectedGroupExtensions)
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.groups[activeId]["sub"] = _this.selectedGroupExtensions;
            _this.refreshParents();
            _this.toastr.success(" داخلی های اداره" +
                _this.groups[activeId]["name"] +
                "  با موفقیت ثبت شد.  ");
            _this.getAllData();
        }, function (error) {
            console.log(error);
        });
    };
    OfficeComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value
            };
            this.webServ.addGroup(newItemData_1).subscribe(function (data) {
                data = data['data'];
                _this.toastr.success("اداره با موفقیت اضافه شد.");
                _this.groups.push({ id: data['id'], name: newItemData_1.name, sub: [] });
                _this.refreshParents();
            }, function (error) {
                console.log(error);
            });
            this.refreshParents();
            this.addingNewGroup = false;
        }
        else
            this.addingNewGroup = true;
    };
    OfficeComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            String(el).indexOf(searhKey) == 0;
        });
    };
    OfficeComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
    };
    OfficeComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeId = this.activeRow;
        this.webServ.deleteGroup(this.groups[activeId]["id"]).subscribe(function (data) {
            _this.toastr.success(_this.groups[activeId]["name"] + '"  با موفقیت حذف شد.');
            _this.smallModal.hide();
            _this.removeGroup(activeId);
            _this.getAllData();
            _this.selectedGroupExtensions = [];
        }, function (error) {
            _this.toastr.error("اشکال در روند حذف اداره");
            _this.smallModal.hide();
        });
        console.log(this.groups[this.activeRow]["title"]);
    };
    OfficeComponent.prototype.removeGroup = function (rowId) {
        this.groups.splice(rowId, 1);
    };
    tslib_1.__decorate([
        core_1.ViewChild("removeGroupModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], OfficeComponent.prototype, "smallModal", void 0);
    OfficeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-office",
            templateUrl: "./office.component.html",
            styleUrls: ["./office.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], OfficeComponent);
    return OfficeComponent;
}());
exports.OfficeComponent = OfficeComponent;
//# sourceMappingURL=office.component.js.map