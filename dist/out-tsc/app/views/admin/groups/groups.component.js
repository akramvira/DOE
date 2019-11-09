"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var groups_service_1 = require("./_services/groups.service");
var ngx_toastr_1 = require("ngx-toastr");
var authentication_service_1 = require("../../../_services/authentication.service");
var forms_1 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
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
        this.newGroupName = new forms_1.FormControl('', [forms_1.Validators.required]);
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
    tslib_1.__decorate([
        core_1.ViewChild('removeGroupModal'),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], GroupsComponent.prototype, "smallModal", void 0);
    GroupsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-groups',
            templateUrl: './groups.component.html',
            styleUrls: ['./groups.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [groups_service_1.GroupsService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map