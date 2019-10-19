import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'events';
import * as moment from "jalali-moment";
import { FormControl } from '@angular/forms';
import { SharedService } from '../../../../../_services/shared.service';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {

  constructor(
    private sharedService :SharedService
  ) { }

  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  minDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  maxDate = moment("1398/06/20", "jYYYY,jMM,jDD");
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");

  datePickerConfig = {};
  
  ngOnInit() {
    this.setDate();
  }

  
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

  
  @Input() onSelect : EventEmitter = new EventEmitter();

  onSelectDate(){
    this.onSelect.emit(this.selectedDateFrom.value, this.selectedDateTo.value);
  }

}
