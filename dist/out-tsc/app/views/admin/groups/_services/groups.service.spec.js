"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var groups_service_1 = require("./groups.service");
describe('GroupsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(groups_service_1.GroupsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=groups.service.spec.js.map