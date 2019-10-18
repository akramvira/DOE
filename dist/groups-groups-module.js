(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["groups-groups-module"],{

/***/ "./src/app/views/admin/groups/_services/groups.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/admin/groups/_services/groups.service.ts ***!
  \****************************************************************/
/*! exports provided: GroupsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsService", function() { return GroupsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var GroupsService = /** @class */ (function () {
    function GroupsService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    GroupsService.prototype.getAllGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups', options);
    };
    GroupsService.prototype.removeGroup = function (groupId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/' + groupId, options);
    };
    GroupsService.prototype.addGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups', data, options);
    };
    GroupsService.prototype.updateGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/' + data['id'], data, options);
    };
    GroupsService.prototype.deleteGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/' + data['id'], options);
    };
    GroupsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], GroupsService);
    return GroupsService;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/assistant/assistant.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/views/admin/groups/assistant/assistant.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row animated fadeIn mt-4\">\n  <div class=\"col-2\">\n    <div class=\"card card-accent-primary\">\n      <div class=\"card-header\">  لیست معاونت ها </div>\n      <div class=\"card-body\">\n          <ngx-datatable class=\"material border-bottom\"\n          [rows]=\"groups\"\n          [headerHeight]=\"40\"\n          \n          [rowHeight]=\"'auto'\"\n          [selectionType]=\"'single'\"\n          [columnMode]=\"'force'\"  \n          style=\"width: 100%\"\n          (activate)=\"onActivate($event)\"\n          >\n         \n\n       <ngx-datatable-column\n       \n        [sortable]=\"true\"\n        [canAutoResize]=\"false\"\n        [draggable]=\"false\"\n        [resizeable]=\"false\"\n        [width]=\"100\"\n        name=\"name\"\n        >\n        <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n            <span >نام معاونت</span>\n          </ng-template>\n          <ng-template let-value=\"value\"   let-row=\"row\" \n            let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n              <span\n              title=\"برای ویرایش دوبار کلیک کنید!\"\n              (dblclick)=\"editing[rowIndex + '-name'] = true\"\n              (click)=\"setActiveRow(rowIndex)\"\n              *ngIf=\"!editing[rowIndex + '-name']\">\n              {{value}}\n            </span>\n            <input class=\"form-text col-12\"\n              autofocus\n              (blur)=\"updateValue($event, 'name', rowIndex)\"\n              (keypress)=\"onKeyPress($event)\"\n            \n              *ngIf=\"editing[rowIndex+ '-name']\"\n              type=\"text\"\n              [value]=\"value\"\n            />\n          </ng-template>\n     </ngx-datatable-column>\n     <ngx-datatable-column\n       \n     [sortable]=\"true\"\n     [canAutoResize]=\"false\"\n     [draggable]=\"false\"\n     [resizeable]=\"false\"\n     name=\"edit\"\n     [width]=\"50\"\n     >\n     <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n         <span >حذف</span>\n       </ng-template>\n       <ng-template let-value=\"value\"   let-row=\"row\" \n         let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n        <span class=\"btn btn-sm btn-danger\" data-toggle=\"modal\" (click)=\"showRemoveModal(rowIndex)\">\n          <i class=\"fa fa-trash\"></i>\n        </span>\n\n       </ng-template>\n  </ngx-datatable-column>\n\n    </ngx-datatable>\n\n  <div class=\"col-12 text-left\">\n    <div class=\"row text-center justify-content-center\">\n      <input class=\"form-control col-12\" [hidden]=\"!addingNewGroup\" [formControl]=\"newGroupName\" >\n\n      <button class=\"btn  \" title=\"اضافه کردن معاونت جدید\"\n      [ngClass] = \"{'btn-warning btn-pill':!addingNewGroup, 'btn-success col-5':addingNewGroup }\"\n       (click)=\"addNewGroupClick()\">{{ addingNewGroup? 'ثبت' : '+' }}</button>\n\n       <button class=\"col-5 btn btn-warning\" [hidden]=\"!addingNewGroup\" (click)=\"addingNewGroup=false\" >لغو</button>\n    </div>\n  </div>\n      </div>\n    </div>  \n  </div>\n\n  \n<div class=\"col-4\">\n  <div class=\"card card-accent-danger\">\n    <div class=\"card-header p-1  \">\n        <div class=\"col-12\">\n          <div class=\"row align-items-center\">\n            <span class=\"col-5 pl-2\">اداره های این معاونت </span>\n            <input class=\"form-control col-3\" placeholder=\"فیلتر\"/> \n          </div>\n      </div>\n    </div>\n    <div class=\"card-body direction-ltr text-center\">\n        <div *ngFor=\"let item of selectedGroupExtensions\" class=\"btn col-4 btn-success m-1\"\n        (click)=\"removeFromSelectedParent($event, item)\"  title=\"{{item.number}}\">\n        {{ item.name? item.name : item.number }}\n          </div>\n            {{selectedGroupExtensions? '' : 'معاونتی انتخاب نشده است.' }}\n    </div>\n    <div class=\"card-footer text-left\" [hidden]=\"!itemsChanged\"> <button class=\"btn btn-primary\" (click)=\"updateParentItems()\">ثبت نهایی</button>  </div>\n  </div>\n</div>\n<div class=\"col-6\">\n  <div class=\"card card-accent-success\">\n      <div class=\"card-header p-1  \">\n          <div class=\"col-12\">\n            <div class=\"row align-items-center\">\n              <span class=\"col-5 pl-2\">همه اداره ها </span>\n              <input class=\"form-control col-3 text-left\" type=\"number\"\n               placeholder=\"فیلتر\" (keyup)=\"filterAllExtensions($event)\" /> \n            </div>\n        </div>\n      </div>\n    <div class=\"card-body row justify-content-center align-items-center direction-ltr text-center\">\n          <div *ngFor=\"let item of remainingExtensions\" class=\"col-4 btn btn-info m-1\" \n          (click)=\"addItemToSelectedParent($event, item)\"  title=\"{{item.number}}\">\n          {{ item.name? item.name : item.number }}\n            </div>\n    </div>\n  </div>\n</div>\n</div>\n\n\n<div bsModal #removeGroupModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm modal-danger\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n       \n        <button type=\"button\" class=\"close\" (click)=\"smallModal.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">حذف معاونت</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>آیا از حذف  معاونت \"{{selectedItemNameToDelete}}\" مطمئنید؟</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"smallModal.hide()\">انصراف</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirmDelete()\">بله حذف شود</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->"

/***/ }),

/***/ "./src/app/views/admin/groups/assistant/assistant.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/views/admin/groups/assistant/assistant.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkbWluL2dyb3Vwcy9hc3Npc3RhbnQvYXNzaXN0YW50LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/admin/groups/assistant/assistant.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/admin/groups/assistant/assistant.component.ts ***!
  \*********************************************************************/
/*! exports provided: AssistantComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssistantComponent", function() { return AssistantComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web.service */ "./src/app/views/admin/groups/assistant/web.service.ts");







var AssistantComponent = /** @class */ (function () {
    function AssistantComponent(webServ, authServ, toastr) {
        this.webServ = webServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.groups = new Array();
        this.selectedGroupExtensions = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewGroup = false;
        this.newGroupName = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]);
        this.editing = {};
        this.selectedItemNameToDelete = "";
    }
    AssistantComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webServ.getAllGroups().subscribe(function (data) {
            data = data["data"];
            var groupesData = new Array();
            for (var i in data["groups"]) {
                groupesData.push(data["groups"][i]);
            }
            _this.groups = groupesData;
            _this.allExtensions = data["sub"];
            _this.remainingExtensions = _this.allExtensions;
            _this.setRemainingExtensions();
            // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    AssistantComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        console.log("inline editing rowIndex", rowIndex);
        this.editing[rowIndex + "-" + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        console.log("UPDATED!", this.groups[rowIndex][cell]);
        var newName = this.groups[rowIndex][cell];
        var id = this.groups[rowIndex]["id"];
        this.webServ
            .updateGroup({
            name: newName,
            id: id,
            value: this.selectedGroupExtensions.join(",")
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success("نام گروه با موفقیت تغییر یافت");
        }, function (error) {
            console.log(error);
        });
    };
    AssistantComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    AssistantComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    AssistantComponent.prototype.onActivate = function (event) {
        if (event.type == "click") {
            this.refreshParents();
            this.parentSelected = true;
            this.selectedGroupExtensions = JSON.parse(JSON.stringify(event.row["sub"]));
            // this.convertSelectedGroupExtentionsToInt();
            this.setRemainingExtensions();
            this.activeParentId = event.row.id;
            this.itemsChanged = false;
        }
    };
    AssistantComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    AssistantComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    AssistantComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.selectedGroupExtensions.forEach(function (e, i) {
            $this.selectedGroupExtensions[i] = parseInt($this.selectedGroupExtensions[i]);
        });
    };
    AssistantComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    AssistantComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
            }
    };
    AssistantComponent.prototype.updateParentItems = function () {
        var _this = this;
        this.webServ
            .updateGroup({
            id: this.activeParentId,
            value: this.selectedGroupExtensions.join(",")
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.groups[_this.activeRow]["value"] = _this.selectedGroupExtensions.join(",");
            _this.refreshParents();
            _this.toastr.success("داخلی های گروهگ " +
                _this.groups[_this.activeRow]["name"] +
                "  با موفقیت ثبت شد.");
        }, function (error) {
            console.log(error);
        });
    };
    AssistantComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value,
                value: []
            };
            this.webServ.addGroup(newItemData_1).subscribe(function (data) {
                _this.toastr.success("گروه با موفقیت اضافه شد.");
                _this.groups.push(newItemData_1);
                _this.refreshParents();
            }, function (error) {
                console.log(error);
            });
            this.refreshParents();
            this.addingNewGroup = false;
        }
        else
            this.addingNewGroup = true;
    };
    AssistantComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            String(el).indexOf(searhKey) == 0;
        });
    };
    AssistantComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
    };
    AssistantComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeId = this.activeRow;
        this.webServ.deleteGroup(this.groups[this.activeRow]["id"]).subscribe(function (data) {
            _this.removeGroup(activeId);
            _this.toastr.success(_this.groups[activeId]["name"] + '"  با موفقیت حذف شد.');
            _this.smallModal.hide();
            _this.refreshParents();
        }, function (error) {
            _this.smallModal.hide();
            _this.authServ.handdleAuthErrors(error);
        });
    };
    AssistantComponent.prototype.removeGroup = function (rowId) {
        this.groups.splice(rowId, 1);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("removeGroupModal"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], AssistantComponent.prototype, "smallModal", void 0);
    AssistantComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-assistant",
            template: __webpack_require__(/*! ./assistant.component.html */ "./src/app/views/admin/groups/assistant/assistant.component.html"),
            styles: [__webpack_require__(/*! ./assistant.component.scss */ "./src/app/views/admin/groups/assistant/assistant.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_web_service__WEBPACK_IMPORTED_MODULE_6__["WebService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], AssistantComponent);
    return AssistantComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/assistant/web.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/admin/groups/assistant/web.service.ts ***!
  \*************************************************************/
/*! exports provided: WebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebService", function() { return WebService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var WebService = /** @class */ (function () {
    function WebService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    WebService.prototype.getAllGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/main', options);
    };
    WebService.prototype.removeGroup = function (groupId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/main/' + groupId, options);
    };
    WebService.prototype.addGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/main', data, options);
    };
    WebService.prototype.updateGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/main/' + data['id'], data, options);
    };
    WebService.prototype.deleteGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/main/' + data['id'], options);
    };
    WebService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], WebService);
    return WebService;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/groups-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/admin/groups/groups-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: GroupsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsRoutingModule", function() { return GroupsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _assistant_assistant_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assistant/assistant.component */ "./src/app/views/admin/groups/assistant/assistant.component.ts");
/* harmony import */ var _office_office_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./office/office.component */ "./src/app/views/admin/groups/office/office.component.ts");
/* harmony import */ var _lines_lines_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lines/lines.component */ "./src/app/views/admin/groups/lines/lines.component.ts");






var routes = [
    {
        path: '',
        data: {
            title: 'مدیریت گروه بندی ها'
        },
        children: [
            { path: '', redirectTo: 'assistant', pathMatch: 'full' },
            { path: 'assistant', component: _assistant_assistant_component__WEBPACK_IMPORTED_MODULE_3__["AssistantComponent"], data: { title: 'مدیریت معاونت ها' } },
            { path: 'office', component: _office_office_component__WEBPACK_IMPORTED_MODULE_4__["OfficeComponent"], data: { title: 'مدیریت ادارات' } },
            { path: 'lines', component: _lines_lines_component__WEBPACK_IMPORTED_MODULE_5__["LinesComponent"], data: { title: 'مدیریت داخلی ها' } },
        ]
    }
];
var GroupsRoutingModule = /** @class */ (function () {
    function GroupsRoutingModule() {
    }
    GroupsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], GroupsRoutingModule);
    return GroupsRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/groups.component.html":
/*!**********************************************************!*\
  !*** ./src/app/views/admin/groups/groups.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-oitlet></router-oitlet>\n<div class=\"row animated fadeIn mt-4\">\n  <div class=\"col-2\">\n    <div class=\"card card-accent-primary\">\n      <div class=\"card-header\">  لیست گروه ها </div>\n      <div class=\"card-body\">\n          <ngx-datatable class=\"material border-bottom\"\n          [rows]=\"groups\"\n          [headerHeight]=\"40\"\n          \n          [rowHeight]=\"'auto'\"\n          [selectionType]=\"'single'\"\n          [columnMode]=\"'force'\"  \n          style=\"width: 100%\"\n          (activate)=\"onActivate($event)\"\n          >\n         \n\n       <ngx-datatable-column\n       \n        [sortable]=\"true\"\n        [canAutoResize]=\"false\"\n        [draggable]=\"false\"\n        [resizeable]=\"false\"\n        [width]=\"100\"\n        name=\"name\"\n        >\n        <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n            <span >نام گروه</span>\n          </ng-template>\n          <ng-template let-value=\"value\"   let-row=\"row\" \n            let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n              <span\n              title=\"برای ویرایش دوبار کلیک کنید!\"\n              (dblclick)=\"editing[rowIndex + '-name'] = true\"\n              (click)=\"setActiveRow(rowIndex)\"\n              *ngIf=\"!editing[rowIndex + '-name']\">\n              {{value}}\n            </span>\n            <input class=\"form-text col-12\"\n              autofocus\n              (blur)=\"updateValue($event, 'name', rowIndex)\"\n              (keypress)=\"onKeyPress($event)\"\n            \n              *ngIf=\"editing[rowIndex+ '-name']\"\n              type=\"text\"\n              [value]=\"value\"\n            />\n          </ng-template>\n     </ngx-datatable-column>\n     <ngx-datatable-column\n       \n     [sortable]=\"true\"\n     [canAutoResize]=\"false\"\n     [draggable]=\"false\"\n     [resizeable]=\"false\"\n     name=\"edit\"\n     [width]=\"50\"\n     >\n     <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n         <span >حذف</span>\n       </ng-template>\n       <ng-template let-value=\"value\"   let-row=\"row\" \n         let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n        <span class=\"btn btn-sm btn-danger\" data-toggle=\"modal\" (click)=\"showRemoveModal(rowIndex)\">\n          <i class=\"fa fa-trash\"></i>\n        </span>\n\n       </ng-template>\n  </ngx-datatable-column>\n\n    </ngx-datatable>\n\n  <div class=\"col-12 text-left\">\n    <div class=\"row text-center justify-content-center\">\n      <input class=\"form-control col-12\" [hidden]=\"!addingNewGroup\" [formControl]=\"newGroupName\" >\n\n      <button class=\"btn  \" title=\"اضافه کردن گروه جدید\"\n      [ngClass] = \"{'btn-warning btn-pill':!addingNewGroup, 'btn-success col-5':addingNewGroup }\"\n       (click)=\"addNewGroupClick()\">{{ addingNewGroup? 'ثبت' : '+' }}</button>\n\n       <button class=\"col-5 btn btn-warning\" [hidden]=\"!addingNewGroup\" (click)=\"addingNewGroup=false\" >لغو</button>\n    </div>\n  </div>\n      </div>\n    </div>  \n  </div>\n\n  \n<div class=\"col-4\">\n  <div class=\"card card-accent-danger\">\n    <div class=\"card-header p-1  \">\n        <div class=\"col-12\">\n          <div class=\"row align-items-center\">\n            <span class=\"col-5 pl-2\">داخلی های این گروه </span>\n            <input class=\"form-control col-3\" placeholder=\"فیلتر\"/> \n          </div>\n      </div>\n    </div>\n    <div class=\"card-body direction-ltr text-center\">\n        <div *ngFor=\"let item of selectedGroupExtensions\" class=\"btn col-2 btn-success m-1\"\n        (click)=\"removeFromSelectedParent($event, item)\">\n            {{item }}\n          </div>\n            {{selectedGroupExtensions? '' : 'گروهی انتخاب نشده است.' }}\n    </div>\n    <div class=\"card-footer text-left\" [hidden]=\"!itemsChanged\"> <button class=\"btn btn-primary\" (click)=\"updateParentItems()\">ثبت نهایی</button>  </div>\n  </div>\n</div>\n<div class=\"col-6\">\n  <div class=\"card card-accent-success\">\n      <div class=\"card-header p-1  \">\n          <div class=\"col-12\">\n            <div class=\"row align-items-center\">\n              <span class=\"col-5 pl-2\">همه داخلی ها </span>\n              <input class=\"form-control col-3 text-left\" type=\"number\"\n               placeholder=\"فیلتر\" (keyup)=\"filterAllExtensions($event)\" /> \n            </div>\n        </div>\n      </div>\n    <div class=\"card-body row justify-content-center align-items-center direction-ltr text-center\">\n          <div *ngFor=\"let item of remainingExtensions\" class=\"col-2 btn btn-info m-1\" \n          (click)=\"addItemToSelectedParent($event, item)\">\n              {{ item }}\n            </div>\n    </div>\n  </div>\n</div>\n</div>\n\n\n<div bsModal #removeGroupModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm modal-danger\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n       \n        <button type=\"button\" class=\"close\" (click)=\"smallModal.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">حذف گروه</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>آیا از حذف  گروه \"{{selectedItemNameToDelete}}\" مطمئنید؟</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"smallModal.hide()\">انصراف</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirmDelete()\">بله حذف شود</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->"

/***/ }),

/***/ "./src/app/views/admin/groups/groups.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/views/admin/groups/groups.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkbWluL2dyb3Vwcy9ncm91cHMuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/views/admin/groups/groups.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/admin/groups/groups.component.ts ***!
  \********************************************************/
/*! exports provided: GroupsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsComponent", function() { return GroupsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_groups_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_services/groups.service */ "./src/app/views/admin/groups/_services/groups.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");







var GroupsComponent = /** @class */ (function () {
    function GroupsComponent(groupServ, authServ, toastr) {
        this.groupServ = groupServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.groups = new Array();
        this.selectedGroupExtensions = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewGroup = false;
        this.newGroupName = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]);
        this.editing = {};
        this.selectedItemNameToDelete = '';
    }
    GroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupServ.getAllGroups().subscribe(function (data) {
            var groupesData = new Array();
            for (var i in data['groups']) {
                groupesData.push(data['groups'][i]);
            }
            _this.groups = groupesData;
            _this.allExtensions = data['extensions'];
            _this.remainingExtensions = _this.allExtensions;
            _this.setRemainingExtensions();
            // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
        }, function (error) {
            console.log(error);
            _this.authServ.handdleAuthErrors(error);
        });
    };
    GroupsComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        console.log('UPDATED!', this.groups[rowIndex][cell]);
        var newName = this.groups[rowIndex][cell];
        var id = this.groups[rowIndex]['id'];
        this.groupServ.updateGroup({ name: newName, id: id, value: this.selectedGroupExtensions.join(',') })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success('نام گروه با موفقیت تغییر یافت');
        }, function (error) { console.log(error); });
    };
    GroupsComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    GroupsComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    GroupsComponent.prototype.onActivate = function (event) {
        if (event.type == 'click') {
            this.parentSelected = true;
            this.selectedGroupExtensions = event.row.value.split(',');
            this.convertSelectedGroupExtentionsToInt();
            this.setRemainingExtensions();
            this.activeParentId = event.row.id;
            this.itemsChanged = false;
        }
    };
    GroupsComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    GroupsComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    GroupsComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.selectedGroupExtensions.forEach(function (e, i) {
            $this.selectedGroupExtensions[i] = parseInt($this.selectedGroupExtensions[i]);
        });
    };
    GroupsComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    GroupsComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
            }
    };
    GroupsComponent.prototype.updateParentItems = function () {
        var _this = this;
        this.groupServ.updateGroup({ id: this.activeParentId, value: this.selectedGroupExtensions.join(',') })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.groups[_this.activeRow]['value'] = _this.selectedGroupExtensions.join(',');
            _this.refreshParents();
            _this.toastr.success('داخلی های گروهگ ' + _this.groups[_this.activeRow]['name'] + '  با موفقیت ثبت شد.');
        }, function (error) { console.log(error); });
    };
    GroupsComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value,
                value: []
            };
            this.groupServ.addGroup(newItemData_1).subscribe(function (data) {
                _this.toastr.success('گروه با موفقیت اضافه شد.');
                _this.groups.push(newItemData_1);
                _this.refreshParents();
            }, function (error) { console.log(error); });
            this.refreshParents();
            this.addingNewGroup = false;
        }
        else
            this.addingNewGroup = true;
    };
    GroupsComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            //debugger;
            String(el).indexOf(searhKey) == 0;
        });
    };
    GroupsComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]['name'];
    };
    GroupsComponent.prototype.confirmDelete = function () {
        this.groupServ.deleteGroup(this.groups[this.activeRow]['id'])
            .subscribe(function (data) { console.log(data); }, function (error) { console.log(error); });
        console.log(this.groups[this.activeRow]['title']);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('removeGroupModal'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], GroupsComponent.prototype, "smallModal", void 0);
    GroupsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-groups',
            template: __webpack_require__(/*! ./groups.component.html */ "./src/app/views/admin/groups/groups.component.html"),
            styles: [__webpack_require__(/*! ./groups.component.scss */ "./src/app/views/admin/groups/groups.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_groups_service__WEBPACK_IMPORTED_MODULE_2__["GroupsService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], GroupsComponent);
    return GroupsComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/groups.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/admin/groups/groups.module.ts ***!
  \*****************************************************/
/*! exports provided: GroupsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsModule", function() { return GroupsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _groups_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./groups-routing.module */ "./src/app/views/admin/groups/groups-routing.module.ts");
/* harmony import */ var _groups_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./groups.component */ "./src/app/views/admin/groups/groups.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _assistant_assistant_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assistant/assistant.component */ "./src/app/views/admin/groups/assistant/assistant.component.ts");
/* harmony import */ var _office_office_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./office/office.component */ "./src/app/views/admin/groups/office/office.component.ts");
/* harmony import */ var _lines_lines_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lines/lines.component */ "./src/app/views/admin/groups/lines/lines.component.ts");











var GroupsModule = /** @class */ (function () {
    function GroupsModule() {
    }
    GroupsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _groups_component__WEBPACK_IMPORTED_MODULE_4__["GroupsComponent"],
                _assistant_assistant_component__WEBPACK_IMPORTED_MODULE_8__["AssistantComponent"],
                _office_office_component__WEBPACK_IMPORTED_MODULE_9__["OfficeComponent"],
                _lines_lines_component__WEBPACK_IMPORTED_MODULE_10__["LinesComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _groups_routing_module__WEBPACK_IMPORTED_MODULE_3__["GroupsRoutingModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ModalModule"].forRoot(),
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"]
            ],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], GroupsModule);
    return GroupsModule;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/lines/lines.component.html":
/*!***************************************************************!*\
  !*** ./src/app/views/admin/groups/lines/lines.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row animated fadeIn mt-4 justify-content-center\">\n    <div class=\"col-6\">\n      <div class=\"card card-accent-primary\">\n        <div class=\"card-header\">  لیست داخلی ها </div>\n\n\n        <form class=\"col-12 text-left mt-1\" (ngSubmit)=\"submitNewItem()\" >\n            <div class=\"row text-center justify-content-center\">\n              <input class=\"form-control col-4 p-1 m-2\" placeholder=\"نام داخلی\" [hidden]=\"!addingNewGroup\" [formControl]=\"newGroupName\" >\n              <input class=\"form-control col-4 p-1 m-2\" placeholder=\"شماره داخلی*\" [hidden]=\"!addingNewGroup\"\n               [formControl]=\"newGroupNumber\" >\n               <label class=\"text-danger\" *ngIf=\"newGroupNumber.value.error\">\n                 شماره باید کمتر از 8 رقم باشد.\n               </label>\n            </div>\n            <div class=\"row text-center justify-content-center\">\n              <button class=\"btn\" type=\"submit\" title=\"اضافه کردن داخلی جدید\"\n              [ngClass] = \"{'btn-warning btn-pill':!addingNewGroup, 'btn-success col-3 m-1 p-0':addingNewGroup }\"\n               >{{ addingNewGroup? 'ثبت' : ' +اضافه کردن داخلی' }}</button>\n        \n               <button class=\"col-3 m-1 btn btn-warning\" [hidden]=\"!addingNewGroup\" (click)=\"addingNewGroup=false\" >لغو</button>\n            </div>\n        </form>\n        <hr />\n\n\n        <div class=\"card-body\">\n            <ngx-datatable class=\"material border-bottom\"\n            [rows]=\"groups\"\n            [headerHeight]=\"40\"\n            \n            [rowHeight]=\"'auto'\"\n            [selectionType]=\"'single'\"\n            [columnMode]=\"'force'\"  \n            style=\"width: 100%\"\n            (activate)=\"onActivate($event)\"\n            [footerHeight]=\"50\"\n            [count]=\"12\"\n            [offset]=\"0\"\n            [limit]=\"10\"\n            \n            >\n           \n            <ngx-datatable-column\n            [sortable]=\"true\"\n            [canAutoResize]=\"false\"\n            [draggable]=\"false\"\n            [resizeable]=\"false\"\n            [width]=\"50\"\n            name=\"id\"\n            >\n            <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n                <span >ردیف</span>\n              </ng-template>\n              <ng-template   let-rowIndex=\"rowIndex\" >\n                  {{rowIndex}}\n              </ng-template>\n         </ngx-datatable-column>\n        <ngx-datatable-column\n         \n          [sortable]=\"true\"\n          [canAutoResize]=\"false\"\n          [draggable]=\"false\"\n          [resizeable]=\"false\"\n          [width]=\"250\"\n          name=\"name\"\n          >\n          <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n              <span >نام داخلی</span>\n            </ng-template>\n            <ng-template let-value=\"value\"   let-row=\"row\" \n              let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n                <span\n                title=\"برای ویرایش دوبار کلیک کنید!\"\n                (dblclick)=\"editing[rowIndex + '-name'] = true\"\n                (click)=\"setActiveRow(rowIndex)\"\n                *ngIf=\"!editing[rowIndex + '-name']\">\n                {{value}}\n              </span>\n              <input class=\"form-text col-12\"\n                autofocus\n                (blur)=\"updateValue($event, 'name', rowIndex)\"\n                (keypress)=\"onKeyPress($event)\"\n              \n                *ngIf=\"editing[rowIndex+ '-name']\"\n                type=\"text\"\n                [value]=\"value\"\n              />\n            </ng-template>\n       </ngx-datatable-column>\n       <ngx-datatable-column\n         \n       [sortable]=\"true\"\n       [canAutoResize]=\"false\"\n       [draggable]=\"false\"\n       [resizeable]=\"false\"\n       [width]=\"200\"\n       name=\"number\"\n       >\n       <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n           <span >شماره داخلی</span>\n         </ng-template>\n         <ng-template let-value=\"value\"   let-row=\"row\" \n           let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n             <span\n             title=\"برای ویرایش دوبار کلیک کنید!\"\n             (dblclick)=\"editing[rowIndex + '-number'] = true\"\n             (click)=\"setActiveRow(rowIndex)\"\n             *ngIf=\"!editing[rowIndex + '-number']\">\n             {{value}}\n           </span>\n           <input class=\"form-text col-12\"\n             autofocus\n             (blur)=\"updateValue($event, 'number', rowIndex)\"\n             (keypress)=\"onKeyPress($event)\"\n           \n             *ngIf=\"editing[rowIndex+ '-number']\"\n             type=\"text\"\n             [value]=\"value\"\n           />\n         </ng-template>\n    </ngx-datatable-column>\n       <ngx-datatable-column\n         \n       [sortable]=\"true\"\n       [canAutoResize]=\"false\"\n       [draggable]=\"false\"\n       [resizeable]=\"false\"\n       name=\"edit\"\n       [width]=\"50\"\n       >\n       <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n           <span >حذف</span>\n         </ng-template>\n         <ng-template let-value=\"value\"   let-row=\"row\" \n           let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n          <span class=\"btn btn-sm btn-danger\" data-toggle=\"modal\" (click)=\"showRemoveModal(rowIndex)\">\n            <i class=\"fa fa-trash\"></i>\n          </span>\n  \n         </ng-template>\n    </ngx-datatable-column>\n  \n      </ngx-datatable>\n  \n\n        </div>\n      </div>  \n    </div>\n</div>\n<div bsModal #removeGroupModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm modal-danger\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        \n        <button type=\"button\" class=\"close\" (click)=\"smallModal.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">حذف داخلی</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>آیا از حذف  داخلی \"{{selectedItemNameToDelete}}\" مطمئنید؟</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"smallModal.hide()\">انصراف</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirmDelete()\">بله حذف شود</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->"

/***/ }),

/***/ "./src/app/views/admin/groups/lines/lines.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/views/admin/groups/lines/lines.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkbWluL2dyb3Vwcy9saW5lcy9saW5lcy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/views/admin/groups/lines/lines.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/admin/groups/lines/lines.component.ts ***!
  \*************************************************************/
/*! exports provided: LinesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinesComponent", function() { return LinesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web.service */ "./src/app/views/admin/groups/lines/web.service.ts");







var LinesComponent = /** @class */ (function () {
    function LinesComponent(webServ, authServ, toastr) {
        this.webServ = webServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.groups = new Array();
        this.selectedGroupExtensions = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewGroup = false;
        this.newGroupName = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]("");
        this.newGroupNumber = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].max(8)]);
        this.editing = {};
        this.selectedItemNameToDelete = "";
    }
    LinesComponent.prototype.submitNewItem = function () {
        this.addNewGroupClick();
    };
    LinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.toastr.warning('جهت ویرایش، روی نام یا شماره داخلی دو بار کلیک کنید!', 'پیغام سیستم');
        this.webServ.getAllGroups().subscribe(function (data) {
            data = data["data"];
            var groupesData = new Array();
            for (var i in data) {
                groupesData.push(data[i]);
            }
            _this.groups = groupesData;
            _this.allExtensions = data["sub"];
            _this.remainingExtensions = _this.allExtensions;
            _this.setRemainingExtensions();
            // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    LinesComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + "-" + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        var newName = this.groups[rowIndex][cell];
        var id = this.groups[rowIndex]["id"];
        this.webServ
            .updateGroup({
            name: this.groups[rowIndex]['name'],
            number: this.groups[rowIndex]['number'],
            id: id
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success("اطلاعات داخلی با موفقیت تغییر یافت.");
        }, function (error) {
            console.log(error);
        });
    };
    LinesComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    LinesComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    LinesComponent.prototype.onActivate = function (event) {
        // if (event.type == "click") {
        //   this.refreshParents();
        //   this.parentSelected = true;
        //   this.selectedGroupExtensions = JSON.parse(
        //     JSON.stringify(event.row["sub"])
        //   );
        //   // this.convertSelectedGroupExtentionsToInt();
        //   this.setRemainingExtensions();
        //   this.activeParentId = event.row.id;
        //   this.itemsChanged = false;
        // }
    };
    LinesComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    LinesComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    LinesComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.selectedGroupExtensions.forEach(function (e, i) {
            $this.selectedGroupExtensions[i] = parseInt($this.selectedGroupExtensions[i]);
        });
    };
    LinesComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    LinesComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
            }
    };
    LinesComponent.prototype.updateParentItems = function () {
        var _this = this;
        this.webServ
            .updateGroup({
            id: this.activeParentId,
            value: this.selectedGroupExtensions.join(",")
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.groups[_this.activeRow]["value"] = _this.selectedGroupExtensions.join(",");
            _this.refreshParents();
            _this.toastr.success("داخلی های گروهگ " +
                _this.groups[_this.activeRow]["name"] +
                "  با موفقیت ثبت شد.");
        }, function (error) {
            console.log(error);
        });
    };
    LinesComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value,
                number: this.newGroupNumber.value
            };
            this.webServ.addGroup(newItemData_1).subscribe(function (data) {
                debugger;
                _this.toastr.success("گروه با موفقیت اضافه شد.");
                newItemData_1['id'] = data['data']['id'];
                _this.groups.unshift(newItemData_1);
                _this.refreshParents();
                _this.addingNewGroup = false;
                _this.newGroupName.setValue('');
                _this.newGroupNumber.setValue('');
            }, function (error) {
                _this.refreshParents();
                _this.authServ.handdleAuthErrors(error);
            });
        }
        else
            this.addingNewGroup = true;
    };
    LinesComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            String(el).indexOf(searhKey) == 0;
        });
    };
    LinesComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
    };
    LinesComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeId = this.activeRow;
        this.webServ.deleteGroup(this.groups[this.activeRow]["id"]).subscribe(function (data) {
            debugger;
            _this.removeGroup(activeId);
            _this.toastr.success(_this.groups[activeId]["name"] + '"  با موفقیت حذف شد.');
            _this.smallModal.hide();
            _this.refreshParents();
        }, function (error) {
            _this.smallModal.hide();
            _this.authServ.handdleAuthErrors(error);
        });
    };
    LinesComponent.prototype.removeGroup = function (rowId) {
        this.groups.splice(rowId, 1);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("removeGroupModal"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], LinesComponent.prototype, "smallModal", void 0);
    LinesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-lines',
            template: __webpack_require__(/*! ./lines.component.html */ "./src/app/views/admin/groups/lines/lines.component.html"),
            styles: [__webpack_require__(/*! ./lines.component.scss */ "./src/app/views/admin/groups/lines/lines.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_web_service__WEBPACK_IMPORTED_MODULE_6__["WebService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], LinesComponent);
    return LinesComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/lines/web.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/admin/groups/lines/web.service.ts ***!
  \*********************************************************/
/*! exports provided: WebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebService", function() { return WebService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var WebService = /** @class */ (function () {
    function WebService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    WebService.prototype.getAllGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/extensions', options);
    };
    WebService.prototype.removeGroup = function (groupId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/extensions/' + groupId, options);
    };
    WebService.prototype.addGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/extensions', data, options);
    };
    WebService.prototype.updateGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/extensions/' + data['id'], data, options);
    };
    WebService.prototype.deleteGroup = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/extensions/' + id, options);
    };
    WebService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], WebService);
    return WebService;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/office/office.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/views/admin/groups/office/office.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row animated fadeIn mt-4\">\n  <div class=\"col-3\">\n    <div class=\"card card-accent-primary\">\n      <div class=\"card-header\">  لیست اداره ها </div>\n      <div class=\"card-body\">\n          <ngx-datatable class=\"material border-bottom\"\n          [rows]=\"groups\"\n          [headerHeight]=\"40\"\n          \n          [rowHeight]=\"'auto'\"\n          [selectionType]=\"'single'\"\n          [columnMode]=\"'force'\"  \n          style=\"width: 100%\"\n          (activate)=\"onActivate($event)\"\n          >\n         \n\n       <ngx-datatable-column\n       \n        [sortable]=\"true\"\n        [canAutoResize]=\"false\"\n        [draggable]=\"false\"\n        [resizeable]=\"false\"\n        [width]=\"200\"\n        name=\"name\"\n        >\n        <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n            <span >نام اداره</span>\n          </ng-template>\n          <ng-template let-value=\"value\"   let-row=\"row\" \n            let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n              <span\n              title=\"برای ویرایش دوبار کلیک کنید!\"\n              (dblclick)=\"editing[rowIndex + '-name'] = true\"\n              (click)=\"setActiveRow(rowIndex)\"\n              *ngIf=\"!editing[rowIndex + '-name']\">\n              {{value}}\n            </span>\n            <input class=\"form-text col-12\"\n              autofocus\n              (blur)=\"updateValue($event, 'name', rowIndex)\"\n              (keypress)=\"onKeyPress($event)\"\n            \n              *ngIf=\"editing[rowIndex+ '-name']\"\n              type=\"text\"\n              [value]=\"value\"\n            />\n          </ng-template>\n     </ngx-datatable-column>\n     <ngx-datatable-column\n       \n     [sortable]=\"true\"\n     [canAutoResize]=\"false\"\n     [draggable]=\"false\"\n     [resizeable]=\"false\"\n     name=\"edit\"\n     [width]=\"50\"\n     >\n     <ng-template let-column=\"column\" let-sort=\"sortFn\" ngx-datatable-header-template>\n         <span >حذف</span>\n       </ng-template>\n       <ng-template let-value=\"value\"   let-row=\"row\" \n         let-rowIndex=\"rowIndex\"  ngx-datatable-cell-template>\n        <span class=\"btn btn-sm btn-danger\" data-toggle=\"modal\" (click)=\"showRemoveModal(rowIndex)\">\n          <i class=\"fa fa-trash\"></i>\n        </span>\n\n       </ng-template>\n  </ngx-datatable-column>\n\n    </ngx-datatable>\n\n  <div class=\"col-12 text-left\">\n    <div class=\"row text-center justify-content-center\">\n      <input class=\"form-control col-12\" [hidden]=\"!addingNewGroup\" [formControl]=\"newGroupName\" >\n\n      <button class=\"btn  \" title=\"اضافه کردن اداره جدید\"\n      [ngClass] = \"{'btn-warning btn-pill':!addingNewGroup, 'btn-success col-5':addingNewGroup }\"\n       (click)=\"addNewGroupClick()\">{{ addingNewGroup? 'ثبت' : '+' }}</button>\n\n       <button class=\"col-5 btn btn-warning\" [hidden]=\"!addingNewGroup\" (click)=\"addingNewGroup=false\" >لغو</button>\n    </div>\n  </div>\n      </div>\n    </div>  \n  </div>\n\n  \n<div class=\"col-4\">\n  <div class=\"card card-accent-danger\">\n    <div class=\"card-header p-1  \">\n        <div class=\"col-12\">\n          <div class=\"row align-items-center\">\n            <span class=\"col-5 pl-2\">داخلی های این اداره </span>\n            <!-- <input class=\"form-control col-3\" placeholder=\"فیلتر\"/>  -->\n          </div>\n      </div>\n    </div>\n    <div class=\"card-body direction-ltr text-center\">\n        <div *ngFor=\"let item of selectedGroupExtensions\" class=\"btn col-6 btn-success m-1\"\n        (click)=\"removeFromSelectedParent($event, item)\"  title=\"{{item.number}}\">\n        \n        {{ item.name? item.name : item.number }}\n          </div>\n            {{selectedGroupExtensions? '' : 'ادارهی انتخاب نشده است.' }}\n    </div>\n    <div class=\"card-footer text-left\" [hidden]=\"!itemsChanged\"> <button class=\"btn btn-primary\" (click)=\"updateParentItems()\">ثبت نهایی</button>  </div>\n  </div>\n</div>\n<div class=\"col-5\">\n  <div class=\"card card-accent-success\">\n      <div class=\"card-header p-1  \">\n          <div class=\"col-12\">\n            <div class=\"row align-items-center\">\n              <span class=\"col-5 pl-2\">همه داخلی ها </span>\n              <!-- <input class=\"form-control col-3 text-left\" type=\"number\"\n               placeholder=\"فیلتر\" (keyup)=\"filterAllExtensions($event)\" />  -->\n            </div>\n        </div>\n      </div>\n    <div class=\"card-body row justify-content-center align-items-stretch align-items-center direction-ltr text-center\">\n          <div *ngFor=\"let item of remainingExtensions\" class=\"col-5 btn btn-info m-1\" \n          (click)=\"addItemToSelectedParent($event, item)\" title=\"{{item.number}}\">\n              {{ item.name? item.name+'('+item.number+')' : item.number }}\n            </div>\n    </div>\n  </div>\n</div>\n</div>\n\n\n<div bsModal #removeGroupModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm modal-danger\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n       \n        <button type=\"button\" class=\"close\" (click)=\"smallModal.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">حذف اداره</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>آیا از حذف  اداره \"{{selectedItemNameToDelete}}\" مطمئنید؟</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"smallModal.hide()\">انصراف</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirmDelete()\">بله حذف شود</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->"

/***/ }),

/***/ "./src/app/views/admin/groups/office/office.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/views/admin/groups/office/office.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2FkbWluL2dyb3Vwcy9vZmZpY2Uvb2ZmaWNlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/admin/groups/office/office.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/admin/groups/office/office.component.ts ***!
  \***************************************************************/
/*! exports provided: OfficeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfficeComponent", function() { return OfficeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web.service */ "./src/app/views/admin/groups/office/web.service.ts");







var OfficeComponent = /** @class */ (function () {
    function OfficeComponent(webServ, authServ, toastr) {
        this.webServ = webServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.groups = new Array();
        this.selectedGroupExtensions = [];
        this.parentSelected = false;
        this.itemsChanged = false;
        this.addingNewGroup = false;
        this.newGroupName = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]);
        this.editing = {};
        this.selectedItemNameToDelete = "";
    }
    OfficeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webServ.getAllGroups().subscribe(function (data) {
            data = data["data"];
            var groupesData = new Array();
            for (var i in data["groups"]) {
                groupesData.push(data["groups"][i]);
            }
            _this.groups = groupesData;
            _this.allExtensions = data["sub"];
            _this.remainingExtensions = _this.allExtensions;
            _this.setRemainingExtensions();
            // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
        }, function (error) {
            console.log(error);
            _this.authServ.handdleAuthErrors(error);
        });
    };
    OfficeComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        console.log("inline editing rowIndex", rowIndex);
        this.editing[rowIndex + "-" + cell] = false;
        this.groups[rowIndex][cell] = event.target.value;
        this.refreshParents();
        console.log("UPDATED!", this.groups[rowIndex][cell]);
        var newName = this.groups[rowIndex][cell];
        var id = this.groups[rowIndex]["id"];
        this.webServ
            .updateGroup({
            name: newName,
            id: id,
            value: this.selectedGroupExtensions.join(",")
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.toastr.success("نام گروه با موفقیت تغییر یافت");
        }, function (error) {
            console.log(error);
        });
    };
    OfficeComponent.prototype.refreshParents = function () {
        this.groups = this.groups.slice();
    };
    OfficeComponent.prototype.onKeyPress = function (event) {
        if (event.which == 13) {
            event.target.blur();
        }
    };
    OfficeComponent.prototype.onActivate = function (event) {
        if (event.type == "click") {
            this.refreshParents();
            this.parentSelected = true;
            this.selectedGroupExtensions = JSON.parse(JSON.stringify(event.row["sub"]));
            // this.convertSelectedGroupExtentionsToInt();
            this.setRemainingExtensions();
            this.activeParentId = event.row.id;
            this.itemsChanged = false;
        }
    };
    OfficeComponent.prototype.setActiveRow = function (rowIndex) {
        this.activeRow = rowIndex;
    };
    OfficeComponent.prototype.setRemainingExtensions = function () {
        var $this = this;
        this.selectedGroupExtensions;
        this.remainingExtensions = this.allExtensions.filter(function (el) {
            return !$this.selectedGroupExtensions.includes(el);
        });
        this.remainingExtensions.sort();
    };
    OfficeComponent.prototype.convertSelectedGroupExtentionsToInt = function () {
        var $this = this;
        this.selectedGroupExtensions.forEach(function (e, i) {
            $this.selectedGroupExtensions[i] = parseInt($this.selectedGroupExtensions[i]);
        });
    };
    OfficeComponent.prototype.addItemToSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (!this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.push(subItem);
                this.setRemainingExtensions();
            }
    };
    OfficeComponent.prototype.removeFromSelectedParent = function (event, subItem) {
        if (this.parentSelected)
            if (this.selectedGroupExtensions.includes(subItem)) {
                this.itemsChanged = true;
                this.selectedGroupExtensions.splice(this.selectedGroupExtensions.indexOf(subItem), 1);
                this.setRemainingExtensions();
            }
    };
    OfficeComponent.prototype.updateParentItems = function () {
        var _this = this;
        var ids = [];
        for (var index in this.selectedGroupExtensions) {
            ids.push(this.selectedGroupExtensions[index]["id"]);
        }
        var activeId = this.activeRow;
        this.webServ
            .updateGroup({
            id: this.activeParentId,
            sub: ids.join(',')
        })
            .subscribe(function (data) {
            console.log(data);
            _this.itemsChanged = false;
            _this.groups[activeId]["sub"] = _this.selectedGroupExtensions;
            _this.refreshParents();
            _this.toastr.success(" داخلی های اداره" +
                _this.groups[activeId]["name"] +
                "  با موفقیت ثبت شد.  ");
        }, function (error) {
            console.log(error);
        });
    };
    OfficeComponent.prototype.addNewGroupClick = function () {
        var _this = this;
        if (this.addingNewGroup) {
            var newItemData_1 = {
                name: this.newGroupName.value
            };
            this.webServ.addGroup(newItemData_1).subscribe(function (data) {
                data = data['data'];
                _this.toastr.success("گروه با موفقیت اضافه شد.");
                _this.groups.push({ id: data['id'], name: newItemData_1.name, sub: [] });
                _this.refreshParents();
            }, function (error) {
                console.log(error);
            });
            this.refreshParents();
            this.addingNewGroup = false;
        }
        else
            this.addingNewGroup = true;
    };
    OfficeComponent.prototype.filterAllExtensions = function (event) {
        var searhKey = event.target.value;
        this.setRemainingExtensions(); // to refresh
        console.log(searhKey);
        var searchResult = this.remainingExtensions.filter(function (el) {
            String(el).indexOf(searhKey) == 0;
        });
    };
    OfficeComponent.prototype.showRemoveModal = function (rowIndex) {
        this.smallModal.show();
        this.activeRow = rowIndex;
        this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
    };
    OfficeComponent.prototype.confirmDelete = function () {
        var _this = this;
        var activeId = this.activeRow;
        this.webServ.deleteGroup(this.groups[activeId]["id"]).subscribe(function (data) {
            _this.removeGroup(activeId);
            _this.toastr.success(_this.groups[activeId]["name"] + '"  با موفقیت حذف شد.');
            _this.smallModal.hide();
            _this.refreshParents();
        }, function (error) {
            _this.toastr.error("اشکال در روند حذف اداره");
            _this.smallModal.hide();
        });
        console.log(this.groups[this.activeRow]["title"]);
    };
    OfficeComponent.prototype.removeGroup = function (rowId) {
        this.groups.splice(rowId, 1);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("removeGroupModal"),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["ModalDirective"])
    ], OfficeComponent.prototype, "smallModal", void 0);
    OfficeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-office",
            template: __webpack_require__(/*! ./office.component.html */ "./src/app/views/admin/groups/office/office.component.html"),
            styles: [__webpack_require__(/*! ./office.component.scss */ "./src/app/views/admin/groups/office/office.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_web_service__WEBPACK_IMPORTED_MODULE_6__["WebService"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], OfficeComponent);
    return OfficeComponent;
}());



/***/ }),

/***/ "./src/app/views/admin/groups/office/web.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/admin/groups/office/web.service.ts ***!
  \**********************************************************/
/*! exports provided: WebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebService", function() { return WebService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_services/authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var WebService = /** @class */ (function () {
    function WebService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    WebService.prototype.getAllGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/submain', options);
    };
    WebService.prototype.removeGroup = function (groupId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/submain/' + groupId, options);
    };
    WebService.prototype.addGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/submain', data, options);
    };
    WebService.prototype.updateGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/submain/' + data['id'], data, options);
    };
    WebService.prototype.deleteGroup = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + '/admin/groups/submain/' + id, options);
    };
    WebService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], WebService);
    return WebService;
}());



/***/ })

}]);
//# sourceMappingURL=groups-groups-module.js.map