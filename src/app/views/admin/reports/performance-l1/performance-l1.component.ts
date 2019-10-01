import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from './web.service';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
@Component({
  selector: 'app-performance-l1',
  templateUrl: './performance-l1.component.html',
  styleUrls: ['./performance-l1.component.scss']
})
export class PerformanceL1Component implements OnInit {
  dropdownSettings = {};

  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService
  ) {}
  groups = new Array();
  filters = new FormGroup({
    time: new FormControl("daily"),
    type: new FormControl("all"),
    inorout: new FormControl("all"),
    selectedItems: new FormControl([])
  });

  activeFilter(event) {
    let elem = event.target.element;

    this.filters.value.time;
  }

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("98/01/01");
  selectedDateTo = new FormControl("98/01/01");

  datePickerConfig = {
    format: "YY/MM/DD",
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
    for(let index in this.filters.value.selectedItems){
      labels.push(this.filters.value.selectedItems[index]['item_text']);
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
    this.webServ.getExtensionsAndGroups().subscribe(
      data => {
        let groupesData = new Array();
        for (var i in data["groups"]) {
          groupesData.push({
            item_id: i,
            item_text: data["groups"][i]["name"]
          });
          
        }
        this.groups = groupesData;

        this.filters.patchValue({
          selectedItems : groupesData
        });

        let labels = [];
        for(let index in this.filters.value.selectedItems){
          labels.push(this.filters.value.selectedItems[index]['item_text']);
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



  mainLabels = [
    'معاونت',
    'معاونت 2'
  ];
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
  

      if(filterData.selectedItems.length){
      filterData["id"] = filterData.selectedItems[0]["item_id"];
      this.getOneGroupData(filterData);
    }
    // } else if (filterData.selectedItems.length > 1) {
    //   this.getMultipleGroupData(filterData);
    // }
  }

  getOneGroupData(filterData) {
    this.webServ.getGroupPerformance(filterData).subscribe(
      data => {
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
        for (let index in data) {
          allCalsData.push(data[index]["all"]);
          answeredData.push(data[index]["answer"]);
          noAnsweredData.push(data[index]["noanswer"]);
          performanceData.push(data[index]["noanswer"]);
          timesData.push(data[index]["time"]);
          avgTimesData.push(data[index]["avg"]);
          avgAll.push(400);
        }

        this.callsChartData = [
          { data: allCalsData, label: "همه تماس ها" },
          { data: answeredData, label: "پاسخ داده شده" },
          { data: noAnsweredData, label: "پاسخ داده نشده" }
        ];

        debugger;
        this.timesChartData = [
          { data: timesData, label: "مدت زمان تماس" },
          { data: avgTimesData, label: "میانگین زمان تماس" },
          { data: avgAll, label: "میانگین کل" }
        ];

        let allCalls = this.showLineAllCalls
          ? { data: allCalsData, label: " همه تماس ها" }
          : { data: [], label: " همه تماس ها" };
        let answerCalls = this.showAnsweredCalls
          ? { data: answeredData, label: "پاسخ داده شده" }
          : { data: [], label: "پاسخ داده شده" };
        let noanswerCalls = this.showNoAnsweredCalls
          ? { data: noAnsweredData, label: "پاسخ داده نشده" }
          : { data: [], label: "پاسخ داده نشده" };

        this.lineChartData = [allCalls, answerCalls, noanswerCalls];

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

  getMultipleGroupData(filterData) {
    let groupsId = {
      id_group1: filterData.selectedItems[0]["item_id"],
      id_group2: filterData.selectedItems[1]["item_id"]
    };

    

    this.webServ.getGroupPerformance(filterData).subscribe(
      dataAll => {
        debugger;

        let data = [dataAll, dataAll];//fake


        this.lineChartData = [];
        let lineChartDataTmp = [];
        this.callsChartData = [];
        let callsChartDataTmp = [];
        this.performanceChartData = [];
        let performanceChartDataTmp = [];

        let timesChartDataTmp = [];

        let allCalsData = [];
        let answeredData = [];
        let noAnsweredData = [];
        let performanceData = [];
        let timesData = [];
        let avgTimesData = [];
        let avgAll = [];

        for (let i = 0; i < 2; i++) {
 

          for (let index in data[i]) {
            allCalsData.push(data[i][index]["all"]);
            answeredData.push(data[i][index]["answer"]);
            noAnsweredData.push(data[i][index]["noanswer"]);
            performanceData.push(data[i][index]["noanswer"]);
            timesData.push(data[i][index]["time"]);
            avgTimesData.push(data[i][index]["avg"]);
            avgAll.push(400);
          }

          callsChartDataTmp.push([
            { data: allCalsData, label: "همه تماس ها، گروه"+ i },
            { data: answeredData, label: "پاسخ داده شده ، گروه"+ i},
            { data: noAnsweredData, label: "پاسخ داده نشده ، گروه"+ i }
          ]);

          timesChartDataTmp = [{ data: timesData, label: "مدت زمان تماس، گروه"+ i }];

         timesChartDataTmp = [
            { data: timesData, label: "مدت زمان تماس، گروه"+ i },
            { data: avgTimesData, label: "میانگین زمان تماس ، گروه"+ i },
            { data: avgAll, label: "میانگین کل، گروه"+ i }
          ];

          let allCalls = this.showLineAllCalls
            ? { data: allCalsData, label: " همه تماس ها، گروه"+ i }
            : { data: [], label: " همه تماس ها، گروه"+ i };
          let answerCalls = this.showAnsweredCalls
            ? { data: answeredData, label: "پاسخ داده شده، گروه"+ i }
            : { data: [], label: "پاسخ داده شده، گروه"+ i };
          let noanswerCalls = this.showNoAnsweredCalls
            ? { data: noAnsweredData, label: "پاسخ داده نشده، گروه"+ i }
            : { data: [], label: "پاسخ داده نشده، گروه"+ i };

          lineChartDataTmp = [allCalls, answerCalls, noanswerCalls];

          
          performanceChartDataTmp = [
            { data: performanceData, label: "عملکرد گروه "+ i }
          ];
        }




        debugger;
        this.lineChartData = lineChartDataTmp;
        this.performanceChartData = performanceChartDataTmp;
        this.callsChartData = callsChartDataTmp;
        this.timesChartLabels = timesChartDataTmp;

      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );

    ///////////////////////////////////calls///////////////////////////////
    // this.webServ.getCompareGroupsCalls(groupsId).subscribe(
    //   data => {

    //     this.lineChartLabels = this.mainLabels;
    //     this.callsBarChartLabels = this.mainLabels;

    //     let allCalsData = [];
    //     let answeredData = [];
    //     let noAnsweredData = [];
    //     let performanceData = [];

    //     this.filters.value.selectedItems.forEach(item => {
    //       allCalsData.push(item["all"]);
    //       answeredData.push(item["answer"]);
    //       noAnsweredData.push(item["noanswer"]);
    //       performanceData.push(item["noanswer"]);
    //     });

    //     this.callsChartData = [
    //       { data: allCalsData, label: "همه" },
    //       { data: answeredData, label: "پاسخ داده شده" },
    //       { data: noAnsweredData, label: "پاسخ داده نشده" }
    //     ];
    //   },
    //   error => {
    //     this.authServe.handdleAuthErrors(error);
    //   }
    // );


  }

  onSelectDate() {}
}
