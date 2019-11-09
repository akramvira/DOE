"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var profile_service_1 = require("./profile.service");
describe('ProfileService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(profile_service_1.ProfileService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=profile.service.spec.js.map