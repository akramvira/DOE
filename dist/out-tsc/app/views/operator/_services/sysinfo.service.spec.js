"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var sysinfo_service_1 = require("./sysinfo.service");
describe('SysinfoService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(sysinfo_service_1.SysinfoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=sysinfo.service.spec.js.map