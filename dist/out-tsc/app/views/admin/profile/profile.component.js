"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var authentication_service_1 = require("../../../_services/authentication.service");
var profile_service_1 = require("./profile.service");
var ngx_toastr_1 = require("ngx-toastr");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profileService, authServe, toaster) {
        this.profileService = profileService;
        this.authServe = authServe;
        this.toaster = toaster;
        this.dynamic = Math.floor(Math.random() * 100 + 1);
        this.type = 'success';
        this.max = 200;
        this.userData = new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            phone: new forms_1.FormControl(''),
            img: new forms_1.FormControl(''),
            password: new forms_1.FormControl(''),
            confirmPassword: new forms_1.FormControl(''),
        });
        this.submiting = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getProfiledata().subscribe(function (data) {
            _this.userData.patchValue(data['data']);
        });
    };
    ProfileComponent.prototype.onSubmitForm = function () {
        var _this = this;
        this.submiting = true;
        debugger;
        var data = this.userData.getRawValue();
        this.profileService.setProfileData(data).subscribe(function (data) {
            _this.toaster.success('اطلاعات با موفقیت تغییر یافت.');
            _this.submiting = false;
            ;
        }, function (error) {
            _this.submiting = false;
            ;
            _this.authServe.handdleAuthErrors(error);
        });
    };
    ProfileComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss'],
            providers: [authentication_service_1.AuthenticationService]
        }),
        tslib_1.__metadata("design:paramtypes", [profile_service_1.ProfileService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map