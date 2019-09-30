import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers : [AuthenticationService]

})
export class ProfileComponent implements OnInit {

  dynamic: number = Math.floor(Math.random() * 100 + 1);
  type: string = 'success';
  max: number = 200;
  
  userData = new FormGroup({
    name: new FormControl('asdsdf'),
    email: new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }

}
