"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var reports_routing_module_1 = require("./reports-routing.module");
var groups_component_1 = require("./performance-groups/groups.component");
var all_component_1 = require("./performance-all/all.component");
var queues_component_1 = require("./queues/queues.component");
var calls_details_component_1 = require("./calls-details/calls-details.component");
var groups_bills_component_1 = require("./bills-groups/groups-bills.component");
var lines_component_1 = require("./performance-lines/lines.component");
var reports_component_1 = require("./reports.component");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var tabs_1 = require("ngx-bootstrap/tabs");
var forms_1 = require("@angular/forms");
var ng2_charts_1 = require("ng2-charts");
var operator_component_1 = require("./operator/operator.component");
var ng2_jalali_date_picker_1 = require("ng2-jalali-date-picker");
var core_2 = require("@angular/core");
var modal_1 = require("ngx-bootstrap/modal");
var search_column_component_1 = require("../../../components/search-column/search-column.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var components_module_1 = require("../_components/components/components.module");
var performance_l1_component_1 = require("./performance-l1/performance-l1.component");
var performance_l2_component_1 = require("./performance-l2/performance-l2.component");
var performance_l3_component_1 = require("./performance-l3/performance-l3.component");
var compare_all_component_1 = require("./compare-all/compare-all.component");
var ngx_print_1 = require("ngx-print");
var select_item_component_1 = require("./_components/select-item/select-item.component");
var daterange_component_1 = require("./_components/daterange/daterange.component");
var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }
    ReportsModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                groups_component_1.GroupsComponent,
                all_component_1.AllComponent,
                queues_component_1.QueuesComponent,
                calls_details_component_1.CallsDetailsComponent,
                groups_bills_component_1.GroupsBillsComponent,
                lines_component_1.LinesComponent,
                reports_component_1.ReportsComponent,
                operator_component_1.OperatorComponent,
                search_column_component_1.SearchColumnComponent,
                performance_l1_component_1.PerformanceL1Component,
                performance_l2_component_1.PerformanceL2Component,
                performance_l3_component_1.PerformanceL3Component,
                compare_all_component_1.CompareAllComponent,
                select_item_component_1.SelectItemComponent,
                daterange_component_1.DaterangeComponent
            ],
            imports: [
                common_1.CommonModule,
                reports_routing_module_1.ReportsRoutingModule,
                tabs_1.TabsModule,
                ngx_datatable_1.NgxDatatableModule,
                ng2_charts_1.ChartsModule,
                ng2_jalali_date_picker_1.DpDatePickerModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                modal_1.ModalModule.forRoot(),
                components_module_1.ComponentsModule,
                ngx_print_1.NgxPrintModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot()
            ],
            schemas: [core_2.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], ReportsModule);
    return ReportsModule;
}());
exports.ReportsModule = ReportsModule;
//# sourceMappingURL=reports.module.js.map