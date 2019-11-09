"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var authentication_service_1 = require("../../_services/authentication.service");
var router_1 = require("@angular/router");
var ngx_toastr_1 = require("ngx-toastr");
var DefaultLayoutComponent = /** @class */ (function () {
    function DefaultLayoutComponent(_document, authenticationService, router, toaster) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.router = router;
        this.toaster = toaster;
        this.navItems = [];
        this.sidebarMinimized = true;
        this.isLoading = true;
        this.loading = false;
        this.router.events.subscribe(function (event) {
            switch (true) {
                case event instanceof router_1.NavigationStart: {
                    _this.isLoading = true;
                    break;
                }
                case event instanceof router_1.NavigationEnd:
                case event instanceof router_1.NavigationCancel:
                case event instanceof router_1.NavigationError: {
                    // this.loading = false;
                    break;
                }
                default: {
                    _this.isLoading = false;
                    break;
                }
            }
        });
        if (!localStorage.getItem("userToken"))
            router.navigate(["/login"]);
        this.changes = new MutationObserver(function (mutations) {
            _this.sidebarMinimized = _document.body.classList.contains("sidebar-minimized");
        });
        this.element = _document.body;
        this.changes.observe(this.element, {
            attributes: true,
            attributeFilter: ["class"]
        });
        authenticationService.getUserMenues().subscribe(function (data) {
            var tmpNavItems = [];
            var haveAccesedMenues = data["data"];
            if (haveAccesedMenues.indexOf("dashboard") > -1)
                tmpNavItems.push({
                    name: "داشبورد",
                    url: "/admin/dashboard",
                    icon: "icon-speedometer"
                });
            if (haveAccesedMenues.indexOf("setting") > -1)
                tmpNavItems.push({
                    name: "تنظیمات اولیه سیستم",
                    url: "/admin/settings",
                    icon: "icon-settings"
                });
            if (haveAccesedMenues.indexOf("reports") > -1) {
                var reportsMeunuChildrens = [
                    {
                        name: "عملکرد",
                        url: "/admin/reports/all",
                        icon: "icon-pie-chart",
                        children: [
                            {
                                name: "عملکرد کلی سیستم",
                                url: "/admin/reports/all",
                                icon: "icon-graph"
                            },
                            {
                                name: "مقایسه کلی",
                                url: "/admin/reports/comapre-all",
                                icon: "icon-people"
                            },
                            {
                                name: "عملکرد معاونت ها",
                                url: "/admin/reports/performance-l1",
                                icon: "icon-people"
                            },
                            {
                                name: "عملکرد ادارات ها",
                                url: "/admin/reports/performance-l2",
                                icon: "icon-people"
                            },
                            {
                                name: "عملکرد داخلی ها",
                                url: "/admin/reports/performance-l3",
                                icon: "icon-call-end fa-rotate-180"
                            }
                        ]
                    },
                    {
                        name: "قبوض ",
                        url: "/admin/reports/groups-bills",
                        icon: "icon-layers",
                    },
                    {
                        name: "ریز مکالمات سیستم",
                        url: "/admin/reports/calls-details",
                        icon: "icon-magnifier-add"
                    }
                ];
                if (haveAccesedMenues.indexOf("operators")) {
                    reportsMeunuChildrens.push({
                        name: "اپراتور ها",
                        url: "/admin/reports/operator",
                        icon: "icon-people"
                    });
                }
                if (haveAccesedMenues.indexOf("bills") > -1) {
                    reportsMeunuChildrens.push({
                        name: "قبوض",
                        url: "/admin/reports/bills",
                        icon: "icon-options"
                    });
                }
                if (haveAccesedMenues.indexOf("queues") > -1) {
                    reportsMeunuChildrens.push({
                        name: "صف ها",
                        url: "/admin/reports/queues",
                        icon: "icon-list"
                    });
                }
                tmpNavItems.push({
                    name: "گزارشات",
                    url: "/admin/reports/all",
                    icon: "icon-chart",
                    children: reportsMeunuChildrens
                });
            }
            var userMnggmntChildren = [
                {
                    name: "ثبت کاربر جدید",
                    url: "/admin/users-management/new-user",
                    icon: "icon-user-following"
                },
                {
                    name: "نمایش همه کاربران",
                    url: "/admin/users-management/users",
                    icon: "icon-people"
                }
            ];
            if (haveAccesedMenues.indexOf("userRols") > -1)
                userMnggmntChildren.push({
                    name: "مقام ها",
                    url: "/admin/users-management/roles",
                    icon: "icon-badge"
                });
            if (haveAccesedMenues.indexOf("users") > -1)
                tmpNavItems.push({
                    name: "مدیریت کاربران",
                    icon: "icon-pie-chart",
                    children: userMnggmntChildren
                });
            if (haveAccesedMenues.indexOf("groupExtensions") > -1)
                tmpNavItems.push({
                    name: "مدیریت بخش ها",
                    icon: "icon-user",
                    children: [
                        {
                            name: "مدیریت معاونت ها",
                            url: "/admin/groups/assistant",
                            icon: "icon-people"
                        },
                        {
                            name: "مدیریت ادارات",
                            url: "/admin/groups/office",
                            icon: "icon-people"
                        },
                        {
                            name: "مدیریت داخلی ها",
                            url: "/admin/groups/lines",
                            icon: "icon-people"
                        },
                    ]
                });
            _this.navItems = tmpNavItems;
        }, function (error) {
            authenticationService.handdleAuthErrors(error);
        });
    }
    DefaultLayoutComponent.prototype.ngOnDestroy = function () {
        this.changes.disconnect();
    };
    DefaultLayoutComponent.prototype.logout = function () {
        var _this = this;
        this.authenticationService.logout().subscribe(function (data) {
            _this.toaster.success("با موفقیت از سیستم خارح شدید.", "خروج موفق!");
            _this.router.navigate(["/login"]);
        }, function (error) {
            _this.toaster.error("مشکلی در روند خروج. به صفحه ورود هدایت می شوید.", "خروج نا موفق!");
            //this.router.navigate(['/login']);
        });
    };
    DefaultLayoutComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-dashboard",
            templateUrl: "./default-layout.component.html"
        }),
        tslib_1.__param(0, core_1.Inject(common_1.DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object, authentication_service_1.AuthenticationService,
            router_1.Router,
            ngx_toastr_1.ToastrService])
    ], DefaultLayoutComponent);
    return DefaultLayoutComponent;
}());
exports.DefaultLayoutComponent = DefaultLayoutComponent;
//# sourceMappingURL=default-layout.component.js.map