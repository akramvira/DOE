import { Component } from '@angular/core';
import { AuthenticationService }  from '../../_services/authentication.service'
import { AlertService }  from '../../_services/alert'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../_services/shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  userName = new FormControl('');
  password = new FormControl('');
  loading = false;
  submitted = false;
  returnUrl: string;
  loginMsg = '';


  constructor(
    /*private formBuilder: FormBuilder,*/
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {

    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }*/
  }


  ngOnInit() {

    this.authenticationService.isAuthenticated();
/*
    this.userName = new FormControl('');
    /!*this.userName.setValue('admin');*!/
    this.password = new FormControl('');
/!*    this.password.setValue('1234dd56');*!/

*/


    /*this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });*/

    // get return url from route parameters or default to '/'
    this.returnUrl = 'admin/dashboard';//this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return { username: this.userName , password: this.password} }

  submitForm() {

    if(this.userName.value && this.userName.value){
    this.submitted = true;
    // stop here if form is invalid
    /*if (this.loginForm.invalid) {
      return;
    }*/

    this.loading = true;
    this.authenticationService.login(this.userName.value/*.value*/, this.password.value/*.value*/)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.clear();
          this.toastr.success('ادمین عزیز، خوش آمدید!' , 'ورود موفق!');
          this.sharedService.setMinMaxDate();
          this.router.navigate(['/admin/dashboard']);
        },
        error => {
          if(error.error.error != '')
          this.toastr.error(error.error.error, 'پیغام سیستم');
          this.loading = false;
        });
  }
    else {

    }
  }
}
