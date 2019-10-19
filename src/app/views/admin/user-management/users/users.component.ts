import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "../_services/users.service";
import { ModalDirective } from "ngx-bootstrap";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  page = new Page();
  //rows = new Array<CorporateEmployee>();

  users: any[];

  constructor(
    private usersServ: UsersService,
    private authServ: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usersServ.getAllUsers()
    .subscribe(data => {
      
      data = data['data'];
      this.users = data["users"];
      
      this.mainData = this.users;
    });
    this.page.pageNumber = 0;
    this.page.size = 20;

    this.setPage({ offset: 0 });

    this.page.pageNumber = 1;
    this.page.size = 10;
    this.page.totalElements = 100;
    this.page.totalPages = 10;
  }

  tempData: any;

  filters: any = [];

  mainData: any;
  FilterData(event) {
    debugger;
    this.tempData = JSON.parse(JSON.stringify(this.mainData));
    let columnName = event.currentTarget.id;

    const val = event.target.value.toLowerCase();

    this.filters[columnName] = val;

    //this.filterData();

    const filteredData = this.tempData.filter(function(d) {
      return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.users = filteredData;
    // this.myTable.offset = 0;
  }

  editing = {};
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + "-" + cell] = false;
    this.users[rowIndex][cell] = event.target.value;
    this.users = [...this.users];
  }

  //pagination

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    this.page.size = 10;
    this.page.totalElements = 100;
    this.page.totalPages = 10;

    //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
    //this.page = {size:2,};//pagedData.page;
    //this.users = 4;//pagedData.data;
    // });
  }

  @ViewChild("usersTable") table: any;

  toggleExpandRow(row) {
    console.log("Toggled Expand Row!", row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  activeRow: any;
  @ViewChild("removeItemModal") public removeItemModal: ModalDirective;
  selectedItemNameToDelete = "";
  showRemoveModal(rowIndex) {
    this.removeItemModal.show();
    this.activeRow = rowIndex;
    this.selectedItemNameToDelete = this.users[this.activeRow]["name"];
  }
  confirmDelete() {
    debugger;
    this.usersServ.deleteUser(this.users[this.activeRow]["id"]).subscribe(
      data => {
        this.toastr.success("کاربر مورد نظر با موفقیت حذف شد.");
      },
      error => {
        console.log(error);
        this.toastr.error("خطا در زمان حذف کاربر.");
        this.authServ.handdleAuthErrors(error);
      }
    );
    console.log(this.users[this.activeRow]["title"]);
  }

  selectedRoles: any = [];
  notSelectedRoles: any = [];
  onSubmit() {}
  selectedRule: any = "";
  selecteRole(event) {}

  @ViewChild("editModal") public editModal: ModalDirective;
  selectedItemNameToEdit: any;
  showEditModal(rowIndex) {
    this.editModal.show();
    this.activeRow = rowIndex;
    this.selectedItemNameToEdit = this.users[this.activeRow]["name"];
debugger;
    this.userData.patchValue(this.users[this.activeRow]);
  }
  userData = new FormGroup({
    active: new FormControl(""),
    name: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    confirmpassword: new FormControl(""),
    level: new FormControl("operator"),
    role: new FormControl(""),

    //Operator related fields
    phonenumber: new FormControl(""),
    numQueue1: new FormControl(""),
    numPark: new FormControl(""),
    numHold: new FormControl(""),
    numRedial: new FormControl(""),
    conferance: new FormControl("")
  });

  confirmEdit() {}
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
