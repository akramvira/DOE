import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UsersService } from "../../user-management/_services/users.service";
import { ReportsService } from "../_service/reports.service";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { FormControl } from "@angular/forms";
import * as moment from "jalali-moment";
import { DaterangeComponent } from "../_components/daterange/daterange.component";
import { WebService } from "./web.service";

@Component({
  selector: "app-queues",
  templateUrl: "./queues.component.html",
  styleUrls: ["./queues.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class QueuesComponent implements OnInit {
  page = new Page();
  //rows = new Array<CorporateEmployee>();

  public timesBarChartData: any[] = [
    { data: [], label: "" },
    { data: [], label: "" }
  ];
  public callsBarChartData: any[] = [
    { data: [], label: "" },
    { data: [], label: "" },
    { data: [], label: "" }
  ];
  public serviceLevelbarChartData: any[] = [{ data: [], label: "" }];

  queueData: any[];
  storedData: any = [];

  constructor(
    private reportServ: WebService,
    private authServ: AuthenticationService,
    private toastr: ToastrService
  ) {}

  queueId = new FormControl();
  chartCallsData: any;
  chartTimeData: any;
  chartServiceLevelData: any;
  @ViewChild("daterange") daterange: DaterangeComponent;

  mainLabels = [];

  ngOnInit() {
    this.getGeneralChartData();
  }
  @ViewChild("queuesTable") table: any;

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  filterData() {
    this.filter.from = this.selectedDateFrom.value;
    this.filter.to = this.selectedDateTo.value;

    // this.reportServ.filterCallsDetails(this.filter).subscribe(
    //   (data)=>{
    //   this.showData(data);
    //   },
    //   (error)=>{});
  }

  onDetailToggle(event) {}
  //pagination

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset + 1;

    this.filterData();
    //this.page.size= pageInfo[''];
    // this.page.totalElements=100;
    // this.page.totalPages=10;

    //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
    //this.page = {size:2,};//pagedData.page;
    //this.users = 4;//pagedData.data;
    // });
  }

  @ViewChild(DatatableComponent) myTable: DatatableComponent;
  tempData: any = [];
  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("");
  selectedDateTo = new FormControl("");
  disposition = new FormControl("all");
  src = new FormControl("");
  dest = new FormControl("");

  datePickerConfig = {
    format: "jYYYY/MM/DD",
    theme: "dp-material",
    unSelectOnClick: true,
    showGoToCurrent: true,
    drops: "left"
  };

  filter = {
    from: this.selectedDateFrom.value,
    to: this.selectedDateTo.value,
    dst: "",
    src: "",
    disposition: ""
  };
  FilterData(event) {
    this.tempData = JSON.parse(JSON.stringify(this.storedData));
    let columnName = event.currentTarget.id;

    const val = event.target.value.toLowerCase();

    this.filter[columnName] = val;

    this.filterData();
  }

  onSelectDate() {
    this.filterData();
  }

  get getData() {
    return this.storedData;
  }

  set setData(filteredData) {
    this.queueData = filteredData;
  }

  getGeneralChartData() {
    let data = {
      from: this.daterange.selectedDateFrom.value,
      to: this.daterange.selectedDateTo.value
    };

    this.mainLabels = [];
    let labels = [];
    for (let i in this.queueData) {
      labels.push(this.queueData[i]["name"]);
    }
    this.mainLabels = labels;

    this.reportServ.gerChartsData(data).subscribe(
      data => {
        data = data["data"];

        let noanswer = [];
        let answer = [];
        let busy = [];
        let performance = [];
        let time = [];
        let ringTime = [];

        let arrayData = [];

        this.mainLabels = [];
        for (let i in data) {
          this.queueId.setValue(data[i]["id"]);

          this.mainLabels.push(data[i]["name"]);

          arrayData.push({
            id: data[i]["id"],
            name: data[i]["name"],
            ...data[i]["data"],
            agents: data[i]["agents"]
          });

          noanswer.push(data[i]["data"]["noanswer"]);
          answer.push(data[i]["data"]["answer"]);
          busy.push(data[i]["data"]["busy"]);
          performance.push(data[i]["data"]["performance"]);
          time.push(data[i]["data"]["time"]);
          ringTime.push(data[i]["data"]["ringTime"]);
        }

        this.queueData = arrayData;
        //this.setPage(data);

        //time chart-----------------------------------
        this.timesBarChartData = [];
        this.timesBarChartData = [
          { data: ringTime, label: "مدت زمان انتظار" },
          { data: time, label: "مدت زمان مکالمه" }
        ];

        //answer no answer data--------------------
        this.callsBarChartData = [
          { data: answer, label: "تعداد تماس های پاسخ داده شده" },
          { data: noanswer, label: "تعداد تماس های پاسخ داده نشده" },
          { data: busy, label: "تعداد تماس های مشغول" }
        ];

        //---performance----------------------------------
        this.serviceLevelbarChartData = [
          { data: performance, label: "درصد سرویس دهی" }
        ];
      },
      error => {
        this.authServ.handdleAuthErrors(error);
      }
    );
  }

  detailsLabels = [];
  timesBarChartDataDetails: any[] = [
    { data: [], label: "" },
    { data: [], label: "" }
  ];
  callsBarChartDataDetails: any[] = [
    { data: [], label: "" },
    { data: [], label: "" },
    { data: [], label: "" }
  ];
  serviceLevelbarChartDataDetails: any[] = [{ data: [], label: "" }];
  //--------------details chart -------------

  @ViewChild("daterangeDetailsChart") daterangeDetailsChart: DaterangeComponent;

  submitDetailedChartsFilter() {
    let data = {
      from: this.filter.from = this.daterangeDetailsChart.selectedDateFrom.value,
      to: this.filter.to = this.daterangeDetailsChart.selectedDateTo.value,
      id: this.queueId.value,
      time: -1
    };

    this.detailsLabels = [];
    let labels = [];

    let itemSelected = this.queueData.forEach(item => {
      if (item.id == this.queueId.value) labels.push(item["name"]);
    });
    
    if (labels.length) 
    this.detailsLabels = labels[0];
    else this.detailsLabels = [];

    this.reportServ.gerChartsDetailsData(data).subscribe(
      data => {
        data = data["data"];

        let noanswer = [];
        let answer = [];
        let busy = [];
        let performance = [];
        let time = [];
        let ringTime = [];

        let arrayData = [];

        this.detailsLabels = [];

        for (let i in data) {
          this.detailsLabels.push(data[i]["name"]);

          arrayData.push({
            id: data[i]["id"],
            name: data[i]["name"],
            ...data[i]["data"],
            agents: data[i]["agents"]
          });

          noanswer.push(data[i]["data"]["noanswer"]);
          answer.push(data[i]["data"]["answer"]);
          busy.push(data[i]["data"]["busy"]);
          performance.push(data[i]["data"]["performance"]);
          time.push(data[i]["data"]["time"]);
          ringTime.push(data[i]["data"]["ringTime"]);
        }

        //console.log(detailsLabels);

        //this.queueData = arrayData;
        //this.setPage(data);

        //time chart-----------------------------------
        this.timesBarChartDataDetails = [];
        this.timesBarChartDataDetails = [
          { data: ringTime, label: "مدت زمان انتظار" },
          { data: time, label: "مدت زمان مکالمه" }
        ];

        //answer no answer data--------------------
        this.callsBarChartDataDetails = [
          { data: answer, label: "تعداد تماس های پاسخ داده شده" },
          { data: noanswer, label: "تعداد تماس های پاسخ داده نشده" },
          { data: busy, label: "تعداد تماس های مشغول" }
        ];

        //---performance----------------------------------
        this.serviceLevelbarChartDataDetails = [
          { data: performance, label: "درصد سرویس دهی" }
        ];
      },
      error => {
        this.authServ.handdleAuthErrors(error);
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
