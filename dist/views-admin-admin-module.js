(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-admin-admin-module"],{

/***/ "./src/app/_services/auth-guard.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_services/auth-guard.service.ts ***!
  \*************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./globals */ "./src/app/_services/globals.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");







var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, router, gl) {
        this.authService = authService;
        this.router = router;
        this.gl = gl;
    }
    AuthGuardService.prototype.canActivate = function (next) {
        var _this = this;
        return this.authService.getUserMenues()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            var res = data['data'].includes(next.data.accessName);
            console.log(data['data'], next.data.accessName, res);
            if (res) {
                return true;
            }
            else
                _this.router.navigate(['/403']);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) {
            _this.authService.handdleAuthErrors(error);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
        }));
    };
    AuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _globals__WEBPACK_IMPORTED_MODULE_5__["Globals"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/views/admin/admin-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/admin/admin-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings/settings.component */ "./src/app/views/admin/settings/settings.component.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin.component */ "./src/app/views/admin/admin.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/views/admin/profile/profile.component.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_services/auth-guard.service */ "./src/app/_services/auth-guard.service.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");








var routes = [
    {
        path: '',
        component: _admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"],
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: { title: 'داشبورد مدیریت', accessName: 'dashboard' },
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["AuthGuardService"]],
    },
    {
        path: 'settings',
        component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_3__["SettingsComponent"],
        data: { title: 'تنظیمات اولیه سیستم', accessName: 'setting' },
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["AuthGuardService"]],
    },
    {
        path: 'users-management',
        loadChildren: './user-management/user-management.module#UserManagementModule',
        data: { title: 'مدیریت کاربران', accessName: 'users' },
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["AuthGuardService"]]
    },
    {
        path: 'groups',
        loadChildren: './groups/groups.module#GroupsModule',
        data: { title: 'مدیریت گروه بندی ها', accessName: 'groupExtensions' },
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["AuthGuardService"]]
    },
    {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule',
        data: { title: 'گزارشات', accessName: 'reports' },
        canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["AuthGuardService"]]
    },
    {
        path: 'profile',
        component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_5__["ProfileComponent"],
        data: { title: 'اطلاعات کاربری' }
    }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            providers: [_services_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"]]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/admin/admin.component.html":
/*!**************************************************!*\
  !*** ./src/app/views/admin/admin.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/views/admin/admin.component.ts":
/*!************************************************!*\
  !*** ./src/app/views/admin/admin.component.ts ***!
  \************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AdminComponent = /** @class */ (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/views/admin/admin.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/admin.module.ts":
/*!*********************************************!*\
  !*** ./src/app/views/admin/admin.module.ts ***!
  \*********************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin.component */ "./src/app/views/admin/admin.component.ts");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-routing.module */ "./src/app/views/admin/admin-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _settings_settings_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings/settings.module */ "./src/app/views/admin/settings/settings.module.ts");
/* harmony import */ var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard/dashboard.module */ "./src/app/views/admin/dashboard/dashboard.module.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/views/admin/profile/profile.component.ts");
/* harmony import */ var ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/progressbar */ "./node_modules/ngx-bootstrap/progressbar/fesm5/ngx-bootstrap-progressbar.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _services_globals__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../_services/globals */ "./src/app/_services/globals.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/index.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(ng2_charts__WEBPACK_IMPORTED_MODULE_13__);














var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _admin_component__WEBPACK_IMPORTED_MODULE_3__["AdminComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_8__["ProfileComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _admin_routing_module__WEBPACK_IMPORTED_MODULE_4__["AdminRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_7__["DashboardModule"],
                _settings_settings_module__WEBPACK_IMPORTED_MODULE_6__["SettingsModule"],
                ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_9__["ProgressbarModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_10__["NgxDatatableModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__["ModalModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_13__["ChartsModule"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]],
            providers: [_services_globals__WEBPACK_IMPORTED_MODULE_11__["Globals"]]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/views/admin/profile/profile.component.html":
/*!************************************************************!*\
  !*** ./src/app/views/admin/profile/profile.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row justify-content-center\">\n        <div class=\"col-12 col-xl-6 col-md-8\">\n            <div class=\"card\">\n                <div class=\"card-header\">اطلاعات شما</div>\n                <div class=\"card-body\">\n                        <form [formGroup]=userData>\n                                <div class=\"form-group\">\n                                  <div class=\"input-group\">\n                                    <div class=\"input-group-prepend\">\n                                      <span class=\"input-group-text\">نام  </span>\n                                    </div>\n                                    <input type=\"text\"  name=\"username3\" class=\"form-control\" formControlName=name >\n                                    <div class=\"input-group-append\">\n                                      <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\n                                    </div>\n                                  </div>\n                                </div>\n                                <div class=\"form-group\">\n                                  <div class=\"input-group\">\n                                    <div class=\"input-group-prepend\">\n                                      <span class=\"input-group-text\"> ایمیل</span>\n                                    </div>\n                                    <input  class=\"form-control\" >\n                                    <div class=\"input-group-append\">\n                                      <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\n                                    </div>\n                                  </div>\n                                </div>\n                                <div class=\"form-group \">\n                                  <div class=\"input-group\">\n                                    <div class=\"input-group-prepend\">\n                                      <span class=\"input-group-text\">شماره تماس</span>\n                                    </div>\n                                    <input class=\"form-control\">\n                                    <div class=\"input-group-append\">\n                                      <span class=\"input-group-text\"><i class=\"fa fa-phone\"></i></span>\n                                    </div>\n                                  </div>\n                                </div>\n            \n                                <div class=\"form-group border-bottom pb-2\">\n                                  <div class=\"input-group\">\n                                      <label class=\"col-sm-3 col-form-label\"> تصویر پروفایل:</label>\n                                      <label for=\"licence-file\" class=\"btn btn-primary col-4\">انتخاب...</label>\n                                      <input  type=\"file\" class=\"form-control-file hide\" id=\"licence-file\">\n                                      <!-- <progressbar class=\"progress-bar progress-bar-striped progress-bar-animated\" \n                                      [value]=\"dynamic\" [max]=\"max\" [type]=\"type\">\n                                          {{type}} \n                                        </progressbar> -->\n                                  </div>\n                                </div>\n                \n                \n                                <div class=\"form-group form-actions text-left\">\n                                  <button type=\"submit\" class=\"btn  btn-success\">ذخیره شود</button>\n                                </div>\n                              </form>\n                </div>\n            </div>  \n        </div>\n\n  </div>  \n</div>"

/***/ }),

/***/ "./src/app/views/admin/profile/profile.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/admin/profile/profile.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkbWluL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/views/admin/profile/profile.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/admin/profile/profile.component.ts ***!
  \**********************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");




var ProfileComponent = /** @class */ (function () {
    function ProfileComponent() {
        this.dynamic = Math.floor(Math.random() * 100 + 1);
        this.type = 'success';
        this.max = 200;
        this.userData = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('asdsdf'),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/views/admin/profile/profile.component.html"),
            providers: [_services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]],
            styles: [__webpack_require__(/*! ./profile.component.scss */ "./src/app/views/admin/profile/profile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/settings/_service/settings.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/admin/settings/_service/settings.service.ts ***!
  \*******************************************************************/
/*! exports provided: SettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsService", function() { return SettingsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");






var SettingsService = /** @class */ (function () {
    function SettingsService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    SettingsService.prototype.getSettingsdata = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/setting', options);
    };
    SettingsService.prototype.setSettingsData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + "/admin/setting/save", data, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            console.log(data);
            return data;
        }));
        // .pipe(map(result => {
        //   console.log('return result', result);
        //   console.log(result);
        //   return result;
        // }));
    };
    SettingsService.prototype.setSettingsRouteData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + "/admin/setting/route/save", data, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (result) {
            if (result) {
                console.log(result);
            }
            return result;
        }));
    };
    SettingsService.prototype.getLincenseData = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/setting/license', options);
    };
    SettingsService.prototype.setLincenseData = function (data) {
        var options = this.authServ.getRequestOpions(true);
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/setting/license', data, options);
    };
    SettingsService.prototype.pingAmi = function (data) {
        debugger;
        var options = this.authServ.getRequestOpions(true);
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/setting/connection', data, options);
    };
    SettingsService.prototype.uploadfile = function (data) {
        var options = this.authServ.getRequestOpions(true);
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/setting/uploadfile', data, options);
    };
    SettingsService.prototype.removeLastFileData = function () {
        var options = this.authServ.getRequestOpions(true);
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/setting/deleteall', options);
    };
    SettingsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]])
    ], SettingsService);
    return SettingsService;
}());



/***/ }),

/***/ "./src/app/views/admin/settings/file-upload/file-upload.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/views/admin/settings/file-upload/file-upload.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n        <!-- <span>Choose file</span>\r\n        <span>{{file ? file.name : 'or drag and drop file here' }}</span> -->\r\n        <input class=\"file-input\" type=\"file\">\r\n      </div>\r\n    <!--       \r\n    <app-progress [progress]=\"progress\"></app-progress> -->"

/***/ }),

/***/ "./src/app/views/admin/settings/file-upload/file-upload.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/views/admin/settings/file-upload/file-upload.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkbWluL3NldHRpbmdzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/admin/settings/file-upload/file-upload.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/admin/settings/file-upload/file-upload.component.ts ***!
  \***************************************************************************/
/*! exports provided: FileUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploadComponent", function() { return FileUploadComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");



var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent() {
        this.file = null;
    }
    FileUploadComponent_1 = FileUploadComponent;
    FileUploadComponent.prototype.ngOnInit = function () { };
    FileUploadComponent.prototype.emitFiles = function (event) {
        var file = event && event.item(0);
        this.file = file;
    };
    FileUploadComponent.prototype.writeValue = function (value) {
        // clear file input
        //this.host.nativeElement.value = '';
        this.file = null;
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    FileUploadComponent.prototype.registerOnTouched = function (fn) {
    };
    FileUploadComponent.prototype.getSelectedFile = function () {
        return this.file;
    };
    var FileUploadComponent_1;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FileUploadComponent.prototype, "progress", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('change', ['$event.target.files']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [FileList]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FileUploadComponent.prototype, "emitFiles", null);
    FileUploadComponent = FileUploadComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-file-upload',
            template: __webpack_require__(/*! ./file-upload.component.html */ "./src/app/views/admin/settings/file-upload/file-upload.component.html"),
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                    useExisting: FileUploadComponent_1,
                    multi: true
                }
            ],
            styles: [__webpack_require__(/*! ./file-upload.component.scss */ "./src/app/views/admin/settings/file-upload/file-upload.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FileUploadComponent);
    return FileUploadComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/settings/settings-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/admin/settings/settings-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: SettingsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsRoutingModule", function() { return SettingsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.component */ "./src/app/views/admin/settings/settings.component.ts");




var routes = [
    {
        path: '',
        component: _settings_component__WEBPACK_IMPORTED_MODULE_3__["SettingsComponent"],
        data: {
            title: 'تنظیمات اولیه سیستم'
        }
    }
];
var SettingsRoutingModule = /** @class */ (function () {
    function SettingsRoutingModule() {
    }
    SettingsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], SettingsRoutingModule);
    return SettingsRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/admin/settings/settings.component.html":
/*!**************************************************************!*\
  !*** ./src/app/views/admin/settings/settings.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tabset>\n  <tab>\n    <ng-template tabHeading\n      ><i class=\"icon-calculator\"></i> تنظیمات اولیه سیستم</ng-template\n    >\n\n    <div class=\"row animated fadeIn mt-4\">\n      <div class=\"col-12\">\n        <div class=\"card card-accent-primary\">\n          <div class=\"card-header\">\n            اطلاعات دیتابیس ها\n          </div>\n          <div class=\"card-body\">\n            <form (ngSubmit)=\"onSubmitServers($event)\" [formGroup]=\"settings\">\n              <div class=\"row\" formGroupName=\"ami\">\n                <label class=\"col-sm-2 col-form-label\">دیتابیس Ami</label>\n                <div class=\"col-12 col-md-10 col-lg-10 col-xl-10\">\n                  <div class=\"row\">\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Server IP </span>\n                        </div>\n                        <input\n                          type=\"email\"\n                          class=\"form-control border\"\n                          [ngClass]=\"{\n                            'border-success': pingStatus == 1,\n                            'border-danger': pingStatus == -1\n                          }\"\n                          autocomplete=\"email\"\n                          formControlName=\"ip\"\n                        />\n                        <div class=\"input-group-append \">\n                          <button\n                            class=\"input-group-text\"\n                            (click)=\"pingAmi()\"\n                            [ngClass]=\"{\n                              'bg-success': pingStatus == 1,\n                              'bg-danger': pingStatus == -1\n                            }\"\n                          >\n                            {{ pingStatus == 1 ? \"ok\" : \"ping\" }}\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Port</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"port\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">user</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"username\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Password</span>\n                        </div>\n                        <input\n                          type=\"password\"\n                          class=\"form-control\"\n                          autocomplete=\"current-password\"\n                          formControlName=\"password\"\n                        />\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" formGroupName=\"operatori\">\n                <label class=\"col-sm-2 col-form-label\">دیتابیس operatori</label>\n                <div class=\"col-10\">\n                  <div class=\"row\">\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Server IP </span>\n                        </div>\n                        <input\n                          type=\"email\"\n                          class=\"form-control\"\n                          autocomplete=\"email\"\n                          formControlName=\"ip\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Port</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"port\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">user</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"username\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Password</span>\n                        </div>\n                        <input\n                          type=\"password\"\n                          class=\"form-control\"\n                          autocomplete=\"current-password\"\n                          formControlName=\"password\"\n                        />\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" formGroupName=\"invatation\">\n                <label class=\"col-sm-2 col-form-label\">سرور سیستم فراخوان</label>\n                <div class=\"col-10\">\n                  <div class=\"row\">\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Server IP </span>\n                        </div>\n                        <input\n                          type=\"email\"\n                          class=\"form-control\"\n                          autocomplete=\"email\"\n                          formControlName=\"ip\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Port</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"port\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">user</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"username\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Password</span>\n                        </div>\n                        <input\n                          type=\"password\"\n                          class=\"form-control\"\n                          autocomplete=\"current-password\"\n                          formControlName=\"password\"\n                        />\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" formGroupName=\"server\">\n                <label class=\"col-sm-2 col-form-label\">دیتابیس Server</label>\n                <div class=\"col-10\">\n                  <div class=\"row\">\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Server IP </span>\n                        </div>\n                        <input\n                          type=\"email\"\n                          class=\"form-control\"\n                          autocomplete=\"email\"\n                          formControlName=\"ip\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Port</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"port\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">user</span>\n                        </div>\n                        <input\n                          type=\"text\"\n                          class=\"form-control\"\n                          formControlName=\"username\"\n                        />\n                      </div>\n                    </div>\n                    <div class=\"form-group col-12 col-md-6 col-lg-6 col-xl-3\">\n                      <div class=\"input-group\">\n                        <div class=\"input-group-prepend\">\n                          <span class=\"input-group-text\">Password</span>\n                        </div>\n                        <input\n                          type=\"password\"\n                          class=\"form-control\"\n                          autocomplete=\"current-password\"\n                          formControlName=\"password\"\n                        />\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group form-actions col-12 text-left\">\n                <button type=\"submit\" class=\"btn  btn-primary\">\n                  ذخیره شود\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n\n      <div class=\" col-12 col-md-12 col-lg-12 \">\n        <div class=\"card card-accent-success\">\n          <div class=\"card-header\">\n            دیگر اطلاعات سیستم\n          </div>\n          <div class=\"card-body\">\n            <form\n              class=\"row\"\n              [formGroup]=\"settings\"\n              (ngSubmit)=\"setSettingsRouteData($event)\"\n            >\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">countco</span>\n                  </div>\n                  <input class=\"form-control\" formControlName=\"countco\" />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> counte1 </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    autocomplete=\"email\"\n                    formControlName=\"counte1\"\n                  />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> counte1 </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    autocomplete=\"email\"\n                    formControlName=\"counte1\"\n                  />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> queue_number </span>\n                  </div>\n                  <input class=\"form-control\" formControlName=\"queue_number\" />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\n                      prepend_outbound_from\n                    </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    formControlName=\"prepend_outbound_from\"\n                  />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> prepend_outbound_to </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    autocomplete=\"email\"\n                    formControlName=\"prepend_outbound_to\"\n                  />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> did_inbound_from </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    autocomplete=\"email\"\n                    formControlName=\"did_inbound_from\"\n                  />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> did_inbound_to </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    formControlName=\"did_inbound_to\"\n                  />\n                </div>\n              </div>\n              <div class=\"form-group col-sm-6\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\n                      prefix_outbound_transfer\n                    </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    autocomplete=\"email\"\n                    formControlName=\"prefix_outbound_transfer\"\n                  />\n                </div>\n              </div>\n\n              <div class=\"form-group form-actions col-sm-12 text-left\">\n                <button type=\"submit\" class=\"btn  btn-primary\">\n                  ذخیره شود\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab>\n    <ng-template tabHeading\n      ><i class=\"icon-basket-loaded\"></i> تنظیمات لایسنس</ng-template\n    >\n\n    <div class=\"row animated fadeIn border-bottom justify-content-center\">\n      <div class=\" col-12 col-md-6 col-lg-6  \">\n        <div class=\"card card-accent-success\">\n          <div class=\"card-header\">\n            ثبت اطلاعات شما\n          </div>\n          <div class=\"card-body\">\n            <form [formGroup]=\"license\" (ngSubmit)=\"submitLicense()\">\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">نام سازمان/شخص/شرکت</span>\n                  </div>\n                  <input\n                    type=\"text\"\n                    name=\"username3\"\n                    formControlName=\"name\"\n                    class=\"form-control\"\n                    [ngClass]=\"{\n                      'is-invalid': licenseSubmitted && licenseForm.name.errors\n                    }\"\n                    required\n                  />\n\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-user\"></i\n                    ></span>\n                  </div>\n                  <div\n                    *ngIf=\"licenseSubmitted && licenseForm.name.errors\"\n                    class=\"invalid-feedback\"\n                  >\n                    <div *ngIf=\"licenseForm.name.errors.required\">\n                      وارد کردن نام ضروری است.\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> زمان فعال سازی سیستم </span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    readonly\n                    formControlName=\"startDate\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-clock-o\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group \">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">Serial number</span>\n                  </div>\n                  <input\n                    class=\"form-control\"\n                    readonly\n                    formControlName=\"serial\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-asterisk\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group \">\n                <div class=\"input-group\">\n                  <label class=\"col-sm-3 col-form-label\"> فایل لایسنس:</label>\n                  <label for=\"licence-file\" class=\"btn btn-primary\"\n                    >انتخاب...</label\n                  >\n\n                  <input\n                    type=\"file\"\n                    class=\"form-control-file form-control hide is-invalid\"\n                    formControlName=\"file\"\n                    id=\"licence-file\"\n                    (change)=\"handleFileInput($event.target.files)\"\n                  />\n                  <div *ngIf=\"fileToUpload\">{{ fileToUpload.name }}</div>\n                  <div\n                    *ngIf=\"licenseSubmitted && licenseForm.file.errors\"\n                    class=\"invalid-feedback\"\n                  >\n                    <div *ngIf=\"licenseForm.file.errors.required\">\n                      فایلی انتخاب نشده است.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group form-actions text-left\">\n                <button type=\"submit\" class=\"btn  btn-success\">\n                  ذخیره شود\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n\n      <div\n        class=\" col-12 col-lg-6 \"\n        *ngIf=\"licenseSubmitted || accessList.length > 0\"\n      >\n        <div class=\"card  card-accent-success\">\n          <div class=\"card-header\">\n            دسترسی های شما\n          </div>\n          <div class=\"card-body text-center\">\n            <div class=\"alert alert-success\" *ngFor=\"let item of accessList\">\n              {{ item.title }}: زمان:{{ item.active_time }}: تعداد:{{\n                item.count\n              }}\n            </div>\n            <div class=\"alert alert-danger\" *ngIf=\"accessList.length == 0\">\n              دسترسی موجود نیست.\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab>\n    <ng-template tabHeading\n      ><i class=\"fa da-list\"></i> محاسبه قبوض</ng-template\n    >\n    <div class=\"row animated fadeIn border-bottom justify-content-center\">\n      <div class=\"col-12 col-md-10 col-lg-10 col-xl-6\">\n        <div class=\"card card-accent-success\">\n          <div class=\"card-header\">\n            لیست تعرفه ها\n          </div>\n          <div class=\"card-body\">\n            <form [formGroup]=\"bills\">\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">هزینه هر پالس</span>\n                  </div>\n                  <input\n                    type=\"number\"\n                    class=\"form-control\"\n                    formControlName=\"bill1\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-user\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\n                      هزینه هر دقیقه مکالمه شهری\n                    </span>\n                  </div>\n                  <input\n                    type=\"number\"\n                    class=\"form-control\"\n                    formControlName=\"bill2\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-envelope\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group \">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\n                      هزینه هر دقیقه مکالمه غیر شهری</span\n                    >\n                  </div>\n                  <input\n                    type=\"number\"\n                    class=\"form-control\"\n                    formControlName=\"bill3\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-asterisk\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">\n                      هزینه هر دقیقه مکالمه موبایل\n                    </span>\n                  </div>\n                  <input\n                    type=\"number\"\n                    class=\"form-control\"\n                    formControlName=\"bill4\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-envelope\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <div class=\"input-group\">\n                  <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\"> هزینه آبونمان </span>\n                  </div>\n                  <input\n                    type=\"number\"\n                    class=\"form-control\"\n                    formControlName=\"bill5\"\n                  />\n                  <div class=\"input-group-append\">\n                    <span class=\"input-group-text\"\n                      ><i class=\"fa fa-envelope\"></i\n                    ></span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group form-actions\">\n                <button type=\"submit\" class=\"btn  btn-primary\">\n                  ذخیره شود\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </tab>\n\n  <tab>\n    <ng-template tabHeading\n    ><i class=\"fa fa-list\"></i>بارگزاری فایل اطلاعات سیستم</ng-template\n  >\n  <div class=\"row animated fadeIn border-bottom justify-content-center\">\n    <div class=\" col-12 col-md-6 col-lg-6  \">\n      <div class=\"card card-accent-success\">\n        <div class=\"card-header\">\n          ثبت فایل خروجی ایجاد شده جهت نمایش گزارشات\n        </div>\n        <div class=\"card-body\">\n          <form [formGroup]=\"systemData\" (ngSubmit)=\"submitSystemData()\">\n            <div class=\"form-group \">\n              <div class=\"input-group\">\n                <label class=\"col-4 col-form-label\"> فایل اطلاعات سیستم:</label>\n                <label for=\"data-file\" class=\"btn btn-primary\"\n                  >انتخاب...</label\n                >\n\n                <input\n                  type=\"file\"\n                  class=\"form-control-file form-control hide is-invalid\"\n                  formControlName=\"file\"\n                  id=\"data-file\"\n                  (change)=\"handleDataFileInput($event.target.files)\"\n                />\n                <div *ngIf=\"datafileToUpload\">{{ datafileToUpload.name }}</div>\n                <div\n                  *ngIf=\"systemDataSubmitted && systemDataInfo.file.errors\"\n                  class=\"invalid-feedback\"\n                >\n                  <div *ngIf=\"systemDataInfo.file.errors.required\">\n                    فایلی انتخاب نشده است.\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-group form-actions text-left\">\n              <button type=\"submit\" class=\"btn  btn-success\" >\n                ذخیره شود\n              </button>\n            </div>\n          </form>\n        </div>\n\n        <div class=\"text-center border-top p-4\">\n          <button class=\"btn btn-danger\" (click)=\"removeLastFileData()\">\n    پاک کردن اطلاعات فایل قبلی\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  </tab>\n</tabset>\n\n\n<div class = \"overlay\" style=\"background: rgba(0, 0, 0, 0.41)\" [ngClass]=\"{'hide': !fileIsUploading}\">\n  <div class=\"spinner-border text-primary\" role=\"status\">\n      <span class=\"sr-only\">Loading...</span>\n  </div>\n</div> "

/***/ }),

/***/ "./src/app/views/admin/settings/settings.component.ts":
/*!************************************************************!*\
  !*** ./src/app/views/admin/settings/settings.component.ts ***!
  \************************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_settings_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_service/settings.service */ "./src/app/views/admin/settings/_service/settings.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./file-upload/file-upload.component */ "./src/app/views/admin/settings/file-upload/file-upload.component.ts");








var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(settingService, toastr, router, cd, fu) {
        this.settingService = settingService;
        this.toastr = toastr;
        this.router = router;
        this.cd = cd;
        this.fu = fu;
        //Tab 1 data
        this.settings = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            ami: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                ip: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("akram"),
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                port: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("")
            }),
            invatation: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                ip: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                port: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("")
            }),
            server: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                ip: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                port: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("")
            }),
            operatori: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                ip: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                username: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
                port: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("")
            }),
            countco: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            counte1: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            queue_number: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            prepend_outbound_from: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            prepend_outbound_to: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            did_inbound_from: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            did_inbound_to: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            prefix_outbound_transfer: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("")
        });
        this.systemData = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            file: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])
        });
        //Tab 2 Data
        this.license = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
            serial: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            startDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            file: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])
        });
        this.licenseSubmitted = false;
        this.accessList = [];
        this.pingStatus = 0; // 0=not set, 1=ok , -1 = nok
        //Tab 3 Data
        this.bills = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            bill1: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            bill2: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            bill3: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            bill4: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](""),
            bill5: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("")
        });
        this.fileToUpload = null;
        this.datafileToUpload = null;
        this.fileIsUploading = false;
        this.systemDataSubmitted = false;
    }
    Object.defineProperty(SettingsComponent.prototype, "systemDataInfo", {
        get: function () {
            return this.systemData.controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsComponent.prototype, "licenseForm", {
        get: function () {
            return this.license.controls;
        },
        enumerable: true,
        configurable: true
    });
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingService.getSettingsdata()
            .subscribe(function (data) {
            data = data['data'];
            _this.settings.patchValue({
                ami: data["ami"],
                operatori: data["operatori"],
                server: data["server"],
                invatation: data["invatation"],
                countco: data["countco"],
                counte1: data["counte1"],
                queue_number: data["queue_number"],
                prepend_outbound_from: data["prepend_outbound_from"],
                prepend_outbound_to: data["prepend_outbound_to"],
                did_inbound_from: data["did_inbound_from"],
                did_inbound_to: data["did_inbound_to"],
                prefix_outbound_transfer: data["prefix_outbound_transfer"]
            });
            _this.pingAmi();
        });
        this.settingService.getLincenseData().subscribe(function (data) {
            _this.accessList = data["license"];
            _this.license.patchValue(data);
        });
    };
    SettingsComponent.prototype.onSubmitServers = function (event) {
        var _this = this;
        var serversData = {};
        serversData = this.settings.getRawValue();
        var dataToSave = { ami: {}, operator: {}, server: {} };
        dataToSave.ami = serversData["ami"];
        dataToSave.server = serversData["server"];
        dataToSave.operator = serversData["operator"];
        console.log(serversData);
        this.settingService
            .setSettingsData(serversData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            console.log("return data", data);
            _this.toastr.success("اطلاعات ذخیره شد.", "نتیجه ذخیره!");
        }, function (error) {
            console.log(error);
            _this.toastr.error(error.error.error, "پیغام سیستم");
        });
        event.preventDefault();
    };
    SettingsComponent.prototype.setSettingsRouteData = function (event) {
        var _this = this;
        this.settingService
            .setSettingsRouteData(this.settings.getRawValue())
            .subscribe(function (data) {
            console.log("return data", data);
            _this.toastr.success("اطلاعات ذخیره شد.", "نتیجه ذخیره!");
        }, function (error) {
            _this.toastr.error(error.error.error, "پیغام سیستم");
        });
        event.preventDefault();
    };
    SettingsComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.license.patchValue({
                    file: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    SettingsComponent.prototype.onDataFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.systemData.patchValue({
                    file: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    SettingsComponent.prototype.handleFileInput = function (files) {
        this.fileToUpload = files.item(0);
    };
    SettingsComponent.prototype.handleDataFileInput = function (files) {
        this.datafileToUpload = files.item(0);
    };
    SettingsComponent.prototype.submitLicense = function () {
        this.licenseSubmitted = true;
        if (!this.license.invalid) {
            var formData = new FormData();
            formData.append("name", this.license.value.name);
            formData.append("file", this.fileToUpload);
            this.settingService.setLincenseData(formData).subscribe(function (event) {
                console.log(event);
                // if ( event.type === HttpEventType.UploadProgress ) {
                //   //this.progress = Math.round((100 * event.loaded) / event.total);
                //   console.log(event);
                //   console.log(Math.round((100 * event.loaded) / event.total));
                // }
                // if ( event.type === HttpEventType.Response ) {
                //   console.log(event.body);
                // }
            }, function (error) {
                console.log(error);
            });
        }
    };
    SettingsComponent.prototype.submitSystemData = function () {
        var _this = this;
        this.systemDataSubmitted = true;
        if (!this.systemData.invalid) {
            this.fileIsUploading = true;
            var formData = new FormData();
            formData.append("file", this.datafileToUpload);
            this.settingService.uploadfile(formData).subscribe(function (data) {
                _this.fileIsUploading = false;
                _this.toastr.success('پیغام سیستم', data['data']);
            }, function (error) {
                _this.fileIsUploading = false;
                _this.toastr.error(error.error.errors.file[0]);
            });
        }
    };
    SettingsComponent.prototype.removeLastFileData = function () {
        var _this = this;
        this.settingService.removeLastFileData().subscribe(function (data) {
            _this.toastr.success('پیغام سیستم', 'اطلاعات از پایگاه داده حذف شد.');
        }, function (error) {
            _this.toastr.error('خطا در پاک کردن اطلاعات.');
        });
    };
    SettingsComponent.prototype.pingAmi = function () {
        var _this = this;
        this.settingService
            .pingAmi({
            username: this.settings.value.ami.username,
            password: this.settings.value.ami.password,
            ip: this.settings.value.ami.ip
        })
            .subscribe(function (data) {
            console.log("return data", data);
            _this.pingStatus = 1;
            _this.toastr.success("سرور ami فعال است", "نتیجه پینگ!");
        }, function (error) {
            _this.pingStatus = -1;
            _this.toastr.error(error.error.error, "دسترسی به سرور ami ممکن نیست");
        });
        event.preventDefault();
    };
    SettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-settings",
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/views/admin/settings/settings.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_settings_service__WEBPACK_IMPORTED_MODULE_2__["SettingsService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_7__["FileUploadComponent"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/settings/settings.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/admin/settings/settings.module.ts ***!
  \*********************************************************/
/*! exports provided: SettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.component */ "./src/app/views/admin/settings/settings.component.ts");
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-routing.module */ "./src/app/views/admin/settings/settings-routing.module.ts");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "./node_modules/ngx-bootstrap/tabs/fesm5/ngx-bootstrap-tabs.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./file-upload/file-upload.component */ "./src/app/views/admin/settings/file-upload/file-upload.component.ts");








var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _settings_component__WEBPACK_IMPORTED_MODULE_3__["SettingsComponent"],
                _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_7__["FileUploadComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _settings_routing_module__WEBPACK_IMPORTED_MODULE_4__["SettingsRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_5__["TabsModule"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]],
            providers: [_file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_7__["FileUploadComponent"]]
        })
    ], SettingsModule);
    return SettingsModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-admin-admin-module.js.map