"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var reports_service_1 = require("./reports.service");
describe('ReportsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(reports_service_1.ReportsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=reports.service.spec.js.map