import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";
import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../_services/shared.service';
@Component({
  selector: "app-performance-l1",
  templateUrl: "./performance-l1.component.html",
  styleUrls: ["./performance-l1.component.scss"]
})
export class PerformanceL1Component implements OnInit {
  dropdownSettings = {};

  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService,
    private toaster : ToastrService,
    private sharedService :SharedService
  ) {}
  groups = new Array();
  filters = new FormGroup({
    time: new FormControl(0),
    type: new FormControl(0),
    inorout: new FormControl("in"),
    disposition: new FormControl(0),
    selectedItems: new FormControl([])
  });

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
    },
  ];

  mainLabels = [];
  public performanceChartLabels: string[] = this.mainLabels;
  public performanceChartData: any[] = [{data:[],label:''}];

  public callsBarChartLabels: string[] = this.mainLabels;
  public callsDetailsData: any[] =[{data:[],label:''},{data:[],label:''},{data:[],label:''}];

  public timesChartLabels: string[] = this.mainLabels;
  public timesChartData: any[] =[{data:[],label:''}];
  public timesAvgChartData: any[] = [{data:[],label:''},{data:[],label:''}];
  loadTimeLabels = false;

  public allCallsData: Array<any> = [{data:[],label:''}];
  public lineChartLabels: Array<any> = this.mainLabels;

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");

  datePickerConfig = {};

  initingData :boolean = false;
  loadingData = false;
  //--------------------------------

  setDate(){
    if(this.sharedService.minMaxTime.value){
      this.minDate =this.sharedService.minMaxTime.value.min;
      this.maxDate =this.sharedService.minMaxTime.value.max;

      this.selectedDateFrom.setValue(this.minDate);
      this.selectedDateTo.setValue(this.maxDate);
      
      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.minDate, "jYYYY,jMM,jDD"),
        max: moment(this.maxDate, "jYYYY,jMM,jDD"),
        showGoToCurrent :true,
        hideOnOutsideClick : true,
        showNearMonthDays:true
      };

    }

    this.sharedService.minMaxTime.subscribe(
      data=>{
        this.minDate =data['min'];
        this.maxDate =data['max'];

        this.selectedDateFrom.setValue(this.minDate);
        this.selectedDateTo.setValue(this.maxDate);
        this.datePickerConfig = {
          format: "jYYYY/MM/DD",
          theme: "dp-material",
          min: moment(this.minDate, "jYYYY,jMM,jDD"),
          max: moment(this.maxDate, "jYYYY,jMM,jDD"),
          showGoToCurrent :true,
          hideOnOutsideClick : true,
          showNearMonthDays:true
        };

      }
    );
  }
  ngOnInit() {
    
    this.setDate();

    this.initingData = true;
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
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

        let groupesData = new Array();
        for (var i in data) {
          groupesData.push({
            item_id: data[i]["id"],
            item_text: data[i]["name"]
          });
        }
        this.groups = groupesData;

        this.filters.patchValue({
          selectedItems: []
        });

        let labels = [];
        for (let index in this.filters.value.selectedItems) {
          labels.push(this.filters.value.selectedItems[index]["item_text"]);
        }
        this.mainLabels = labels;
       // this.updateCharts();
        this.initingData = false;
        this.toaster.warning('لطفا جهت نمایش آمار، ابتدا فیلتر مورد نظر را انتخاب کرده و روی دکمه فیلتر کلیک کنید.', 'پیغام سیستم');
      },
      error => {
        this.initingData = false;
        this.toaster.warning('لطفا جهت نمایش آمار، ابتدا فیلتر مورد نظر را انتخاب کرده و روی دکمه فیلتر کلیک کنید.', 'پیغام سیستم');
        this.authServe.handdleAuthErrors(error);
      }
    );
    
  
  }

  activeFilter(event) {
    let elem = event.target.element;

    this.filters.value.time;
  }

 
  selectedGroups: any = this.filters.value.selectedItems;
  showAnsweredCalls = true;
  showNoAnsweredCalls = true;
  showLineAllCalls = true;


  onSelectAll(item) {}
  onItemSelect(item) {

    let labels = [];
    for (let index in this.filters.value.selectedItems) {
      labels.push(this.filters.value.selectedItems[index]["item_text"]);
    }
    this.mainLabels = labels;
    //this.updateCharts();
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

   // this.updateCharts();
  }

  updateCharts() {
    let filterData = this.filters.getRawValue();
    this.lineChartLabels = this.mainLabels;
    this.callsBarChartLabels = this.mainLabels;
    this.performanceChartLabels = this.mainLabels;
  
    this.getChartsData(filterData);
  }

  getChartsData(filterData) {
    filterData["id"] = [];

    if (filterData.selectedItems.length == 0) return;
    for (let item in filterData.selectedItems) {
      filterData["id"].push(filterData.selectedItems[item]["item_id"]);
    }

    filterData["id"] = filterData["id"].join(",");
    if (filterData.time == "-1") {
      (filterData.from = this.selectedDateFrom.value),
        (filterData.to = this.selectedDateTo.value);
    }

    if(!filterData["id"]) {
      this.toaster.warning('لطفا یک معاونت انتخاب کنید.');
      return;
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

        this.timesChartData = [
          { data: timesData, label: "مدت زمان مکالمه" }
        ];

       
      
        this.loadTimeLabels =true;
        this.timesAvgChartData = [
          { data: avgTimesData, label: "میانگین زمان هر بخش" },
          { data: avgAll, label: "میانگین زمان کل" }
        ];

        console.log(this.timesAvgChartData);

        let allCalls = this.showLineAllCalls
          ? { data: allCalsData, label: " تعداد کل تماس ها" }
          : { data: [], label: " تعداد کل تماس ها" };

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

  resetCharts(){
    this.allCallsData = [{ data: [], label: "تعداد کل تماس ها" }];

    this.callsDetailsData = [
      { data: [], label: "تعداد تماس پاسخ داده شده" },
      { data: [], label: "تعداد تماس پاسخ داده نشده" },
      { data: [], label: "تعداد تماس های مشغول" }
    ];

    this.timesChartData = [{ data: [], label: "مدت زمان مکالمه" }];

    this.loadTimeLabels = true;
    this.timesAvgChartData = [
      { data: [], label: "میانگین زمان هر بخش" },
      { data: [], label: "میانگین زمان کل" }
    ];

    let allCalls =  { data: [], label: " تعداد کل تماس ها" };

    this.allCallsData = [allCalls];

    this.performanceChartData = [
      { data: [], label: "عملکرد گروه(درصد)" }
    ];
  }
  onSelectDate() {
    this.getChartsData(this.filters.getRawValue());
  }
}
