"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var excel_service_1 = require("./excel.service");
describe('ExcelService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(excel_service_1.ExcelService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=excel.service.spec.js.map