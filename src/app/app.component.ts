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
import { AuthenticationService } from './_services/authentication.service';
import { SharedService } from './_services/shared.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private authServ : AuthenticationService,
    private sharedService: SharedService) { }
  loading  = false;
  ngOnInit() {
  
    this.sharedService.setMinMaxDate();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }


  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.loading = true

    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }


}
