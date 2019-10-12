import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spintick',
  templateUrl: './spintick.component.html',
  styleUrls: ['./spintick.component.scss']
})
export class SpintickComponent implements OnInit {

  constructor() { }
@Input() showSpinner = false;
@Input() showTick = true;
  ngOnInit() {
    
  }

}
