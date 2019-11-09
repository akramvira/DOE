"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var authentication_service_1 = require("../../_services/authentication.service");
var alert_1 = require("../../_services/alert");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var ngx_toastr_1 = require("ngx-toastr");
var shared_service_1 = require("../../_services/shared.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(
    /*private formBuilder: FormBuilder,*/
    route, router, authenticationService, alertService, toastr, sharedService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.toastr = toastr;
        this.sharedService = sharedService;
        this.userName = new forms_1.FormControl('');
        this.password = new forms_1.FormControl('');
        this.loading = false;
        this.submitted = false;
        this.loginMsg = '';
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
        }*/
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.authenticationService.isAuthenticated();
        /*
            this.userName = new FormControl('');
            /!*this.userName.setValue('admin');*!/
            this.password = new FormControl('');
        /!*    this.password.setValue('1234dd56');*!/
        
        */
        /*this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });*/
        // get return url from route parameters or default to '/'
        this.returnUrl = 'admin/dashboard'; //this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return { username: this.userName, password: this.password }; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.userName.value && this.userName.value) {
            this.submitted = true;
            // stop here if form is invalid
            /*if (this.loginForm.invalid) {
              return;
            }*/
            this.loading = true;
            this.authenticationService.login(this.userName.value /*.value*/, this.password.value /*.value*/)
                .pipe(operators_1.first())
                .subscribe(function (data) {
                _this.toastr.clear();
                _this.toastr.success('ادمین عزیز، خوش آمدید!', 'ورود موفق!');
                _this.sharedService.setMinMaxDate();
                _this.router.navigate(['/admin/dashboard']);
            }, function (error) {
                _this.authenticationService.handdleAuthErrors(error);
                _this.loading = false;
            });
        }
        else {
        }
    };
    LoginComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: 'login.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            authentication_service_1.AuthenticationService,
            alert_1.AlertService,
            ngx_toastr_1.ToastrService,
            shared_service_1.SharedService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map