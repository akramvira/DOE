import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ReportsService } from "../_service/reports.service";
import * as moment from "jalali-moment";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { WebService } from "./web.service";
import { SharedService } from "../../../../_services/shared.service";
import { SelectItemComponent } from '../_components/select-item/select-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-groups-bills",
  templateUrl: "./groups-bills.component.html",
  styleUrls: ["./groups-bills.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GroupsBillsComponent implements OnInit {
 
  bills: any;
  page = new Page();
  printDateTo;
  printDateFrom;
  @ViewChild('selectItem') selectItem : SelectItemComponent;

  constructor(
    private reportsServ: ReportsService,
    private authService: AuthenticationService,
    private webSerice: WebService,
    private sharedService: SharedService,
    private toaster : ToastrService
  ) {}

  ngOnInit() {
    this.setDate();
    
  }
  onActivate(event) {}

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    this.page.size = 10;
    this.page.totalElements = 100;
    this.page.totalPages = 10;

    //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
    //this.page = {size:2,};//pagedData.page;
    //this.users = 4;//pagedData.data;
    // });
  }


  //------date
  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");
  time = new FormControl(-1);

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

  @ViewChild("billsTable") table: any;
  toggleExpandGroup(group) {
    console.log("Toggled Expand Group!", group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  setActiveRow() {}

  loadingData = false;

  getBillsData() {
  
    let filterData = {};
    
    filterData["time"] = this.time.value;
    filterData["from"] = this.selectedDateFrom.value || '';
    filterData["to"] = this.selectedDateTo.value || '';

    let selectedItem = this.selectItem.getSelectedValue();
  
    if (this.time.value == "-1") {
      filterData['from'] = this.selectedDateFrom.value;
      filterData['to'] = this.selectedDateTo.value;
    }
    if(!selectedItem)
      this.toaster.warning('مورد اول مقایسه انتخاب نشده است');
    
      
    filterData['level']= selectedItem['level'];
    filterData['idmain']= selectedItem['id'];
    filterData['idsub'] =selectedItem['idSub'];
    filterData['idnumber'] =selectedItem['idnumber'];

    this.loadingData = true;
   
 
    this.webSerice.getBills(filterData).subscribe(
      data => {
      
        data = data['data'];
        let dataCount = 0;

        let billsData = new Array();
        this.printDateTo= data['to'];
        this.printDateFrom= data['from'];
        
        for (var i in data) {
          //      
         // if (i == "all") continue;
         // data["groupId"] = i;

         if(i == 'from' || i == 'to') continue;
         dataCount++;
         let itemData = [];
         itemData['id']= data[i]['id'];
         itemData['name']=data[i]['name'];
         itemData['abonmah']=data[i]['data']['abonmah'];
         itemData['betweanco']=data[i]['data']['betweanco'];
         itemData['co']=data[i]['data']['co'];
         itemData['mobile']=data[i]['data']['mobile'];
         itemData['sum']=data[i]['data']['sum'];
         billsData.push(itemData);

        }

        
        this.bills = billsData;

        this.page.pageNumber = 0;
        this.page.size = 20;

        this.setPage({ offset: 0 });

        this.page.pageNumber = 1;
        this.page.size = 10;
        this.page.totalElements = dataCount;
        this.page.totalPages = 10;
        this.loadingData = false;
      },
      error => {
        this.loadingData = false;
        this.authService.handdleAuthErrors(error);
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
