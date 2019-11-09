"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var forms_1 = require("@angular/forms");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var app_component_1 = require("./app.component");
// Import containers
var containers_1 = require("./containers");
var _404_component_1 = require("./views/error/404.component");
var _500_component_1 = require("./views/error/500.component");
var login_component_1 = require("./views/login/login.component");
var http_1 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var APP_CONTAINERS = [
    containers_1.DefaultLayoutComponent
];
var angular_1 = require("@coreui/angular");
// Import routing module
var app_routing_1 = require("./app.routing");
// Import 3rd party components
var dropdown_1 = require("ngx-bootstrap/dropdown");
var tabs_1 = require("ngx-bootstrap/tabs");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var globals_1 = require("./_services/globals");
var _403_component_1 = require("./views/error/403.component");
var modal_1 = require("ngx-bootstrap/modal");
var excel_service_1 = require("./_services/excel.service");
var components_module_1 = require("./views/admin/_components/components/components.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_1.AppRoutingModule,
                angular_1.AppAsideModule,
                angular_1.AppBreadcrumbModule.forRoot(),
                angular_1.AppFooterModule,
                angular_1.AppHeaderModule,
                angular_1.AppSidebarModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                dropdown_1.BsDropdownModule.forRoot(),
                tabs_1.TabsModule.forRoot(),
                ng2_charts_1.ChartsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                modal_1.ModalModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                components_module_1.ComponentsModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(APP_CONTAINERS, [
                _404_component_1.P404Component,
                _403_component_1.P403Component,
                _500_component_1.P500Component,
                login_component_1.LoginComponent,
            ]),
            providers: [{
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy,
                },
                excel_service_1.ExcelService,
                globals_1.Globals
            ],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            exports: [
                modal_1.ModalModule
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map