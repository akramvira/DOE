import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../_services/auth-guard.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    private authGr : AuthGuardService
  ) { }
  loading = false;
  ngOnInit() {

    
  }

}
