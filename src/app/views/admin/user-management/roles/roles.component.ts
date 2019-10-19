import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "../_services/users.service";
import { Toast, ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { FormControl, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Globals } from '../../../../_services/globals';

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"]
})
export class RolesComponent implements OnInit {
  @ViewChild("removeRuleModal") public smallModal: ModalDirective;
  constructor(
    private RoleServ: UsersService,
    private authServ: AuthenticationService,
    private toastr: ToastrService
  ) {}

  roles = new Array();
  allAccesses: [];
  selectedRoleAccesses: any = [];
  remainingAccesses: any;
  parentSelected: boolean = false;
  itemsChanged: boolean = false;
  activeParentId: number;
  addingNewRole: boolean = false;
  newRoleName = new FormControl("", [Validators.required]);
  activeRow: number;
  editing = {};

  ngOnInit() {
    this.RoleServ.getAllRoles().subscribe(
      data => {
        let RoleesData = new Array();

        for (var i in data["roles"]) {
          data["roles"][i]["id"] = i;
          RoleesData.push(data["roles"][i]);
        }

        this.roles = RoleesData;

        this.allAccesses = data["abilities"];
        this.remainingAccesses = this.allAccesses;
        this.setremainingAccesses();
      },
      error => {
        console.log(error);
        this.authServ.handdleAuthErrors(error);
      }
    );
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + "-" + cell] = false;
    this.roles[rowIndex][cell] = event.target.value;
    this.refreshParents();

    let newName = this.roles[rowIndex][cell];
    let id = this.roles[rowIndex]["id"];

    this.RoleServ.updateRole({
      name: newName,
      id: id,
      value: Globals.fetchData(this.selectedRoleAccesses,true)
    }).subscribe(
      data => {
        console.log(data);
        this.itemsChanged = false;
        this.toastr.success("نام گروه با موفقیت تغییر یافت");
      },
      error => {
        console.log(error);
      }
    );
  }

  refreshParents() {
    this.roles = [...this.roles];
  }

  onKeyPress(event) {
    if (event.which == 13) {
      event.target.blur();
    }
  }

  onActivate(event) {
    if (event.type == "click") {
      this.parentSelected = true;

      this.selectedRoleAccesses = event.row.ability;

      this.setremainingAccesses();
      this.activeParentId = event.row.id;

      this.itemsChanged = false;
    }
  }

  setActiveRow(rowIndex) {
    this.activeRow = rowIndex;
  }

  setremainingAccesses() {
    let $this = this;

    this.remainingAccesses = this.allAccesses.filter(el => {
      return !$this.selectedRoleAccesses[el["id"]];
    });

    this.remainingAccesses.sort();
  }

  addItemToSelectedParent(event, subItem) {
    if (this.parentSelected)
      if (!this.selectedRoleAccesses[subItem["id"]]) {
        this.itemsChanged = true;
        this.selectedRoleAccesses[subItem["id"]] = subItem["title"];

        this.setremainingAccesses();
      }
  }

  removeFromSelectedParent(event, subItem) {
    if (this.parentSelected)
      if (this.selectedRoleAccesses[subItem["key"]]) {
        this.itemsChanged = true;

        delete this.selectedRoleAccesses[subItem["key"]];
        this.setremainingAccesses();
      }
  }

  updateParentItems() {
  
    this.RoleServ.updateRole({
      id: this.activeParentId,
      value: Globals.fetchData(this.selectedRoleAccesses, true)
    }).subscribe(
      data => {
        console.log(data);
        this.itemsChanged = false;

        this.roles[this.activeRow]["ability"] = this.selectedRoleAccesses;
        this.refreshParents();
        this.toastr.success(
          "دسترسی های مقام  " +
            this.roles[this.activeRow]["title"] +
            "  با موفقیت ثبت شد."
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  addNewRoleClick() {
    if (this.addingNewRole) {
      let newItemData = {
        name: this.newRoleName.value,
        value: []
      };

      this.RoleServ.addRole(newItemData).subscribe(
        data => {
          this.newRoleName.setValue('');
          
          data = data['data'];
          newItemData['ability']= data['ability'];
          newItemData['id']= data['id'];

          this.toastr.success("مقام با موفقیت اضافه شد.");
          this.roles.push(newItemData);
          this.refreshParents();
        },
        error => {
          console.log(error);
        }
      );

      this.refreshParents();
      this.addingNewRole = false;
    } else this.addingNewRole = true;
  }

  filterAllAccesses(event) {
    let searhKey = event.target.value;

    this.setremainingAccesses(); // to refresh
    console.log(searhKey);
    let searchResult = this.remainingAccesses.filter(el => {
      //debugger;

      String(el).indexOf(searhKey) == 0;
    });
  }

  selectedItemNameToDelete = "";
  showRemoveModal(rowIndex) {
    this.smallModal.show();
    this.activeRow = rowIndex;
    this.selectedItemNameToDelete = this.roles[this.activeRow]["title"];
  }

  @ViewChild('removeRuleModal') removeModal : ModalDirective;

  confirmDelete() {
    debugger;
    this.RoleServ.deleteRole(this.roles[this.activeRow]["id"]).subscribe(
      data => {
        this.toastr.success('مقام با موفقیت حذف شد.');
        this.removeModal.hide();
      },
      error => {
        this.authServ.handdleAuthErrors(error);
      }
    );
    console.log(this.roles[this.activeRow]["title"]);
  }
}
