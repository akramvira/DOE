import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";

@Component({
  selector: 'app-performance-l3',
  templateUrl: './performance-l3.component.html',
  styleUrls: ['./performance-l3.component.scss']
})
export class PerformanceL3Component implements OnInit {
  dropdownSettings = {};

  constructor(
    private reportsServ: ReportsService,
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
  showAnsweredCalls = false;
  showNoAnsweredCalls = false;
  showLineAllCalls = true;
  onSelectAll(item) {}
  onItemSelect(item) {
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
      limitSelection: 2,
      allowSearchFilter: true
    };
    this.filters.value.selectedItems;
    this.reportsServ.getExtensionsAndGroups().subscribe(
      data => {
        let groupesData = new Array();
        for (var i in data["groups"]) {
          groupesData.push({
            item_id: i,
            item_text: data["groups"][i]["name"]
          });
        }
        this.groups = groupesData;
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

  dailyTimes = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00"
  ];

  monthlyTimes = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30"
  ];

  yearlyTimes = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
  ];

  timeLabels = {
    daily: this.dailyTimes,
    monthly: this.monthlyTimes,
    yearly: this.yearlyTimes,
    choosely: ""
  };

  public performanceChartLabels: string[] = this.dailyTimes;
  public performanceChartData: any[] = [];

  public callsBarChartLabels: string[] = this.dailyTimes;
  public callsChartData: any[] = [];

  public timesChartLabels: string[] = this.dailyTimes;
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
  public lineChartLabels: Array<any> = this.dailyTimes;
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
    debugger;
    let filterData = this.filters.getRawValue();
    this.lineChartLabels = this.timeLabels[filterData.time];
    this.callsBarChartLabels = this.timeLabels[filterData.time];
    this.performanceChartLabels = this.timeLabels[filterData.time];

    if (filterData.selectedItems.length == 1) {
      filterData["id"] = filterData.selectedItems[0]["item_id"];
      this.getOneGroupData(filterData);
    } else if (filterData.selectedItems.length > 1) {
      this.getMultipleGroupData(filterData);
    }
  }

  getOneGroupData(filterData) {
    this.reportsServ.getGroupPerformance(filterData).subscribe(
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

    

    this.reportsServ.getGroupPerformance(filterData).subscribe(
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
    this.reportsServ.getCompareGroupsCalls(groupsId).subscribe(
      data => {
        debugger;

        this.lineChartLabels = this.timeLabels[this.filters.value.time];
        this.callsBarChartLabels = this.timeLabels[this.filters.value.time];

        let allCalsData = [];
        let answeredData = [];
        let noAnsweredData = [];
        let performanceData = [];

        this.filters.value.selectedItems.forEach(item => {
          allCalsData.push(item["all"]);
          answeredData.push(item["answer"]);
          noAnsweredData.push(item["noanswer"]);
          performanceData.push(item["noanswer"]);
        });

        this.callsChartData = [
          { data: allCalsData, label: "همه" },
          { data: answeredData, label: "پاسخ داده شده" },
          { data: noAnsweredData, label: "پاسخ داده نشده" }
        ];
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  onSelectDate() {}
}
