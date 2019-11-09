"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("./_services/authentication.service");
var shared_service_1 = require("./_services/shared.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, authServ, sharedService) {
        this.router = router;
        this.authServ = authServ;
        this.sharedService = sharedService;
        this.loading = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.sharedService.setMinMaxDate();
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof router_1.NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    };
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof router_1.NavigationStart) {
            this.loading = true;
        }
        if (event instanceof router_1.NavigationEnd) {
            this.loading = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof router_1.NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof router_1.NavigationError) {
            this.loading = false;
        }
    };
    AppComponent = tslib_1.__decorate([
        core_1.Component({
            // tslint:disable-next-line
            selector: 'body',
            template: '<router-outlet></router-outlet>'
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            authentication_service_1.AuthenticationService,
            shared_service_1.SharedService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map