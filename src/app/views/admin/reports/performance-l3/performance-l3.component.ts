import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { debug } from "util";
import { WebService } from "./web.service";
import { SharedService } from '../../../../_services/shared.service';
import { DaterangeComponent } from '../_components/daterange/daterange.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-performance-l3",
  templateUrl: "./performance-l3.component.html",
  styleUrls: ["./performance-l3.component.scss"]
})
export class PerformanceL3Component implements OnInit {
  asDropdownSettings = {};
  officeDropdownSettings = {};
  lineDropdownSettings = {};
  @ViewChild('daterange') dateRange : DaterangeComponent;
  constructor(
    private webServ: WebService,
    private authServe: AuthenticationService,
    private sharedService :SharedService,
    private toaster: ToastrService
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


datePickerConfig = {};

initingData :boolean = false;
loadingData = false;
//--------------------------------

  selectedGroups: any = this.filters.value.selectedItems;
  showAnsweredCalls = true;
  showNoAnsweredCalls = true;
  showLineAllCalls = true;
  onSelectAll(item) {}
  onItemSelect(item) {
    this.offices = this.allSub1Data[item["id"]];
    this.filters.patchValue({
      selectedSub1: []
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
      idmain: (this.filters.value.selectedItems[0]&&this.filters.value.selectedItems[0]["id"])?
      this.filters.value.selectedItems[0]['id']: '',
      idsub: sub1.join(",")
    };

    this.webServ.getNumbers(data).subscribe(
      data => {
        this.lines = data["data"];
        this.filters.patchValue({
          selectedSub2 : []
        })
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
      limitSelection: 1,
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
          selectedItems: []
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
          selectedItems: [],
          selectedSub1: []
        });

        this.updateLines();
      },
      error => {
        this.authServe.handdleAuthErrors(error);
      }
    );
  }

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

    if (!filterData.selectedSub2.length) {
      this.toaster.warning('لطفا داخلی مورد نظر را انتخاب کنید.');
      return;
    }

    if (!(
      (filterData.selectedItems.length && filterData.selectedSub1.length)||
      (!filterData.selectedItems.length && !filterData.selectedSub1.length)
    )) {
      this.toaster.warning('لطفا معاونت و اداره را انتخاب کنید');
      return;
    }


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
      (filterData.from = this.dateRange.selectedDateFrom.value),
        (filterData.to = this.dateRange.selectedDateTo.value);
    }


    filterData.time = parseInt(filterData.time);
    this.loadingData=true;
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

  onSelectDate() {
    this.getOneGroupData();
  }

}
