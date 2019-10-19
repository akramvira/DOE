import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "../../user-management/_services/users.service";
import { ReportsService } from "../_service/reports.service";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { FormControl, FormGroup } from "@angular/forms";
import * as moment from "jalali-moment";
import { formGroupNameProvider } from "@angular/forms/src/directives/reactive_directives/form_group_name";
import { DaterangeComponent } from "../_components/daterange/daterange.component";

@Component({
  selector: "app-calls-details",
  templateUrl: "./calls-details.component.html",
  styleUrls: ["./calls-details.component.scss"]
})
export class CallsDetailsComponent implements OnInit {
  page = new Page();
  //rows = new Array<CorporateEmployee>();

  data: any[];
  storedData: any = [];

  constructor(
    private reportServ: ReportsService,
    private authServ: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.reportServ.getCallsDetails().subscribe(
      data => {
        console.log(data);
        this.showData(data);
      },
      error => {
        this.authServ.handdleAuthErrors(error);
      }
    );
  }

  showData(data, page = 0) {
    
    this.data = data["data"];
    this.storedData = data["data"];

    this.page.pageNumber = page;
    this.page.size = data["per_page"];
    this.page.totalElements = data["total"];
    this.page.totalPages = data["last_page"];
  }

  filterData() {
    this.loadingData = true;

    let data = this.filtersData.getRawValue();
    data.from = this.daterange.selectedDateFrom.value;
    data.to = this.daterange.selectedDateTo.value;

    this.reportServ.filterCallsDetails(data).subscribe(
      data => {
        this.showData(data);
        this.loadingData = false;
      },
      error => {
        this.authServ.handdleAuthErrors(error);
        this.loadingData = false;
      }
    );
  }

  //pagination
  loadingData = false;
  setPage(pageInfo) {
     pageInfo.offset

    let data = this.filtersData.getRawValue();
    data.from = this.daterange.selectedDateFrom.value;
    data.to = this.daterange.selectedDateTo.value;
    data.page = pageInfo.offset+1;
    this.loadingData = true;
    this.reportServ.filterCallsDetails(data).subscribe(
      pagedData => {
        this.loadingData = false;
        this.showData(pagedData,pageInfo.offset);
      },
      error => {
        this.authServ.handdleAuthErrors(error);
        this.loadingData = false;
      }
    );
  }

  @ViewChild(DatatableComponent) myTable: DatatableComponent;
  tempData: any = [];

  filtersData = new FormGroup({
    disposition: new FormControl("all"),
    src: new FormControl(""),
    dst: new FormControl(""),
    dest: new FormControl(""),
    sort: new FormControl([])
  });

  @ViewChild("daterange") daterange: DaterangeComponent;

  get getData() {
    return this.storedData;
  }

  set setData(filteredData) {
    this.data = filteredData;
  }
}

class Page {
  //The number of elements in the page
  size: number = 0;
  //The total number of elements
  totalElements: number = 0;
  //The total number of pages
  totalPages: number = 0;
  //The current page number
  pageNumber: number = 0;
}
