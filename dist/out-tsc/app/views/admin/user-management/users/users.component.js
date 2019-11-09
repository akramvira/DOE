"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var users_service_1 = require("../_services/users.service");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var authentication_service_1 = require("../../../../_services/authentication.service");
var ngx_toastr_1 = require("ngx-toastr");
var new_user_component_1 = require("../new-user/new-user.component");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(usersServ, authServ, toastr) {
        this.usersServ = usersServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.page = new Page();
        this.filters = [];
        this.editing = {};
        this.selectedItemNameToDelete = "";
        this.selectedRoles = [];
        this.notSelectedRoles = [];
        this.selectedRule = "";
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.usersServ.getAllUsers()
            .subscribe(function (data) {
            data = data['data'];
            _this.users = data["users"];
            _this.mainData = _this.users;
            _this.page.pageNumber = 0;
            _this.page.size = 20;
            _this.setPage({ offset: 0 });
            _this.page.pageNumber = 1;
            _this.page.size = 10;
            _this.page.totalElements = _this.mainData.length;
            _this.page.totalPages = 10;
        });
    };
    UsersComponent.prototype.FilterData = function (event) {
        this.tempData = JSON.parse(JSON.stringify(this.mainData));
        var columnName = event.currentTarget.id;
        var val = event.target.value.toLowerCase();
        this.filters[columnName] = val;
        //this.filterData();
        var filteredData = this.tempData.filter(function (d) {
            return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.users = filteredData;
        // this.myTable.offset = 0;
    };
    UsersComponent.prototype.updateValue = function (event, cell, rowIndex) {
        this.editing[rowIndex + "-" + cell] = false;
        this.users[rowIndex][cell] = event.target.value;
        this.users = this.users.slice();
    };
    //pagination
    UsersComponent.prototype.setPage = function (pageInfo) {
        this.page.pageNumber = pageInfo.offset;
        this.page.size = 10;
        this.page.totalElements = 100;
        this.page.totalPages = 10;
        //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
        //this.page = {size:2,};//pagedData.page;
        //this.users = 4;//pagedData.data;
        // });
    };
    UsersComponent.prototype.toggleExpandRow = function (row) {
        console.log("Toggled Expand Row!", row);
        this.table.rowDetail.toggleExpandRow(row);
    };
    UsersComponent.prototype.onDetailToggle = function (event) {
        console.log("Detail Toggled", event);
    };
    UsersComponent.prototype.showRemoveModal = function (rowIndex) {
        this.removeItemModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.users[this.activeRow]["name"];
    };
    UsersComponent.prototype.confirmDelete = function () {
        var _this = this;
        debugger;
        this.usersServ.deleteUser(this.users[this.activeRow]["id"]).subscribe(function (data) {
            _this.removeItemModal.hide();
            _this.getUsers();
            _this.toastr.success("کاربر مورد نظر با موفقیت حذف شد.");
        }, function (error) {
            _this.toastr.error("خطا در زمان حذف کاربر.");
            _this.authServ.handdleAuthErrors(error);
        });
        console.log(this.users[this.activeRow]["title"]);
    };
    UsersComponent.prototype.onSubmit = function () { };
    UsersComponent.prototype.selecteRole = function (event) { };
    UsersComponent.prototype.userUpdated = function (result) {
        if (result) {
            this.getUsers();
            this.editModal.hide();
        }
    };
    UsersComponent.prototype.showEditModal = function (rowIndex) {
        this.activeRow = rowIndex;
        this.editUserCmp.setUserValues(this.users[this.activeRow]);
        this.editModal.show();
        this.selectedItemNameToEdit = this.users[this.activeRow]["name"];
        //this.userData.patchValue(this.users[this.activeRow]);
    };
    UsersComponent.prototype.doFilter = function () {
    };
    UsersComponent.prototype.confirmEdit = function () { };
    tslib_1.__decorate([
        core_1.ViewChild("usersTable"),
        tslib_1.__metadata("design:type", Object)
    ], UsersComponent.prototype, "table", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("removeItemModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], UsersComponent.prototype, "removeItemModal", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("editModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], UsersComponent.prototype, "editModal", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("editUserCmp"),
        tslib_1.__metadata("design:type", new_user_component_1.NewUserComponent)
    ], UsersComponent.prototype, "editUserCmp", void 0);
    UsersComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-users",
            templateUrl: "./users.component.html",
            styleUrls: ["./users.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
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
//# sourceMappingURL=users.component.js.map