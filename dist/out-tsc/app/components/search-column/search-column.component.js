"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SearchColumnComponent = /** @class */ (function () {
    function SearchColumnComponent() {
        this.id = null;
        this.text = null;
    }
    SearchColumnComponent.prototype.ngOnInit = function () {
    };
    SearchColumnComponent.prototype.FilterData = function (event) {
        debugger;
        // this.tempData = JSON.parse(JSON.stringify(this.storedData));
        // let columnName = event.currentTarget.id;
        // const val = event.target.value.toLowerCase();
        // const filteredData = this.tempData.filter(function(d) {
        // return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
        // });
        // this.data= filteredData;
        // this.myTable.offset = 0;
    };
    SearchColumnComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-search-column',
            inputs: ['id: columnName', 'text:filterText'],
            templateUrl: './search-column.component.html',
            styleUrls: ['./search-column.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SearchColumnComponent);
    return SearchColumnComponent;
}());
exports.SearchColumnComponent = SearchColumnComponent;
//# sourceMappingURL=search-column.component.js.map