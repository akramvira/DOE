"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var users_service_1 = require("../_services/users.service");
var ngx_toastr_1 = require("ngx-toastr");
var authentication_service_1 = require("../../../../_services/authentication.service");
var forms_1 = require("@angular/forms");
var modal_1 = require("ngx-bootstrap/modal");
var globals_1 = require("../../../../_services/globals");
var RolesComponent = /** @class */ (function () {
    function RolesComponent(RoleServ, authServ, toastr) {
        this.RoleServ = RoleServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.roles = new Array();
        this.selectedRoleAccesses = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewRole = false;
        this.newRoleName = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.editing = {};
        this.selectedItemNameToDelete = "";
    }
    RolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.RoleServ.getAllRoles().subscribe(function (data) {
            var RoleesData = new Array();
            for (var i in data["roles"]) {
                data["roles"][i]["id"] = i;
                RoleesData.push(data["roles"][i]);
            }
            _this.roles = RoleesData;
            _this.allAccesses = data["abilities"];
            _this.remainingAccesses = _this.allAccesses;
            _this.setremainingAccesses();
        }, function (error) {
            console.log(error);
            _this.authServ.handdleAuthErrors(error);
        });
    };
    RolesComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + "-" + cell] = false;
        this.roles[rowIndex][cell] = event.target.value;
        this.refreshParents();
        var newName = this.roles[rowIndex][cell];
        var id = this.roles[rowIndex]["id"];
        this.RoleServ.updateRole({
            name: newName,
            id: id,
            value: globals_1.Globals.fetchData(this.selectedRoleAccesses, true)
        }).subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success("نام گروه با موفقیت تغییر یافت");
        }, function (error) {
            console.log(error);
        });
    };
    RolesComponent.prototype.refreshParents = function () {
        this.roles = this.roles.slice();
    };
    RolesComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    RolesComponent.prototype.onActivate = function (event) {
        if (event.type == "click") {
            this.parentSelected = true;
            this.selectedRoleAccesses = event.row.ability;
            this.setremainingAccesses();
            this.activeParentId = event.row.id;
            this.itemsChanged = false;
        }
    };
    RolesComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    RolesComponent.prototype.setremainingAccesses = function () {
        var $this = this;
        this.remainingAccesses = this.allAccesses.filter(function (el) {
            return !$this.selectedRoleAccesses[el["id"]];
        });
        this.remainingAccesses.sort();
    };
    RolesComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedRoleAccesses[subItem["id"]]) {
                this.itemsChanged = true;
                this.selectedRoleAccesses[subItem["id"]] = subItem["title"];
                this.setremainingAccesses();
            }
    };
    RolesComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedRoleAccesses[subItem["key"]]) {
                this.itemsChanged = true;
                delete this.selectedRoleAccesses[subItem["key"]];
                this.setremainingAccesses();
            }
    };
    RolesComponent.prototype.updateParentItems = function () {
        var _this = this;
        this.RoleServ.updateRole({
            id: this.activeParentId,
            value: globals_1.Globals.fetchData(this.selectedRoleAccesses, true)
        }).subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.roles[_this.activeRow]["ability"] = _this.selectedRoleAccesses;
            _this.refreshParents();
            _this.toastr.success("دسترسی های مقام  " +
                _this.roles[_this.activeRow]["title"] +
                "  با موفقیت ثبت شد.");
        }, function (error) {
            console.log(error);
        });
    };
    RolesComponent.prototype.addNewRoleClick = function () {
        var _this = this;
        if (this.addingNewRole) {
            var newItemData_1 = {
                name: this.newRoleName.value,
                value: []
            };
            this.RoleServ.addRole(newItemData_1).subscribe(function (data) {
                _this.newRoleName.setValue('');
                data = data['data'];
                newItemData_1['ability'] = data['ability'];
                newItemData_1['id'] = data['id'];
                _this.toastr.success("مقام با موفقیت اضافه شد.");
                _this.roles.push(newItemData_1);
                _this.refreshParents();
                _this.addingNewRole = false;
            }, function (error) {
                _this.addingNewRole = false;
                _this.authServ.handdleAuthErrors(error);
            });
        }
        else
            this.addingNewRole = true;
    };
    RolesComponent.prototype.filterAllAccesses = function (event) {
        var searhKey = event.target.value;
        this.setremainingAccesses(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingAccesses.filter(function (el) {
            //debugger;
            String(el).indexOf(searhKey) == 0;
        });
    };
    RolesComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.roles[this.activeRow]["title"];
    };
    RolesComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeRowId = this.activeRow;
        this.RoleServ.deleteRole(this.roles[this.activeRow]["id"]).subscribe(function (data) {
            _this.toastr.success('مقام با موفقیت حذف شد.');
            _this.roles.splice(activeRowId, 1);
            _this.removeModal.hide();
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
        console.log(this.roles[this.activeRow]["title"]);
    };
    tslib_1.__decorate([
        core_1.ViewChild("removeRuleModal"),
        tslib_1.__metadata("design:type", modal_1.ModalDirective)
    ], RolesComponent.prototype, "smallModal", void 0);
    tslib_1.__decorate([
        core_1.ViewChild('removeRuleModal'),
        tslib_1.__metadata("design:type", modal_1.ModalDirective)
    ], RolesComponent.prototype, "removeModal", void 0);
    RolesComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-roles",
            templateUrl: "./roles.component.html",
            styleUrls: ["./roles.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], RolesComponent);
    return RolesComponent;
}());
exports.RolesComponent = RolesComponent;
//# sourceMappingURL=roles.component.js.map