"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_service_1 = require("./_service/settings.service");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var ngx_toastr_1 = require("ngx-toastr");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var file_upload_component_1 = require("./file-upload/file-upload.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var authentication_service_1 = require("../../../_services/authentication.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(settingService, toastr, router, cd, fu, authService) {
        this.settingService = settingService;
        this.toastr = toastr;
        this.router = router;
        this.cd = cd;
        this.fu = fu;
        this.authService = authService;
        //Tab 1 data
        this.settings = new forms_1.FormGroup({
            ami: new forms_1.FormGroup({
                title: new forms_1.FormControl(""),
                ip: new forms_1.FormControl(""),
                username: new forms_1.FormControl(""),
                password: new forms_1.FormControl(""),
                port: new forms_1.FormControl("")
            }),
            invitation: new forms_1.FormGroup({
                title: new forms_1.FormControl(""),
                ip: new forms_1.FormControl(""),
                username: new forms_1.FormControl(""),
                password: new forms_1.FormControl(""),
                port: new forms_1.FormControl("")
            }),
            server: new forms_1.FormGroup({
                title: new forms_1.FormControl(""),
                ip: new forms_1.FormControl(""),
                username: new forms_1.FormControl(""),
                password: new forms_1.FormControl(""),
                port: new forms_1.FormControl("")
            }),
            operatori: new forms_1.FormGroup({
                title: new forms_1.FormControl(""),
                ip: new forms_1.FormControl(""),
                username: new forms_1.FormControl(""),
                password: new forms_1.FormControl(""),
                port: new forms_1.FormControl("")
            }),
        });
        this.otherData = new forms_1.FormGroup({
            countco: new forms_1.FormControl(""),
            counte1: new forms_1.FormControl(""),
            queue_number: new forms_1.FormControl(""),
            prepend_outbound_from: new forms_1.FormControl(""),
            prepend_outbound_to: new forms_1.FormControl(""),
            did_inbound_from: new forms_1.FormControl(""),
            did_inbound_to: new forms_1.FormControl(""),
            prefix_outbound_transfer: new forms_1.FormControl("")
        });
        this.systemData = new forms_1.FormGroup({
            file: new forms_1.FormControl("", [forms_1.Validators.required])
        });
        //Tab 2 Data
        this.license = new forms_1.FormGroup({
            name: new forms_1.FormControl("", [forms_1.Validators.required]),
            serial: new forms_1.FormControl(""),
            startDate: new forms_1.FormControl(""),
            file: new forms_1.FormControl("", [forms_1.Validators.required])
        });
        this.licenseSubmitted = false;
        this.accessList = [];
        this.pingStatus = 0; // 0=not set, 1=ok , -1 = nok
        //Tab 3 Data
        this.bills = new forms_1.FormGroup({
            pulse: new forms_1.FormControl(""),
            mobile: new forms_1.FormControl(""),
            co: new forms_1.FormControl(""),
            betweenco: new forms_1.FormControl(""),
            abonmah: new forms_1.FormControl("")
        });
        this.type = new forms_1.FormControl('file');
        this.fileToUpload = null;
        this.fileType = new forms_1.FormControl(0);
        this.datafileToUpload = null;
        this.progress = 0;
        this.systemDataSubmitted = false;
    }
    Object.defineProperty(SettingsComponent.prototype, "systemDataInfo", {
        get: function () {
            return this.systemData.controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsComponent.prototype, "licenseForm", {
        get: function () {
            return this.license.controls;
        },
        enumerable: true,
        configurable: true
    });
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingService.getSettingsdata().subscribe(function (data) {
            data = data["data"];
            _this.type.setValue(data['type']);
            _this.settings.patchValue({
                ami: data["ami"],
                operatori: data["operatori"],
                server: data["server"],
                invitation: data["invitation"]
            });
        });
        this.settingService.getLincenseData().subscribe(function (data) {
            _this.accessList = data["license"];
            _this.license.patchValue(data);
        });
        this.settingService.getBillsData().subscribe(function (data) {
            _this.bills.patchValue(tslib_1.__assign({}, data["data"]));
        });
        this.settingService.getOtherData().subscribe(function (data) {
            _this.otherData.patchValue(tslib_1.__assign({}, data["data"]));
        });
    };
    SettingsComponent.prototype.onSubmitServers = function (event) {
        var _this = this;
        var serversData = {};
        serversData = this.settings.getRawValue();
        var dataToSave = { ami: {}, operator: {}, server: {} };
        dataToSave.ami = serversData["ami"];
        dataToSave.server = serversData["server"];
        dataToSave.operator = serversData["operator"];
        console.log(serversData);
        this.settingService
            .setSettingsData(serversData)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            console.log("return data", data);
            _this.toastr.success("اطلاعات ذخیره شد.", "نتیجه ذخیره!");
        }, function (error) {
            _this.authService.handdleAuthErrors(error);
        });
        event.preventDefault();
    };
    SettingsComponent.prototype.setSettingsRouteData = function (event) {
        var _this = this;
        this.settingService
            .setSettingsRouteData(this.settings.getRawValue())
            .subscribe(function (data) {
            console.log("return data", data);
            _this.toastr.success("اطلاعات ذخیره شد.", "نتیجه ذخیره!");
        }, function (error) {
            _this.authService.handdleAuthErrors(error);
        });
        event.preventDefault();
    };
    SettingsComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.license.patchValue({
                    file: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    SettingsComponent.prototype.onDataFileChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.systemData.patchValue({
                    file: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    SettingsComponent.prototype.handleFileInput = function (files) {
        this.fileToUpload = files.item(0);
    };
    SettingsComponent.prototype.handleDataFileInput = function (files) {
        this.datafileToUpload = files.item(0);
    };
    SettingsComponent.prototype.submitOtherData = function () {
        var _this = this;
        this.settingService.setOtherData(this.otherData.getRawValue()).subscribe(function (event) {
            _this.toastr.success('اطلاعات با موفقیت ذخیره شد.');
        }, function (error) {
            _this.authService.handdleAuthErrors(error);
        });
    };
    SettingsComponent.prototype.submitLicense = function () {
        var _this = this;
        this.licenseSubmitted = true;
        if (!this.license.invalid) {
            var formData = new FormData();
            formData.append("name", this.license.value.name);
            formData.append("file", this.fileToUpload);
            this.settingService.setLincenseData(formData).subscribe(function (event) {
                console.log(event);
                // if ( event.type === HttpEventType.UploadProgress ) {
                //   //this.progress = Math.round((100 * event.loaded) / event.total);
                //   console.log(event);
                //   console.log(Math.round((100 * event.loaded) / event.total));
                // }
                // if ( event.type === HttpEventType.Response ) {
                //   console.log(event.body);
                // }
            }, function (error) {
                _this.authService.handdleAuthErrors(error);
            });
        }
    };
    SettingsComponent.prototype.submitSystemData = function () {
        var _this = this;
        this.systemDataSubmitted = true;
        if (!this.systemData.invalid) {
            this.fileIsUploading = true;
            var formData = new FormData();
            formData.append("file", this.datafileToUpload);
            this.settingService.uploadfile(formData, this.fileType.value).subscribe(function (event) {
                switch (event.type) {
                    case http_1.HttpEventType.Sent:
                        break;
                    case http_1.HttpEventType.ResponseHeader:
                        break;
                    case http_1.HttpEventType.UploadProgress:
                        _this.progress = Math.round((event.loaded / event.total) * 100) > 90 ?
                            90
                            : Math.round((event.loaded / event.total) * 100);
                        break;
                    case http_1.HttpEventType.Response:
                        _this.fileIsUploading = false;
                        _this.progress = 100;
                        _this.toastr.success("پیغام سیستم", event["data"]);
                        setTimeout(function () {
                            _this.progress = 0;
                        }, 1500);
                }
            }, function (error) {
                _this.fileIsUploading = false;
                _this.authService.handdleAuthErrors(error);
            });
        }
    };
    SettingsComponent.prototype.submitBills = function () {
        var _this = this;
        var bills = this.bills.getRawValue();
        this.settingService.setBillsData(bills).subscribe(function (data) {
            _this.toastr.success('اطلاعات قبوض با موفقیت به روز رسانی شد.');
            if (data['data']['abonmah']) {
                _this.bills.patchValue(tslib_1.__assign({}, data['data']));
            }
        }, function (error) {
            _this.authService.handdleAuthErrors(error);
            _this.toastr.error('مشکلی در روند به روز رسانی اطلاعات پیش آمده است. لطفا دوباره تلاش کنید.');
        });
    };
    SettingsComponent.prototype.removeLastFileData = function () {
        var _this = this;
        this.fileIsRemoving = true;
        this.settingService.removeLastFileData().subscribe(function (data) {
            _this.fileIsRemoving = false;
            _this.removeAllDataModal.hide();
            _this.toastr.success("پیغام سیستم", "اطلاعات از پایگاه داده حذف شد.");
        }, function (error) {
            _this.fileIsRemoving = false;
            _this.authService.handdleAuthErrors(error);
        });
    };
    SettingsComponent.prototype.removeLastQFileData = function () {
        var _this = this;
        this.fileIsRemoving = true;
        this.settingService.removeLastQFileData().subscribe(function (data) {
            _this.removeAllQDataModal.hide();
            _this.fileIsRemoving = false;
            _this.toastr.success("پیغام سیستم", "اطلاعات از پایگاه داده حذف شد.");
        }, function (error) {
            _this.fileIsRemoving = false;
            _this.authService.handdleAuthErrors(error);
        });
    };
    SettingsComponent.prototype.saveDataType = function () {
        var _this = this;
        this.settingService.updateType({ type: this.type.value }).
            subscribe(function (data) {
            _this.toastr.success(data.data);
        }, function (error) {
            _this.authService.handdleAuthErrors(error);
        });
    };
    SettingsComponent.prototype.pingAmi = function () {
        var _this = this;
        this.settingService
            .pingAmi({
            username: this.settings.value.ami.username,
            password: this.settings.value.ami.password,
            ip: this.settings.value.ami.ip
        })
            .subscribe(function (data) {
            console.log("return data", data);
            _this.pingStatus = 1;
            _this.toastr.success("سرور ami فعال است", "نتیجه پینگ!");
        }, function (error) {
            _this.pingStatus = -1;
            _this.authService.handdleAuthErrors(error);
            _this.toastr.error(error.error.error, "دسترسی به سرور ami ممکن نیست");
        });
        event.preventDefault();
    };
    tslib_1.__decorate([
        core_1.ViewChild("removeAllDataModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], SettingsComponent.prototype, "removeAllDataModal", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("removeAllQDataModal"),
        tslib_1.__metadata("design:type", ngx_bootstrap_1.ModalDirective)
    ], SettingsComponent.prototype, "removeAllQDataModal", void 0);
    SettingsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-settings",
            templateUrl: "./settings.component.html",
            encapsulation: core_1.ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [settings_service_1.SettingsService,
            ngx_toastr_1.ToastrService,
            router_1.Router,
            core_1.ChangeDetectorRef,
            file_upload_component_1.FileUploadComponent,
            authentication_service_1.AuthenticationService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map