import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-column',
  inputs : ['id: columnName', 'text:filterText' ],
  templateUrl: './search-column.component.html',
  styleUrls: ['./search-column.component.scss']
})
export class SearchColumnComponent implements OnInit {
  id: string|null = null;
  text: string|null = null;
  constructor() { 

  }

  ngOnInit() {
    
  }

  FilterData(event) {
    debugger;
  // this.tempData = JSON.parse(JSON.stringify(this.storedData));
  // let columnName = event.currentTarget.id;
  // const val = event.target.value.toLowerCase();
  // const filteredData = this.tempData.filter(function(d) {
  // return d[columnName].toLowerCase().indexOf(val) !== -1 || !val;
  // });
  // this.data= filteredData;
  // this.myTable.offset = 0;
  }

}
