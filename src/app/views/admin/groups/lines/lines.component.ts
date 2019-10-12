import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { GroupsService } from "../_services/groups.service";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Validators, FormControl } from "@angular/forms";
import { WebService } from "./web.service";

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit{
  constructor(
    private webServ: WebService,
    private authServ: AuthenticationService,
    private toastr: ToastrService
  ) {}

  groups = new Array();
  allExtensions: [];
  selectedGroupExtensions: any = [];
  remainingExtensions: any;
  parentSelected: boolean = false;
  itemsChanged: boolean = false;
  activeParentId: number;
  addingNewGroup: boolean = false;
  newGroupName = new FormControl("");
  newGroupNumber = new FormControl("", [Validators.required, Validators.max(8)]);
  activeRow: number;
  editing = {};

  submitNewItem(){
    this.addNewGroupClick();
  }
  ngOnInit() {
    this.toastr.warning('جهت ویرایش، روی نام یا شماره داخلی دو بار کلیک کنید!','پیغام سیستم');
    this.webServ.getAllGroups().subscribe(
      data => {
        data = data["data"];

        let groupesData = new Array();
        for (var i in data) {
          groupesData.push(data[i]);
        }
        this.groups = groupesData;
        this.allExtensions = data["sub"];
        this.remainingExtensions = this.allExtensions;
        this.setRemainingExtensions();
        // this.selectedGroupExtensions = this.groups[0]['value'].split(',');
      },
      error => {
        this.authServ.handdleAuthErrors(error);
      }
    );
  }

  updateValue(event, cell, rowIndex) {
  
    this.editing[rowIndex + "-" + cell] = false;
    this.groups[rowIndex][cell] = event.target.value;
    this.refreshParents();

    let newName = this.groups[rowIndex][cell];
    let id = this.groups[rowIndex]["id"];

    this.webServ
      .updateGroup({
        name: this.groups[rowIndex]['name'],
        number: this.groups[rowIndex]['number'],
        id: id
      })
      .subscribe(
        data => {
          console.log(data);
          this.itemsChanged = false;
          this.toastr.success("اطلاعات داخلی با موفقیت تغییر یافت.");
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshParents() {
    this.groups = [...this.groups];
  }

  onKeyPress(event) {
    if (event.which == 13) {
      event.target.blur();
    }
  }

  onActivate(event) {
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
  }

  setActiveRow(rowIndex) {
    this.activeRow = rowIndex;
  }

  setRemainingExtensions() {
    let $this = this;

    this.selectedGroupExtensions;
    this.remainingExtensions = this.allExtensions.filter(el => {
      return !$this.selectedGroupExtensions.includes(el);
    });

    this.remainingExtensions.sort();
  }

  convertSelectedGroupExtentionsToInt() {
    let $this = this;
    this.selectedGroupExtensions.forEach(function(e, i) {
      $this.selectedGroupExtensions[i] = parseInt(
        $this.selectedGroupExtensions[i]
      );
    });
  }

  addItemToSelectedParent(event, subItem) {
    if (this.parentSelected)
      if (!this.selectedGroupExtensions.includes(subItem)) {
        this.itemsChanged = true;
        this.selectedGroupExtensions.push(subItem);
        this.setRemainingExtensions();
      }
  }

  removeFromSelectedParent(event, subItem) {
    if (this.parentSelected)
      if (this.selectedGroupExtensions.includes(subItem)) {
        this.itemsChanged = true;
        this.selectedGroupExtensions.splice(
          this.selectedGroupExtensions.indexOf(subItem),
          1
        );
        this.setRemainingExtensions();
      }
  }

  updateParentItems() {
    this.webServ
      .updateGroup({
        id: this.activeParentId,
        value: this.selectedGroupExtensions.join(",")
      })
      .subscribe(
        data => {
          console.log(data);
          this.itemsChanged = false;

          this.groups[this.activeRow][
            "value"
          ] = this.selectedGroupExtensions.join(",");
          this.refreshParents();
          this.toastr.success(
            "داخلی های گروهگ " +
              this.groups[this.activeRow]["name"] +
              "  با موفقیت ثبت شد."
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  addNewGroupClick() {
    if (this.addingNewGroup) {
      let newItemData = {
        name: this.newGroupName.value,
        number: this.newGroupNumber.value
      };

      this.webServ.addGroup(newItemData).subscribe(
        data => {
       debugger;
          this.toastr.success("گروه با موفقیت اضافه شد.");
          newItemData['id']=data['data']['id'];
          this.groups.unshift(newItemData);
          this.refreshParents();
          this.addingNewGroup = false;
          this.newGroupName.setValue('');
          this.newGroupNumber.setValue('');
        },
        error => {
          this.refreshParents();
          this.authServ.handdleAuthErrors(error);
        }
      );

    
    } else this.addingNewGroup = true;
  }

  filterAllExtensions(event) {
    let searhKey = event.target.value;

    this.setRemainingExtensions(); // to refresh
    console.log(searhKey);
    let searchResult = this.remainingExtensions.filter(el => {
      String(el).indexOf(searhKey) == 0;
    });
  }

  @ViewChild("removeGroupModal") public smallModal: ModalDirective;

  selectedItemNameToDelete = "";
  showRemoveModal(rowIndex) {
    this.smallModal.show();
    this.activeRow = rowIndex;
    this.selectedItemNameToDelete = this.groups[this.activeRow]["name"];
  }
  confirmDelete() {
    var activeId = this.activeRow;
    this.webServ.deleteGroup(this.groups[this.activeRow]["id"]).subscribe(
      data => {
        debugger;
        this.removeGroup(activeId);
        this.toastr.success(
          this.groups[activeId]["name"] + '"  با موفقیت حذف شد.'
        );
        this.smallModal.hide();

        this.refreshParents();
      },
      error => {
        this.smallModal.hide();
        this.authServ.handdleAuthErrors(error);
      }
    );
  }

  removeGroup(rowId) {
    this.groups.splice(rowId, 1);
  }
}

