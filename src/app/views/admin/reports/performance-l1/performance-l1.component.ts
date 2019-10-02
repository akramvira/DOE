import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";
import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";
@Component({
  selector: "app-performance-l1",
  templateUrl: "./performance-l1.component.html",
  styleUrls: ["./performance-l1.component.scss"]
})
export class PerformanceL1Component implements OnInit {
  dropdownSettings = {};

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
    selectedItems: new FormControl([])
  });

  activeFilter(event) {
    let elem = event.target.element;

    this.filters.value.time;
  }

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
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
    console.log(this.filters.value.selectedItems);

    let labels = [];
    for (let index in this.filters.value.selectedItems) {
      labels.push(this.filters.value.selectedItems[index]["item_text"]);
    }
    this.mainLabels = labels;
    this.updateCharts();
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      
      //      limitSelection: 2,
      allowSearchFilter: true
    };
    this.filters.value.selectedItems;
    let data = [];
    this.webServ.getExtensionsAndGroups().subscribe(
      data => {
        data = data["data"];

        let groupesData = new Array();
        for (var i in data) {
          groupesData.push({
            item_id: data[i]["id"],
            item_text: data[i]["name"]
          });
        }
        this.groups = groupesData;

        this.filters.patchValue({
          selectedItems: groupesData
        });

        let labels = [];
        for (let index in this.filters.value.selectedItems) {
          labels.push(this.filters.value.selectedItems[index]["item_text"]);
        }
        this.mainLabels = labels;
        this.updateCharts();
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );

    this.updateCharts();
  }

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];

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

  mainLabels = ["معاونت", "معاونت 2"];
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

  onActivate(event) {
    //debugger;
    if (event.type == "click") {
      // this.parentSelected = true;
      // this.selectedGroupExtensions = event.row.value.split(',');
      // this.convertSelectedGroupExtentionsToInt();
      // this.setRemainingExtensions();
      // this.activeParentId =  event.row.id;
      // this.itemsChanged = false;
    }
  }

  activeRow: any;

  onSelectGroup(selectedRows) {
    this.selectedGroups = selectedRows["selected"];
    this.selectedGroups.length;

    this.updateCharts();
  }

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = this.mainLabels;
  public lineChartColours: Array<any> = [
    {
      //
      backgroundColor: "rgba(255, 161, 181, 0.1)",
      borderColor: "rgba(255, 161, 181, 0.4)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      //
      backgroundColor: "rgba(77, 189, 116, 0.1)",
      borderColor: "rgba(77, 189, 116, 0.4)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      //
      backgroundColor: "rgba(255, 193, 7, 0.1)",
      borderColor: "rgba(255, 193, 7, 0.4)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      //
      backgroundColor: "rgba(32, 168, 216, 0.1)",
      borderColor: "rgba(32, 168, 216, 0.4)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },

    {
      //
      backgroundColor: "rgba(255, 161, 181, 0.1)",
      borderColor: "rgba(255, 161, 181, 0.4)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      //
      backgroundColor: "rgba(77, 189, 116, 0.1)",
      borderColor: "rgba(77, 189, 116, 0.4)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      //
      backgroundColor: "rgba(255, 193, 7, 0.1)",
      borderColor: "rgba(255, 193, 7, 0.4)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      //
      backgroundColor: "rgba(32, 168, 216, 0.1)",
      borderColor: "rgba(32, 168, 216, 0.4)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];

  updateCharts() {
    let filterData = this.filters.getRawValue();
    this.lineChartLabels = this.mainLabels;
    this.callsBarChartLabels = this.mainLabels;
    this.performanceChartLabels = this.mainLabels;

    //if (filterData.selectedItems.length == 1) {

   // if (filterData.selectedItems.length) {
     // filterData["id"] = filterData.selectedItems[0]["item_id"];
    //  debugger;
      this.getOneGroupData(filterData);
    //}
    // } else if (filterData.selectedItems.length > 1) {
    //   this.getMultipleGroupData(filterData);
    // }
  }

  getOneGroupData(filterData) {

    filterData["id"] = [];
  

    if(filterData.selectedItems.length == 0 ) return;
    for(let item in filterData.selectedItems){
      filterData["id"].push(filterData.selectedItems[item]['item_id']);
    }

    filterData['id'] = filterData['id'].join(',');
    if(filterData.time == '-1'){
      filterData.from = this.selectedDateFrom.value,
      filterData.to = this.selectedDateTo.value
    }

    filterData.time = parseInt(filterData.time);
    this.webServ.getGroupPerformance(filterData).subscribe(
      data => {
        data=data['data'];
        
        this.lineChartData = [];
        this.callsChartData = [];
        this.performanceChartData = [];

        let allCalsData = [];
        let answeredData = [];
        let noAnsweredData = [];
        let performanceData = [];
        let timesData = [];
        let avgTimesData = [];
        let avgAll = [];

       
        this.mainLabels=[];
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

        this.callsChartData = [
          { data: allCalsData, label: "تعداد تماس ها" }
        ];

        this.timesChartData = [
          { data: timesData, label: "مدت زمان تماس" },
          { data: avgTimesData, label: "میانگین زمان تماس" },
          { data: avgAll, label: "میانگین کل" }
        ];

        let allCalls = this.showLineAllCalls
          ? { data: allCalsData, label: " همه تماس ها" }
          : { data: [], label: " همه تماس ها" };


        this.lineChartData = [allCalls];

        this.pieChartData = [];
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
    debugger;
    this.getOneGroupData( this.filters.getRawValue());
  }
}
