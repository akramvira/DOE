"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var events_1 = require("events");
var moment = require("jalali-moment");
var forms_1 = require("@angular/forms");
var shared_service_1 = require("../../../../../_services/shared.service");
var DaterangeComponent = /** @class */ (function () {
    function DaterangeComponent(sharedService) {
        this.sharedService = sharedService;
        this.dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
        this.minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
        this.selectedDateFrom = new forms_1.FormControl("1398/01/01");
        this.selectedDateTo = new forms_1.FormControl("1398/01/01");
        this.datePickerConfig = {};
        this.onSelect = new events_1.EventEmitter();
    }
    DaterangeComponent.prototype.ngOnInit = function () {
        this.setDate();
    };
    DaterangeComponent.prototype.setDate = function () {
        var _this = this;
        if (this.sharedService.minMaxTime.value) {
            this.minDate = this.sharedService.minMaxTime.value.min;
            this.maxDate = this.sharedService.minMaxTime.value.max;
            this.selectedDateFrom.setValue(this.minDate);
            this.selectedDateTo.setValue(this.maxDate);
            this.datePickerConfig = {
                format: "jYYYY/MM/DD",
                theme: "dp-material",
                min: moment(this.minDate, "jYYYY,jMM,jDD"),
                max: moment(this.maxDate, "jYYYY,jMM,jDD"),
                showGoToCurrent: true,
                hideOnOutsideClick: true,
                showNearMonthDays: true
            };
        }
        this.sharedService.minMaxTime.subscribe(function (data) {
            _this.minDate = data["min"];
            _this.maxDate = data["max"];
            _this.selectedDateFrom.setValue(_this.minDate);
            _this.selectedDateTo.setValue(_this.maxDate);
            _this.datePickerConfig = {
                format: "jYYYY/MM/DD",
                theme: "dp-material",
                min: moment(_this.minDate, "jYYYY,jMM,jDD"),
                max: moment(_this.maxDate, "jYYYY,jMM,jDD"),
                showGoToCurrent: true,
                hideOnOutsideClick: true,
                showNearMonthDays: true
            };
        });
    };
    DaterangeComponent.prototype.onSelectDate = function () {
        this.onSelect.emit(this.selectedDateFrom.value, this.selectedDateTo.value);
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", events_1.EventEmitter)
    ], DaterangeComponent.prototype, "onSelect", void 0);
    DaterangeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-daterange',
            templateUrl: './daterange.component.html',
            styleUrls: ['./daterange.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [shared_service_1.SharedService])
    ], DaterangeComponent);
    return DaterangeComponent;
}());
exports.DaterangeComponent = DaterangeComponent;
//# sourceMappingURL=daterange.component.js.map