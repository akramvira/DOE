import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";

@Component({
  selector: "app-performance-l3",
  templateUrl: "./performance-l3.component.html",
  styleUrls: ["./performance-l3.component.scss"]
})
export class PerformanceL3Component implements OnInit {
  asDropdownSettings = {};
  officeDropdownSettings = {};
  lineDropdownSettings = {};

  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService
  ) {}
  groups = new Array();
  filters = new FormGroup({
    time: new FormControl(0),
    type: new FormControl(0),
    inorout: new FormControl("in"),
    disposition: new FormControl(0),
    selectedItems: new FormControl([]),
    selectedSub1: new FormControl([]),
    selectedSub2: new FormControl([])
  });

  allSub1Data: any = [];

  offices = this.filters.value.selectedItems[0]
    ? this.allSub1Data[this.filters.value.selectedItems[0]["id"]]
    : [];

  lines = [];

  activeFilter(event) {
    let elem = event.target.element;

    this.filters.value.time;
  }

  dateObject = moment("1398-11-22", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");

  datePickerConfig = {
    format: "YYYY/MM/DD",
    theme: "dp-material"
  };

  selectedGroups: any = this.filters.value.selectedItems;
  showAnsweredCalls = true;
  showNoAnsweredCalls = true;
  showLineAllCalls = true;
  onSelectAll(item) {}
  onItemSelect(item) {
    this.offices = this.allSub1Data[item["id"]];
    this.filters.patchValue({
      selectedSub1: this.offices
    });
    this.updateLines();
  }
  onDeSelectMain() {
    this.offices = [];
    this.filters.patchValue({
      selectedSub1: []
    });
    return;
  }

  onDeSelectSub1(item) {
    this.updateLines();
  }

  updateLines() {
    let sub1 = [];

    for (let i in this.filters.value.selectedSub1) {
      sub1.push(this.filters.value.selectedSub1[i]["id"]);
    }

    let data = {
      id: this.filters.value.selectedItems[0]["id"],
      idsub: sub1.join(",")
    };

    this.webServ.getNumbers(data).subscribe(
      data => {
 
        this.lines = data["data"];
        this.filters.patchValue({
          selectedSub2 : this.lines
        })
        this.updateCharts();
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  officeSelected(item) {
    this.updateLines();
  }
  ngOnInit() {
    this.asDropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      limitSelection: 1,
      allowSearchFilter: true
    };

    this.officeDropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.lineDropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };


    this.filters.value.selectedItems;
    let data = [];
    this.webServ.getExtensionsAndGroups().subscribe(
      data => {
        data = data["data"];
        this.filters.patchValue({
          selectedItems: 0
        });
        let groupesData = new Array();
        let selectedMain = 0;
        for (var i in data) {
          if (!selectedMain) selectedMain = data[i];

          groupesData.push({
            id: data[i]["id"],
            name: data[i]["name"],
            item_id: data[i]["id"],
            item_text: data[i]["name"]
          });

          this.allSub1Data[data[i]["id"]] = [];
          this.allSub1Data[data[i]["id"]] = data[i]["sub"];
        }

        this.groups = groupesData;

        this.offices = this.allSub1Data[selectedMain["id"]];

        this.filters.patchValue({
          selectedItems: [selectedMain],
          selectedSub1: this.offices
        });

        this.updateLines();
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  public performanceBarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public performanceBarChartColors = [
    {
      backgroundColor: "#86c7f3"
    }
  ];
  public timeBarChartColors = [
    {
      backgroundColor: "#86c7f3"
    },
    {
      backgroundColor: "#4dbd74"
    }
  ];

  mainLabels = [];
  public performanceChartLabels: string[] = this.mainLabels;
  public performanceChartData: any[] = [];

  public callsBarChartLabels: string[] = this.mainLabels;
  public callsChartData: any[] = [];

  public timesChartLabels: string[] = this.mainLabels;
  public timesChartData: any[] = [];

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = this.mainLabels;

  updateCharts() {
    this.mainLabels = [];

    for (let i in this.filters.value.selectedSub2) {
      this.mainLabels.push(this.filters.value.selectedSub2[i]["name"]);
    }
    this.lineChartLabels = this.mainLabels;
    
    this.getOneGroupData();
  }

  getOneGroupData() {
    let filterData = this.filters.getRawValue();

    if (!filterData.selectedItems.length) return;
    if (!filterData.selectedSub1.length) return;

    filterData["idsub"] = [];
    filterData["id"] = filterData.selectedItems[0]["id"];
    for (let item in filterData.selectedSub1) {
      filterData["idsub"].push(filterData.selectedSub1[item]["id"]);
    }

    filterData["idnumber"] = [];
    for (let item in this.lines) {
      filterData["idnumber"].push(this.lines[item]["id"]);
    }

    filterData["idnumber"]  = filterData["idnumber"].join(',');

    filterData["idsub"] = filterData["idsub"].join(",");

    if (filterData.time == "-1") {
      (filterData.from = this.selectedDateFrom.value),
        (filterData.to = this.selectedDateTo.value);
    }

    debugger;

    filterData.time = parseInt(filterData.time);
    this.webServ.getGroupPerformance(filterData).subscribe(
      data => {
        data = data["data"];

        this.lineChartData = [];
        this.callsChartData = [];
        this.performanceChartData = [];

        let allCalsData = [];
        let performanceData = [];
        let timesData = [];
        let avgTimesData = [];
        let avgAll = [];

        this.mainLabels = [];
        for (let index in data) {
          this.mainLabels.push(data[index]["name"]);

          allCalsData.push(data[index]["data"]);
          // answeredData.push(data[index]["answer"]);
          // noAnsweredData.push(data[index]["noanswer"]);
          // performanceData.push(data[index]["noanswer"]);
          // timesData.push(data[index]["time"]);
          // avgTimesData.push(data[index]["avg"]);
          // avgAll.push(400);
        }

        this.callsBarChartLabels = this.mainLabels;
        this.callsChartData = [{ data: allCalsData, label: "تعداد تماس ها" }];

        this.timesChartData = [
          { data: timesData, label: "مدت زمان تماس" },
          { data: avgTimesData, label: "میانگین زمان تماس" },
          { data: avgAll, label: "میانگین کل" }
        ];

        let allCalls = this.showLineAllCalls
          ? { data: allCalsData, label: " همه تماس ها" }
          : { data: [], label: " همه تماس ها" };

        this.lineChartData = [allCalls];

        this.performanceChartData = [
          { data: performanceData, label: "عملکرد گروه" }
        ];
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  onSelectDate() {
    this.getOneGroupData();
  }

}
