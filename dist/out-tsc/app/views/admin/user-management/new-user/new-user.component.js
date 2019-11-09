"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var users_service_1 = require("../_services/users.service");
var ngx_toastr_1 = require("ngx-toastr");
var authentication_service_1 = require("../../../../_services/authentication.service");
var router_1 = require("@angular/router");
var NewUserComponent = /** @class */ (function () {
    function NewUserComponent(userServ, toaster, authService, router) {
        this.userServ = userServ;
        this.toaster = toaster;
        this.authService = authService;
        this.router = router;
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.isEditMode = false;
        this.userData = new forms_1.FormGroup({
            id: new forms_1.FormControl('0'),
            active: new forms_1.FormControl('1'),
            name: new forms_1.FormControl(''),
            username: new forms_1.FormControl(''),
            password: new forms_1.FormControl(''),
            confirmpassword: new forms_1.FormControl(''),
            level: new forms_1.FormControl('operator'),
            role: new forms_1.FormControl(''),
            //Operator related fields
            phonenumber: new forms_1.FormControl(''),
            num_queue1: new forms_1.FormControl(''),
            num_park: new forms_1.FormControl(''),
            num_hold: new forms_1.FormControl(''),
            num_redial: new forms_1.FormControl(''),
            conferance: new forms_1.FormControl('')
        });
        this.onSubmitUser = new core_1.EventEmitter();
        this.notSelectedRoles = [];
        this.allRoles = [];
        this.selectedRoles = [{ value: '1', title: 'Option 1' }];
    }
    NewUserComponent.prototype.setUserValues = function (data) {
        var dataToPatch = [];
        var role = this.dropdownList.filter(function (item) { if (item['id'] == data['idrole'])
            return true; });
        dataToPatch = JSON.parse(JSON.stringify(data));
        dataToPatch['role'] = role;
        this.userData.patchValue(dataToPatch);
    };
    NewUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userServ.getAllRoles().subscribe(function (data) {
            var roles = data['roles'];
            var allRoles = [];
            for (var id in roles) {
                allRoles.push({ id: id, text: roles[id]['title'] });
            }
            _this.dropdownList = allRoles;
        }, function (error) {
            _this.authService.handdleAuthErrors(error);
        });
        this.dropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "text",
            selectAllText: 'انتخاب همه',
            unSelectAllText: 'حذف همه موارد',
            searchPlaceholderText: 'جستجو',
            itemsShowLimit: 3,
            limitSelection: 1,
            allowSearchFilter: true
        };
    };
    NewUserComponent.prototype.fetchData = function (data) {
        var finalData = [];
        for (var i in data) {
            finalData.push(data[i]["id"]);
        }
        return finalData.join(",");
    };
    NewUserComponent.prototype.onItemSelect = function () { };
    NewUserComponent.prototype.onSelectAll = function (event) { };
    NewUserComponent.prototype.onSubmit = function () {
        var _this = this;
        var userData = this.userData.getRawValue();
        userData['role'] = this.fetchData(userData['role']);
        if (!this.isEditMode) {
            this.userServ.addUser(userData).subscribe(function (data) {
                _this.toaster.success('کاربر جدید اضافه شد.');
                _this.router.navigate(['/admin/users-management/users']);
            }, function (error) {
                _this.authService.handdleAuthErrors(error);
            });
        }
        else {
            this.userServ.updateUser(userData).subscribe(function (data) {
                _this.onSubmitUser.emit(true);
                _this.toaster.success('اطلاعات کاربر تغییر یافت');
                _this.router.navigate(['/admin/users-management/users']);
            }, function (error) {
                _this.onSubmitUser.emit(false);
                _this.authService.handdleAuthErrors(error);
            });
        }
    };
    NewUserComponent.prototype.selecteRole = function (item) {
        debugger;
        this.userData.value.role;
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], NewUserComponent.prototype, "isEditMode", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", core_1.EventEmitter)
    ], NewUserComponent.prototype, "onSubmitUser", void 0);
    NewUserComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-new-user',
            templateUrl: './new-user.component.html',
            styleUrls: ['./new-user.component.scss'],
            encapsulation: core_2.ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService,
            ngx_toastr_1.ToastrService,
            authentication_service_1.AuthenticationService,
            router_1.Router])
    ], NewUserComponent);
    return NewUserComponent;
}());
exports.NewUserComponent = NewUserComponent;
//# sourceMappingURL=new-user.component.js.map