"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var authentication_service_1 = require("../../../../_services/authentication.service");
var ngx_toastr_1 = require("ngx-toastr");
var forms_1 = require("@angular/forms");
var web_service_1 = require("./web.service");
var LinesComponent = /** @class */ (function () {
    function LinesComponent(webServ, authServ, toastr) {
        this.webServ = webServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.groups = new Array();
        this.selectedGroupExtensions = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewGroup = false;
        this.newGroupName = new forms_1.FormControl("");
        this.newGroupNumber = new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.max(8)]);
        this.editing = {};
        this.selectedItemNameToDelete = "";
    }
    LinesComponent.prototype.submitNewItem = function () {
        this.addNewGroupClick();
    };
    LinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toastr.warning('جهت ویرایش، روی نام یا شماره داخلی دو بار کلیک کنید!', 'پیغام سیستم');
        this.webServ.getAllGroups().subscribe(function (data) {
            data = data["data"];
            var groupesData = new Array();
            for (var i in data) {
                groupesData.push(data[i]);
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
    LinesComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + "-" + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        var newName = this.groups[rowIndex][cell];
        var id = this.groups[rowIndex]["id"];
        this.webServ
            .updateGroup({
            name: this.groups[rowIndex]['name'],
            number: this.groups[rowIndex]['number'],
            id: id
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success("اطلاعات داخلی با موفقیت تغییر یافت.");
        }, function (error) {
            console.log(error);
        });
    };
    LinesComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    LinesComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    LinesComponent.prototype.onActivate = function (event) {
        // if (event.type == "click") {
        //   this.refreshParents();
        //   this.parentSelected = true;
        //   this.selectedGroupExtensions = JSON.parse(
        //     JSON.stringify(event.row["sub"])
        //   );
        //   // this.convertSelectedGroupExtentionsToInt();
        //   this.setRemainingExtensions();
        //   this.activeParentId = event.row.id;
        //   this.itemsChanged = false;
        // }
    };
    LinesComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    LinesComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    LinesComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.selectedGroupExtensions.forEach(function (e, i) {
            $this.selectedGroupExtensions[i] = parseInt($this.selectedGroupExtensions[i]);
        });
    };
    LinesComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    LinesComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
            }
    };
    LinesComponent.prototype.updateParentItems = function () {
        var _this = this;
        this.webServ
            .updateGroup({
            id: this.activeParentId,
            value: this.selectedGroupExtensions.join(",")
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.groups[_this.activeRow]["value"] = _this.selectedGroupExtensions.join(",");
            _this.refreshParents();
            _this.toastr.success("داخلی های گروهگ " +
                _this.groups[_this.activeRow]["name"] +
                "  با موفقیت ثبت شد.");
        }, function (error) {
            console.log(error);
        });
    };
    LinesComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value,
                number: this.newGroupNumber.value
            };
            this.webServ.addGroup(newItemData_1).subscribe(function (data) {
                debugger;
                _this.toastr.success("گروه با موفقیت اضافه شد.");
                newItemData_1['id'] = data['data']['id'];
                _this.groups.unshift(newItemData_1);
                _this.refreshParents();
                _this.addingNewGroup = false;
                _this.newGroupName.setValue('');
                _this.newGroupNumber.setValue('');
            }, function (error) {
                _this.refreshParents();
                _this.authServ.handdleAuthErrors(error);
            });
        }
        else
            this.addingNewGroup = true;
    };
    LinesComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            String(el).indexOf(searhKey) == 0;
        });
    };
    LinesComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
    };
    LinesComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeId = this.activeRow;
        this.webServ.deleteGroup(this.groups[this.activeRow]["id"]).subscribe(function (data) {
            debugger;
            _this.removeGroup(activeId);
            _this.toastr.success(_this.groups[activeId]["name"] + '"  با موفقیت حذف شد.');
            _this.smallModal.hide();
            _this.refreshParents();
        }, function (error) {
            _this.smallModal.hide();
            _this.authServ.handdleAuthErrors(error);
        });
    };
    LinesComponent.prototype.removeGroup = function (rowId) {
        this.groups.splice(rowId, 1);
    };
    tslib_1.__decorate([
        core_1.ViewChild("removeGroupModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], LinesComponent.prototype, "smallModal", void 0);
    LinesComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-lines',
            templateUrl: './lines.component.html',
            styleUrls: ['./lines.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], LinesComponent);
    return LinesComponent;
}());
exports.LinesComponent = LinesComponent;
//# sourceMappingURL=lines.component.js.map