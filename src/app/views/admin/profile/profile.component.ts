import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';

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
    name: new FormControl(''),
    phone: new FormControl(''),
    img: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  constructor(
    private profileService : ProfileService,
    private authServe :AuthenticationService,
    private toaster : ToastrService
  ) { }

  ngOnInit() {
    this.profileService.getProfiledata().subscribe(
      data=>{
        this.userData.patchValue(data['data']);
        
      }
    )
  }
  submiting = false;
  onSubmitForm(){
    this.submiting = true;
    debugger;
    let data = this.userData.getRawValue();
    this.profileService.setProfileData(data).subscribe(
      data=>{
      this.toaster.success('اطلاعات با موفقیت تغییر یافت.');
        this.submiting = false;;
      },
      error=>{
        this.submiting = false;;
        
        this.authServe.handdleAuthErrors(error);

      }
    )

  }

}
