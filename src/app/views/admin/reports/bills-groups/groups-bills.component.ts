import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import * as moment from "jalali-moment";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { WebService } from "./web.service";
import { SharedService } from "../../../../_services/shared.service";

@Component({
  selector: "app-groups-bills",
  templateUrl: "./groups-bills.component.html",
  styleUrls: ["./groups-bills.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GroupsBillsComponent implements OnInit {
  groups = new Array();
  bills: any;
  page = new Page();

  constructor(
    private reportsServ: ReportsService,
    private authService: AuthenticationService,
    private webSerice: WebService,
    private sharedService: SharedService
  ) {}
  getAllLevelsData() {
    this.webSerice.getExtensionsAndGroups().subscribe(
      data => {
        data = data["data"];
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
        this.updateLines();
      },
      error => {
        this.authService.handdleAuthErrors(error);
      }
    );
  }

  ngOnInit() {
    this.setDate();
    this.updateDropdownsSetting();
    this.getAllLevelsData();
    this.getBillsData();
  }
  onActivate(event) {}

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

  officeSelected() {
    this.updateLines();
  }
  //------date
  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");

  datePickerConfig = {};
  setDate() {
    if (this.sharedService.minMaxTime.value) {
      this.minDate = this.sharedService.minMaxTime.value.min;
      this.maxDate = this.sharedService.minMaxTime.value.max;

      this.selectedDateFrom.setValue(this.minDate);
      this.selectedDateTo.setValue(this.maxDate);

      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.minDate, "jYYYY,jMM,jDD"),
        max: moment(this.maxDate, "jYYYY,jMM,jDD"),
        showGoToCurrent: true,
        hideOnOutsideClick: true,
        showNearMonthDays: true
      };
    }

    this.sharedService.minMaxTime.subscribe(data => {
      this.minDate = data["min"];
      this.maxDate = data["max"];

      this.selectedDateFrom.setValue(this.minDate);
      this.selectedDateTo.setValue(this.maxDate);
      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.minDate, "jYYYY,jMM,jDD"),
        max: moment(this.maxDate, "jYYYY,jMM,jDD"),
        showGoToCurrent: true,
        hideOnOutsideClick: true,
        showNearMonthDays: true
      };
    });
  }

  @ViewChild("billsTable") table: any;
  toggleExpandGroup(group) {
    console.log("Toggled Expand Group!", group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  setActiveRow() {}

  loadingData = false;
  //---------------------selected items ----------------
  mainDropdownSettings = {};
  officeDropdownSettings = {};
  lineDropdownSettings = {};

  allSub1Data: any = [];

  updateDropdownsData() {
    this.updateDropdownsSetting();
    this.activeSub1_1 = [];

    this.selectedItem1.patchValue({
      main: [],
      sub1: [],
      sub2: []
    });
  }
  //---------------------item 1 ----------------
  selectedItem1 = new FormGroup({
    level: new FormControl("0"),
    main: new FormControl(),
    sub1: new FormControl(),
    sub2: new FormControl(),
    time: new FormControl(0),
    from: new FormControl(),
    to: new FormControl()
  });

  getLevel(level) {
    if (level == 1) return this.selectedItem1.value.level;
    else return this.selectedItem1.value.level;
  }

  activeSub1_1 = [];

  activeSub1_2 = [];

  lines = [];

  selectedGroups: any = this.selectedItem1.value.main;

  onSelectAll(item) {}
  onItemSelect(item) {
    this.activeSub1_1 = this.allSub1Data[item["id"]];
    this.selectedItem1.patchValue({
      sub1: this.activeSub1_1
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
    //this.updateLines();
  }

  updateLines() {
    let sub1 = [];

    let data = {
      level1: this.selectedItem1.value.level,
      idmain1: this.selectedItem1.value.main,
      idsub1: this.selectedItem1.value.sub1,
      idnumber1: this.selectedItem1.value.sub2
    };
debugger;
    this.webSerice.getNumbers(data).subscribe(
      data => {
        debugger;
        this.lines = data["data"];
      },
      error => {
        this.authService.handdleAuthErrors(error);
      }
    );
  }

  onMainSelect(item) {
    this.activeSub1_1 = this.allSub1Data[item["id"]];
    this.selectedItem1.patchValue({
      sub: this.activeSub1_1
    });
    this.updateLines();
  }
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

      allowSearchFilter: true
    };

    let mainLimitSelections: number;
    let sub1LimitSelections: number;
    let sub2LimitSelections: number;

    let unlimitted = 10000;
    if (this.selectedItem1.value.level == 0) {
      mainLimitSelections = unlimitted;
      sub1LimitSelections = unlimitted;
      sub2LimitSelections = unlimitted;
    } else if (this.selectedItem1.value.level == 1) {
      mainLimitSelections = 1;
      sub1LimitSelections = unlimitted;
      sub2LimitSelections = unlimitted;
    } else {
      mainLimitSelections = 1;
      sub1LimitSelections = 1;
      sub2LimitSelections = unlimitted;
    }

    this.mainDropdownSettings = {
      ...mainSettings,
      limitSelection: mainLimitSelections
    };

    this.officeDropdownSettings = {
      ...mainSettings,
      limitSelection: sub1LimitSelections
    };

    this.lineDropdownSettings = {
      ...mainSettings,
      limitSelection: sub2LimitSelections
    };
  }

  //read data from array and join with , to send for Api
  fetchData(data) {
    let finalData = [];
    for (let i in data) {
      finalData.push(data[i]["id"]);
    }

    return finalData.join(",");
  }
  getBillsData() {
  debugger;
    let filterData = [];
    let selectedItem1 = this.selectedItem1.getRawValue();
    if (!selectedItem1.main || !selectedItem1.main.length) return;
    if (selectedItem1.level != 0 && !selectedItem1.sub1.length) return;
    if (selectedItem1.level == 2 && !selectedItem1.sub2.length) return;

    filterData["level"] =selectedItem1.level;
    filterData["id"] = this.fetchData(selectedItem1.main);
    filterData["idSub"] = this.fetchData(selectedItem1.sub1);
    filterData["idnumber"] = this.fetchData(this.lines);

    filterData["time"] = this.selectedItem1.value.time;
    filterData["from"] = this.selectedItem1.value.from || '';
    filterData["to"] = this.selectedItem1.value.to || '';
    this.loadingData = true;
   
    console.log(filterData);
    this.webSerice.getBills(filterData).subscribe(
      data => {
      
        data = data['data'];

        let billsData = new Array();
        for (var i in data) {
          //      debugger;
         // if (i == "all") continue;
         // data["groupId"] = i;

         let itemData = [];
         itemData['id']= data[i]['id'];
         itemData['name']=data[i]['name'];
         itemData['abonmah']=data[i]['data']['abonmah'];
         itemData['betweanco']=data[i]['data']['betweanco'];
         itemData['co']=data[i]['data']['co'];
         itemData['mobile']=data[i]['data']['mobile'];
         itemData['sum']=data[i]['data']['sum'];
         billsData.push(itemData);

        }

        debugger;
        this.bills = billsData;

        this.page.pageNumber = 0;
        this.page.size = 20;

        this.setPage({ offset: 0 });

        this.page.pageNumber = 1;
        this.page.size = 10;
        this.page.totalElements = 100;
        this.page.totalPages = 10;
        this.loadingData = false;
      },
      error => {
        this.authService.handdleAuthErrors(error);
      }
    );
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
