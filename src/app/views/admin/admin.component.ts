import { Component, OnInit } from '@angular/core';

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { AuthenticationService } from '../../_services/authentication.service';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'

})
export class AdminComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit() {
  }

}
