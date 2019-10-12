import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from "@angular/core";
import { SettingsService } from "./_service/settings.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  RequiredValidator,
  Validators
} from "@angular/forms";
import { first } from "rxjs/operators";
import { from } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpEventType, HttpEvent } from "@angular/common/http";
import { FileUploadComponent } from "./file-upload/file-upload.component";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  fb: FormBuilder;
  //Tab 1 data
  settings = new FormGroup({
    ami: new FormGroup({
      title: new FormControl(""),
      ip: new FormControl(""),
      username: new FormControl("akram"),
      password: new FormControl(""),
      port: new FormControl("")
    }),
    invatation: new FormGroup({
      title: new FormControl(""),
      ip: new FormControl(""),
      username: new FormControl(""),
      password: new FormControl(""),
      port: new FormControl("")
    }),

    server: new FormGroup({
      title: new FormControl(""),
      ip: new FormControl(""),
      username: new FormControl(""),
      password: new FormControl(""),
      port: new FormControl("")
    }),
    operatori: new FormGroup({
      title: new FormControl(""),
      ip: new FormControl(""),
      username: new FormControl(""),
      password: new FormControl(""),
      port: new FormControl("")
    }),
    countco: new FormControl(""),
    counte1: new FormControl(""),
    queue_number: new FormControl(""),
    prepend_outbound_from: new FormControl(""),
    prepend_outbound_to: new FormControl(""),
    did_inbound_from: new FormControl(""),
    did_inbound_to: new FormControl(""),
    prefix_outbound_transfer: new FormControl("")
  });

  systemData = new FormGroup({
    file: new FormControl("", [Validators.required])
  });
  get systemDataInfo() {
    return this.systemData.controls;
  }

  //Tab 2 Data
  license = new FormGroup({
    name: new FormControl("", [Validators.required]),
    serial: new FormControl(""),
    startDate: new FormControl(""),
    file: new FormControl("", [Validators.required])
  });
  get licenseForm() {
    return this.license.controls;
  }

  licenseSubmitted = false;

  accessList = [];

  pingStatus = 0; // 0=not set, 1=ok , -1 = nok

  //Tab 3 Data
  bills = new FormGroup({
    bill1: new FormControl(""),
    bill2: new FormControl(""),
    bill3: new FormControl(""),
    bill4: new FormControl(""),
    bill5: new FormControl("")
  });

  licenseAcceses: any;
  constructor(
    private settingService: SettingsService,
    private toastr: ToastrService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fu: FileUploadComponent
  ) {}

  type = new FormControl('file');

  ngOnInit() {
    this.settingService.getSettingsdata().subscribe(data => {
      data = data["data"];
      debugger;
      this.type.setValue(data['type']);
      this.settings.patchValue({
        ami: data["ami"],
        operatori: data["operatori"],
        server: data["server"],
        invatation: data["invatation"],

        countco: data["countco"],
        counte1: data["counte1"],
        queue_number: data["queue_number"],
        prepend_outbound_from: data["prepend_outbound_from"],
        prepend_outbound_to: data["prepend_outbound_to"],
        did_inbound_from: data["did_inbound_from"],
        did_inbound_to: data["did_inbound_to"],
        prefix_outbound_transfer: data["prefix_outbound_transfer"]
      });

      this.pingAmi();
    });
    this.settingService.getLincenseData().subscribe(data => {
      this.accessList = data["license"];
      this.license.patchValue(data);
    });
  }

  onSubmitServers(event: Event) {
    let serversData = {};
    serversData = this.settings.getRawValue();

    let dataToSave = { ami: {}, operator: {}, server: {} };
    dataToSave.ami = serversData["ami"];
    dataToSave.server = serversData["server"];
    dataToSave.operator = serversData["operator"];

    console.log(serversData);
    this.settingService
      .setSettingsData(serversData)
      .pipe(first())
      .subscribe(
        data => {
          console.log("return data", data);
          this.toastr.success("اطلاعات ذخیره شد.", "نتیجه ذخیره!");
        },
        error => {
          console.log(error);
          this.toastr.error(error.error.error, "پیغام سیستم");
        }
      );
    event.preventDefault();
  }
  setSettingsRouteData(event: Event) {
    this.settingService
      .setSettingsRouteData(this.settings.getRawValue())

      .subscribe(
        data => {
          console.log("return data", data);
          this.toastr.success("اطلاعات ذخیره شد.", "نتیجه ذخیره!");
        },
        error => {
          this.toastr.error(error.error.error, "پیغام سیستم");
        }
      );
    event.preventDefault();
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.license.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onDataFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.systemData.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  datafileToUpload: File = null;
  handleDataFileInput(files: FileList) {
    this.datafileToUpload = files.item(0);
  }

  submitLicense() {
    this.licenseSubmitted = true;
    if (!this.license.invalid) {
      const formData = new FormData();

      formData.append("name", this.license.value.name);
      formData.append("file", this.fileToUpload);

      this.settingService.setLincenseData(formData).subscribe(
        event => {
          console.log(event);

          // if ( event.type === HttpEventType.UploadProgress ) {
          //   //this.progress = Math.round((100 * event.loaded) / event.total);

          //   console.log(event);
          //   console.log(Math.round((100 * event.loaded) / event.total));
          // }

          // if ( event.type === HttpEventType.Response ) {
          //   console.log(event.body);
          // }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  progress = 0;
  fileIsUploading: boolean;
  fileIsRemoving: boolean;
  systemDataSubmitted = false;
  submitSystemData() {
    this.systemDataSubmitted = true;
    if (!this.systemData.invalid) {
      this.fileIsUploading = true;
      const formData = new FormData();
      formData.append("file", this.datafileToUpload);

      this.settingService.uploadfile(formData).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              this.fileIsUploading = false;
              this.toastr.success("پیغام سیستم", event["data"]);
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        },
        error => {
          this.fileIsUploading = false;
          this.toastr.error(error.error.errors.file[0]);
        }
      );
    }
  }

  removeLastFileData() {
    this.fileIsRemoving = true;
    this.settingService.removeLastFileData().subscribe(
      data => {
        this.fileIsRemoving = false;
        this.toastr.success("پیغام سیستم", "اطلاعات از پایگاه داده حذف شد.");
      },
      error => {
        this.fileIsRemoving = false;
        this.toastr.error("خطا در پاک کردن اطلاعات.");
      }
    );
  }

  saveDataType(){
    
    this.settingService.updateType({type:this.type.value}).
    subscribe(
      data=>{
        this.toastr.success(data.data);
      },
      error=>{
        
      }
    )
  }

  pingAmi() {
    this.settingService
      .pingAmi({
        username: this.settings.value.ami.username,
        password: this.settings.value.ami.password,
        ip: this.settings.value.ami.ip
      })
      .subscribe(
        data => {
          console.log("return data", data);
          this.pingStatus = 1;
          this.toastr.success("سرور ami فعال است", "نتیجه پینگ!");
        },
        error => {
          this.pingStatus = -1;
          this.toastr.error(error.error.error, "دسترسی به سرور ami ممکن نیست");
        }
      );
    event.preventDefault();
  }
}
