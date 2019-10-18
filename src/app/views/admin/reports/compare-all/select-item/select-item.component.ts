import { Component, OnInit, Input } from "@angular/core";
import { WebService } from "../web.service";
import { AuthenticationService } from "../../../../../_services/authentication.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-select-item",
  templateUrl: "./select-item.component.html",
  styleUrls: ["./select-item.component.scss"]
})
export class SelectItemComponent implements OnInit {
  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService
  ) {}

  @Input() data: any;
  ngOnInit() {
    this.getAllLevelsData();
    this.updateDropdownsSetting();
  }

  public itemsValue(): string {
    return "hi its value";
  }

  getAllLevelsData() {
    this.webServ.getExtensionsAndGroups().subscribe(
      data => {
        data = data["data"];

        this.selectedItem1.patchValue({
          main: 0
        });
        let mainData = new Array();
        let selectedMain = 0;
        for (var i in data) {
          if (!selectedMain) selectedMain = data[i];

          mainData.push({
            id: data[i]["id"],
            name: data[i]["name"],
            item_id: data[i]["id"],
            item_text: data[i]["name"]
          });

          this.allSub1Data[data[i]["id"]] = [];
          this.allSub1Data[data[i]["id"]] = data[i]["sub"];
        }

        this.groups = mainData;

        this.activeSub1_1 = this.allSub1Data[selectedMain["id"]];
        this.activeSub1_2 = this.allSub1Data[selectedMain["id"]];

      
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  //---------------------selected items ----------------
  mainDropdownSettings = {};
  officeDropdownSettings = {};
  lineDropdownSettings = {};

  groups = new Array();
  allSub1Data: any = [];

  updateDropdownsData1() {
    this.updateDropdownsSetting();

    //clear sub1
    this.activeSub1_1 = [];

    this.selectedItem1.patchValue({
      main: [],
      sub1: [],
      sub2: []
    });
  }

  //read data from array and join with , to send for Api
  fetchData(data) {
    let finalData = [];
    for (let i in data) {
      finalData.push(data[i]["id"]);
    }

    return finalData.join(",");
  }
  //---------------------item 1 ----------------
  selectedItem1 = new FormGroup({
    level: new FormControl("0"),
    main: new FormControl(),
    sub1: new FormControl(),
    sub2: new FormControl()
  });

  selectedItem2 = new FormGroup({
    level: new FormControl("0"),
    main: new FormControl(),
    sub1: new FormControl(),
    sub2: new FormControl()
  });

  getLevel(level) {
    if (level == 1) return this.selectedItem1.value.level;
    else return this.selectedItem1.value.level;
  }

  activeSub1_1 = [];
  activeSub1_2 = [];

  lines = [];

  updateDropdownsSetting() {
    let mainSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: "بدون اطلاعات",
      limitSelection : 1,
      allowSearchFilter: true
    };

    this.lineDropdownSettings = 
    this.mainDropdownSettings = 
    this.officeDropdownSettings = mainSettings;
  }

  selectedGroups: any = this.selectedItem1.value.main;

  onSelectAll(item) {}
  onMain1Select(item) {
    this.activeSub1_1 = this.allSub1Data[item["id"]];
    this.selectedItem1.patchValue({
      sub1: []
    });
    this.updateLines();
  }
  onDeSelectMain() {
    this.activeSub1_1 = [];
    this.selectedItem1.patchValue({
      sub1: []
    });
    return;
  }

  onDeSelectSub1(item) {
    this.updateLines();
  }

  getSelectedItems() {
    let data = {
      level1: 1,
      idmain1: 1,
      idsub1: 1,
      idnumber1: 1,

      level2: 1,
      idmain2: 1,
      idsub2: 1,
      idnumber2: 1,
      time: "",
      from: "",
      inorout: "",
      type: ""
    };
  }

  activeSub1_1elected(item) {
    //this.updateLines);
  }

  updateLines() {
    let sub1 = [];
    let data = {
      level1: this.selectedItem1.value.level,
      idmain1: this.fetchData(this.selectedItem1.value.main),
      idsub1: this.fetchData(this.selectedItem1.value.sub1)
    };
  
    if (data.level1 == 2)
      // line select
      this.webServ.getNumbers(data).subscribe(
        data => {
          this.lines = data["data"];
        },
        error => {
          this.authServe.handdleAuthErrors(error);
        }
      );
  }

  public getSelectedValue(){
    let filterData = [];
    let selectedItem1 = this.selectedItem1.getRawValue();
    if (!selectedItem1.main || !selectedItem1.main.length) return;
    if (selectedItem1.level != 0 && !selectedItem1.sub1.length) return;
    if (selectedItem1.level == 2 && !selectedItem1.sub2.length) return;

    filterData["id"] = this.fetchData(selectedItem1.main);
    filterData["idSub"] = this.fetchData(selectedItem1.sub1);
    filterData["idnumber"] = this.fetchData(this.lines);
    filterData["level"] = this.selectedItem1.value.level;

    if(filterData["level"] == 0)
        filterData["label"] = selectedItem1.main[0]['name'];

    else if(filterData["level"] == 1)
      filterData["label"] = selectedItem1.sub1[0]['name'];
    else 
    filterData["label"] = selectedItem1.sub2[0]['name'];

    return filterData;
  }
}