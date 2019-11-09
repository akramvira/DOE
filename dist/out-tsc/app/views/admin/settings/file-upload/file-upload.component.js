"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent() {
        this.file = null;
    }
    FileUploadComponent_1 = FileUploadComponent;
    FileUploadComponent.prototype.ngOnInit = function () { };
    FileUploadComponent.prototype.emitFiles = function (event) {
        var file = event && event.item(0);
        this.file = file;
    };
    FileUploadComponent.prototype.writeValue = function (value) {
        // clear file input
        //this.host.nativeElement.value = '';
        this.file = null;
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    FileUploadComponent.prototype.registerOnTouched = function (fn) {
    };
    FileUploadComponent.prototype.getSelectedFile = function () {
        return this.file;
    };
    var FileUploadComponent_1;
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], FileUploadComponent.prototype, "progress", void 0);
    tslib_1.__decorate([
        core_1.HostListener('change', ['$event.target.files']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [FileList]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "emitFiles", null);
    FileUploadComponent = FileUploadComponent_1 = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-file-upload',
            templateUrl: './file-upload.component.html',
            styleUrls: ['./file-upload.component.scss'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: FileUploadComponent_1,
                    multi: true
                }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map