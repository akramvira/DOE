import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";
import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";
import { SharedService } from "../../../../_services/shared.service";
@Component({
  selector: "app-compare-all",
  templateUrl: "./compare-all.component.html",
  styleUrls: ["./compare-all.component.scss"]
})
export class CompareAllComponent implements OnInit {
  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService,
    private sharedService: SharedService
  ) {}

  filters = new FormGroup({
    time: new FormControl(0),
    type: new FormControl(0),
    inorout: new FormControl("in"),
    disposition: new FormControl(0)
  });

  activeFilter(event) {
    // let elem = event.target.element;
    // this.filters.value.time;
  }

  ngOnInit() {
    this.setDate();
    this.getAllLevelsData();
    this.updateDropdownsSetting();
  }

  getAllLevelsData() {
    this.webServ.getExtensionsAndGroups().subscribe(
      data => {
        data = data["data"];
        this.filters.patchValue({
          selectedMainItem: 0
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

        this.filters.patchValue({
          selectedMainItem: [selectedMain],
          selectedSub1: this.activeSub1_1
        });

        this.updateLines();
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  //---------------------selected items ----------------
  mainDropdownSettings = [];
  officeDropdownSettings = [];
  lineDropdownSettings = [];

  groups = new Array();
  allSub1Data: any = [];

  updateDropdownsData() {
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

  getLevel(level) {
    if (level == 1) return this.selectedItem1.value.level;
    else return this.selectedItem1.value.level;
  }

  activeSub1_1 = [];

  activeSub1_2 =[];

  lines = [];

  officeSelected(item) {}
  updateDropdownsSetting() {
    let mainSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "انتخاب همه",
      unSelectAllText: "حذف همه موارد",
      searchPlaceholderText: "جستجو",
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText : 'بدون اطلاعات',

      allowSearchFilter: true
    };

    let mainLimitSelections = [1, 1];
    let sub1LimitSelections = [1, 1];
    let sub2LimitSelections = [1, 1];

    let unlimitted = 10000;
    if (this.selectedItem1.value.level == 0) {
      mainLimitSelections[0] = unlimitted;
      sub1LimitSelections[0] = unlimitted;
      sub2LimitSelections[0] = unlimitted;
    } else if (this.selectedItem1.value.level == 1) {
      mainLimitSelections[0] = 1;
      sub1LimitSelections[0] = unlimitted;
      sub2LimitSelections[0] = unlimitted;
    } else {
      mainLimitSelections[0] = 1;
      sub1LimitSelections[0] = 1;
      sub2LimitSelections[0] = unlimitted;
    }

    this.mainDropdownSettings = [
      {
        ...mainSettings,
        limitSelection: mainLimitSelections[0]
      },
      {
        ...mainSettings,
        limitSelection: mainLimitSelections[1]
      }
    ];

    this.officeDropdownSettings = [
      {
        ...mainSettings,
        limitSelection: sub1LimitSelections[0]
      },
      {
        ...mainSettings,
        limitSelection: sub1LimitSelections[1]
      }
    ];

    this.lineDropdownSettings = [
      {
        ...mainSettings,
        limitSelection: sub2LimitSelections[0]
      },
      {
        ...mainSettings,
        limitSelection: sub2LimitSelections[1]
      }
    ];
  }

  selectedGroups: any = this.filters.value.selectedMainItem;

  onSelectAll(item) {}
  onMain1Select(item) {
    this.activeSub1_1 = this.allSub1Data[item["id"]];
    this.filters.patchValue({
      selectedSub1: this.activeSub1_1
    });
    this.updateLines();
  }
  onDeSelectMain() {
    this.activeSub1_1 = [];
    this.filters.patchValue({
      selectedSub1: []
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
    return;
    for (let i in this.filters.value.selectedSub1) {
      sub1.push(this.filters.value.selectedSub1[i]["id"]);
    }

    let data = {
      id: this.filters.value.selectedMainItem[0]["id"],
      idsub: sub1.join(",")
    };

    // this.webServ.getNumbers(data).subscribe(
    //   data => {
    //     this.lines = data["data"];
    //     this.filters.patchValue({
    //       selectedSub2 : this.lines
    //     })
    //   },
    //   error => {
    //     this.authServe.handdleAuthErrors(error);
    //   }
    // );
  }

  ////--------Charts And shared data Section------------------
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

  public timeAvgChartColors = [
    {
      //cpu
      backgroundColor: "rgba(255, 161, 181, 0.2)",
      borderColor: "rgba(255, 161, 181, 0.9)",
      pointBackgroundColor: "rgba(255, 161, 181, 0.4)",
      pointBorderColor: "rgba(255, 161, 181, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 161, 181, 0.4)",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // ram
      backgroundColor: "rgba(77, 189, 116, 0)",
      borderColor: "rgba(77, 189, 116, 0.9)",
      pointBackgroundColor: "rgba(77, 189, 116, 0.4)",
      pointBorderColor: "rgba(77, 189, 116, 0.4)",
      pointHoverBackgroundColor: "rgba(77, 189, 116, 0.4)",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];

  mainLabels = [];
  public performanceChartLabels: string[] = this.mainLabels;
  public performanceChartData: any[] = [{ data: [], label: "" }];

  public callsBarChartLabels: string[] = this.mainLabels;
  public callsDetailsData: any[] = [
    { data: [], label: "" },
    { data: [], label: "" },
    { data: [], label: "" }
  ];

  public timesChartLabels: string[] = this.mainLabels;
  public timesChartData: any[] = [{ data: [], label: "" }];
  public timesAvgChartData: any[] = [
    { data: [], label: "" },
    { data: [], label: "" }
  ];
  loadTimeLabels = false;

  public allCallsData: Array<any> = [{ data: [], label: "" }];
  public lineChartLabels: Array<any> = this.mainLabels;

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

  initingData: boolean = false;
  loadingData = false;
  //--------------------------------

  setMainLabels() {
    this.mainLabels = [];

    if(this.selectedItem1.value.level)
      this.mainLabels.push()
  }

 

  updateCharts() {
    this.setMainLabels();
    this.getOneGroupData();
  }

  getOneGroupData() {
    let filterData = this.filters.getRawValue();

    let selectedItem1 = this.selectedItem1.getRawValue();
    if (!selectedItem1.main || !selectedItem1.main.length) return;
    if (selectedItem1.level != 0 && !selectedItem1.sub1.length) return;
    if (selectedItem1.level == 2 && !selectedItem1.sub2.length) return;

    filterData["id"] = this.fetchData(selectedItem1.main);
    filterData["idSub"] = this.fetchData(selectedItem1.sub1);
    filterData["idnumber"] = this.fetchData(this.lines);
    

    debugger;

    if (filterData.time == "-1") {
      filterData.from = this.selectedDateFrom.value;
      filterData.to = this.selectedDateTo.value;
    }

    filterData.time = parseInt(filterData.time);
    this.loadingData = true;
    this.webServ.getGroupPerformance(filterData).subscribe(
      data => {
        data = data["data"];
        let allCalsData = [];
        let answeredData = [];
        let noAnsweredData = [];
        let bussy = [];
        let performanceData = [];
        let timesData = [];
        let avgTimesData = [];
        let avgAll = [];

        this.mainLabels = [];
        for (let index in data) {
          let itemChartData = data[index]["data"];
          this.mainLabels.push(data[index]["name"]);

          allCalsData.push(itemChartData["all"]);

          answeredData.push(itemChartData["answer"]);
          noAnsweredData.push(itemChartData["noanswer"]);
          bussy.push(itemChartData["busy"]);

          performanceData.push(itemChartData["performane"]);

          timesData.push(itemChartData["time"]);
          avgTimesData.push(itemChartData["avg"]);
          avgAll.push(itemChartData["avgall"]);
        }

        this.allCallsData = [{ data: allCalsData, label: "تعداد کل تماس ها" }];

        this.callsDetailsData = [
          { data: answeredData, label: "تعداد تماس پاسخ داده شده" },
          { data: noAnsweredData, label: "تعداد تماس پاسخ داده نشده" },
          { data: bussy, label: "تعداد تماس های مشغول" }
        ];

        this.timesChartData = [{ data: timesData, label: "مدت زمان مکالمه" }];

        this.loadTimeLabels = true;
        this.timesAvgChartData = [
          { data: avgTimesData, label: "میانگین زمان هر بخش" },
          { data: avgAll, label: "میانگین زمان کل" }
        ];

        let allCalls =  { data: allCalsData, label: " تعداد کل تماس ها" };

        this.allCallsData = [allCalls];

        this.performanceChartData = [
          { data: performanceData, label: "عملکرد گروه(درصد)" }
        ];

        this.loadingData = false;
        this.initingData = false;
      },
      error => {
        this.loadingData = false;
        this.initingData = false;
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  onSelectDate() {
    this.getOneGroupData();
  }
}
