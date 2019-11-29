import { Component, OnInit, ViewEncapsulation, ContentChild, ViewChild } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";
import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../_services/shared.service';
import { IDate, IDatePickerConfig, DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatepickerModule } from 'ngx-bootstrap';
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
    time: new FormControl(-1),
    type: new FormControl(0),
    inorout: new FormControl("in"),
    disposition: new FormControl(0),
    selectedItems: new FormControl([])
  });

  ////--------Charts And shared data Section------------------
  public performanceBarChartColors = [
    {
      backgroundColor: "#4dbd74"
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
      backgroundColor: "rgba(255, 161, 181, 0.2)",
      borderColor: "rgba(255, 161, 181, 0.9)",
      pointBackgroundColor: "rgba(255, 161, 181, 0.4)",
      pointBorderColor: "rgba(255, 161, 181, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 161, 181, 0.4)",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
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

  datePickerConfig :IDatePickerConfig = {
      format: "jYYYY/MM/DD",
      //theme: "dp-material",
      min: moment(this.minDate, "jYYYY,jMM,jDD"),
      max: moment(this.maxDate, "jYYYY,jMM,jDD"),
      showGoToCurrent :true,
      hideOnOutsideClick : true,
      showNearMonthDays:true,
      drops: "down"
  };

  initingData :boolean = false;
  loadingData = false;
  //--------------------------------

  @ViewChild('dateFrom') dateFrom: DatePickerComponent;
  @ViewChild('dateTo') dateTo: DatePickerComponent;

  setDate(){
    if(this.sharedService.minMaxTime.value){
      this.minDate =  moment('1398/06/20', 'jYYYY/jMM/jDD').locale('fa');

      // console.log('datL',this.dateFrom.api);
      // console.log('conf', this.datePickerConfig);
      // this.selectedDateFrom.setValue(this.minDate);
      // //this.dateFrom.api.moveCalendarTo(this.minDate);
      // this.dateFrom.api.open();

      //return;
      this.minDate =this.sharedService.minMaxTime.value.min;
      this.maxDate =this.sharedService.minMaxTime.value.max;

      
      //this.dateFrom.moveCalendarTo(this.minDate);
      //this.dateTo.moveCalendarTo(this.maxDate);


      this.selectedDateFrom.setValue(this.minDate);
      this.selectedDateTo.setValue(this.maxDate);
      
      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        //theme: "dp-material",
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
          //format: "jYYYY/MM/DD",
          //theme: "dp-material",
          min: moment(this.minDate, "jYYYY,jMM,jDD"),
          max: moment(this.maxDate, "jYYYY,jMM,jDD"),
          showGoToCurrent :true,
          hideOnOutsideClick : true,
          showNearMonthDays:true,
          drops: "down"
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

       
       // this.updateCharts();
        this.initingData = false;
        this.toaster.info('لطفا جهت نمایش آمار، ابتدا فیلتر مورد نظر را انتخاب کرده و روی دکمه فیلتر کلیک کنید.', 'پیغام سیستم');
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
    this.getChartsData();
  }

  getChartsData() {
    
    let filterData =  this.filters.getRawValue();;
    filterData["id"] = [];

    if (filterData.selectedItems.length == 0) {
      this.toaster.warning('لطفا حداقل یک معاونت انتخاب کنید.');
      return;
    }
    for (let item in filterData.selectedItems) {
      filterData["id"].push(filterData.selectedItems[item]["item_id"]);
    }

    filterData["id"] = filterData["id"].join(",");
    if (filterData.time == "-1") {
      (filterData.from = this.selectedDateFrom.value),
        (filterData.to = this.selectedDateTo.value);
    }

    if(!filterData["id"]) {
      this.toaster.warning('لطفا حداقل یک معاونت انتخاب کنید.');
      return;
    }
    filterData.time = parseInt(filterData.time);

    this.loadingData = true;

    this.setLabels();

    this.webServ.getGroupPerformance(filterData).subscribe(
      data => {
        this.resetCharts();
        
        data = data["data"];
        let allCalsData = [];
        let answeredData = [];
        let noAnsweredData = [];
        let bussy = [];
        let performanceData = [];
        let timesData = [];
        let avgTimesData = [];
        let avgAll = [];

        for (let index in data) {
          let itemChartData = data[index]["data"];

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


        let allCalls = this.showLineAllCalls
          ? { data: allCalsData, label: " تعداد کل تماس ها" }
          : { data: [], label: " تعداد کل تماس ها" };

        this.allCallsData = [allCalls];

        this.performanceChartData = [
          { data: performanceData, label: "عملکرد گروه(درصد)" }
        ];

       this.loadingData = false;

      },
      error => {
        this.loadingData = false;
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

  setLabels(){
    let labels = [];
    for (let index in this.filters.value.selectedItems) {
      labels.push(this.filters.value.selectedItems[index]["item_text"]);
    }
    this.mainLabels = labels;
  }
  resetCharts(){

    let emptyData = [];

    for(let i in this.mainLabels){
      emptyData.push(0);
    }

    this.allCallsData = [{ data: emptyData , label: "تعداد کل تماس ها" }];

    this.callsDetailsData = [
      { data: emptyData, label: "تعداد تماس پاسخ داده شده" },
      { data: emptyData, label: "تعداد تماس پاسخ داده نشده" },
      { data: emptyData, label: "تعداد تماس های مشغول" }
    ];

    this.timesChartData = [{ data: emptyData, label: "مدت زمان مکالمه" }];

    this.loadTimeLabels = true;
    this.timesAvgChartData = [
      { data: emptyData, label: "میانگین زمان هر بخش" },
      { data: emptyData, label: "میانگین زمان کل" }
    ];

    let allCalls =  { data: emptyData, label: " تعداد کل تماس ها" };

    this.allCallsData = [allCalls];

    this.performanceChartData = [
      { data: emptyData , label: "عملکرد گروه(درصد)" }
    ];





  }


  onSelectDate() {
    this.getChartsData();
  }
}
