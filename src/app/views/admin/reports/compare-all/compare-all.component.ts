import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";
import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";
import { SharedService } from "../../../../_services/shared.service";
import { SelectItemComponent } from './select-item/select-item.component';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-compare-all",
  templateUrl: "./compare-all.component.html",
  styleUrls: ["./compare-all.component.scss"]
})
export class CompareAllComponent implements OnInit {
  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService,
    private sharedService: SharedService,
    private toaster: ToastrService
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

  @ViewChild('select1') select1 : SelectItemComponent;
  @ViewChild('select2') select2 : SelectItemComponent;

  ngOnInit() {
    this.setDate();

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



 

  updateCharts() {
    this.getOneGroupData();
  }

  getOneGroupData() {
    let filterData = this.filters.getRawValue();
    let select1Value1 = this.select1.getSelectedValue();
    let select1Value2 = this.select2.getSelectedValue();

debugger;
    if (filterData.time == "-1") {
      filterData.from = this.selectedDateFrom.value;
      filterData.to = this.selectedDateTo.value;
    }
    if(!select1Value1 || !select1Value2){
      if(!select1Value1)
        this.toaster.warning('مورد اول مقایسه انتخاب نشده است');
      if(!select1Value2)
        this.toaster.warning('مورد دوم مقایسه انتخاب نشده است');
      return;
    }

  
    filterData['level1']= select1Value1['level'];
    filterData['idmain1']= select1Value1['id'];
    filterData['idsub1'] =select1Value1['idSub'];
    filterData['idnumber1'] =select1Value2['idnumber'];

    filterData['level2']= select1Value2['level'];
    filterData['idmain2']= select1Value2['id'];
    filterData['idsub2'] =select1Value2['idSub'];
    filterData['idnumber2'] =select1Value2['idnumber'];

    
    this.mainLabels =[select1Value1['label'],select1Value2['label']];


    filterData.time = parseInt(filterData.time);
    this.loadingData = true;

    console.log(filterData);
    
   

   
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


        for (let index in data) {
          let itemChartData = data[index]["data"];
       //   this.mainLabels.push(data[index]["name"]);

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
    this.getOneGroupData();
  }
}
