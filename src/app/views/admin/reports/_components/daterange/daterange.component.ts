import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import * as moment from "jalali-moment";
import { FormControl } from '@angular/forms';
import { SharedService } from '../../../../../_services/shared.service';
import { DatePickerComponent } from 'ng2-jalali-date-picker';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {

  constructor(
    private sharedService :SharedService
  ) { }

  @ViewChild('dateFrom') dateFrom: DatePickerComponent;
  @Input() onSelect : EventEmitter = new EventEmitter();

  minDate ;
  maxDate ;
  selectedDateFrom = new FormControl("");
  selectedDateTo = new FormControl("");

  datePickerConfig = {};
  
  ngOnInit() {
    this.setDate();
  }

  
  setDate() {
    // if (this.sharedService.minMaxTime.value) {
    //   this.setMinMax(this.sharedService.minMaxTime, this.sharedService.minMaxTime);
    // }

    
    this.sharedService.minMaxTime.subscribe(data => {
     // debugger;
      this.setMinMax(data["min"], data["max"]);
    });


    //debugger;
  }

  
 
  setMinMax(min, max){
    debugger;
    this.minDate =  moment(min, "jYYYY/jMM/jDD").locale('fa');
    this.maxDate =  moment(max, "jYYYY/jMM/jDD").locale('fa');

    this.selectedDateFrom.setValue(min);
    this.selectedDateTo.setValue(max);

    this.datePickerConfig = {
      format: "jYYYY/MM/DD",
      theme: "dp-material",
      min: this.minDate ,
      max:this.maxDate,
      showGoToCurrent: true,
      hideOnOutsideClick: true,
      showNearMonthDays: true
    };

  }

  onSelectDate(){
    this.onSelect.emit(this.selectedDateFrom.value, this.selectedDateTo.value);
  }

}
