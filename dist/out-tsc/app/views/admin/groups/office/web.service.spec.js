"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var web_service_1 = require("./web.service");
describe('WebService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(web_service_1.WebService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=web.service.spec.js.map