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

  minDate = moment("1398/01/01", "jYYYY/jMM/jDD").locale('fa');
  maxDate = moment("1398/01/01", "jYYYY/jMM/jDD").locale('fa');
  selectedDateFrom = new FormControl("1398/01/01");
  selectedDateTo = new FormControl("1398/01/01");

  datePickerConfig = {};
  
  ngOnInit() {
    this.setDate();
  }

  
  setDate() {
    if (this.sharedService.minMaxTime.value) {
      this.minDate = moment(this.sharedService.minMaxTime.value.min, "jYYYY,jMM,jDD").locale('fa');
      this.maxDate = moment(this.sharedService.minMaxTime.value.max, "jYYYY,jMM,jDD").locale('fa');

      this.selectedDateFrom.setValue(this.sharedService.minMaxTime.value.min);
      this.selectedDateTo.setValue(this.sharedService.minMaxTime.value.max);

      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.sharedService.minMaxTime.value.min, "jYYYY/jMM/jDD").locale('fa'),
        max: moment(this.sharedService.minMaxTime.value.max, "jYYYY/jMM/jDD").locale('fa'),
        showGoToCurrent: true,
        hideOnOutsideClick: true,
        showNearMonthDays: true
      };
    }

    this.sharedService.minMaxTime.subscribe(data => {
      this.minDate = moment(data["min"], "jYYYY/jMM/jDD").locale('fa');
      this.maxDate = moment(data["max"], "jYYYY/jMM/jDD").locale('fa');

      this.selectedDateFrom.setValue(data["min"]);
      this.selectedDateTo.setValue(data["min"]);
      this.datePickerConfig = {
        format: "jYYYY/MM/DD",
        theme: "dp-material",
        min: moment(this.minDate, "jYYYY/jMM/jDD").locale('fa'),
        max: moment(this.maxDate, "jYYYY/jMM/jDD").locale('fa'),
        showGoToCurrent: true,
        hideOnOutsideClick: true,
        showNearMonthDays: true
      };
    });
  }

  
 

  onSelectDate(){
    this.onSelect.emit(this.selectedDateFrom.value, this.selectedDateTo.value);
  }

}
