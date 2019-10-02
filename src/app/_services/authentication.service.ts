import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';

import { environment } from '../../environments/environment';
import {reflectTypeEntityToDeclaration} from "@angular/compiler-cli/src/ngtsc/metadata";
import { Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService  {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public menues :any;

  constructor(private http: HttpClient, private router: Router, private toaster :ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>({token : localStorage.getItem('currentUser')});
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }
  public currentUserType(){
    return 'admin';
  }

  login(username: string, password: string) {

    return this.http.post<any>(`${environment.apiUrl}/login`, { username: username, password: password } )
      .pipe(map(user => {
        console.log(user);
        user = user.data;;
        if (user.token) {
          localStorage.setItem('userToken', user.token);
          this.currentUserSubject.next(user.token);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out

    let options = this.getRequestOpions();

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);

    return this.http.post<any>( environment.apiUrl + '/logout',{}, options);
  }

  public isAuthenticated(){
    let options = this.getRequestOpions();

    return this.http.get( environment.apiUrl + '/login',options);
  }

  public getUserData(){
    let options = this.getRequestOpions();
    return this.http.get( environment.apiUrl + '/admin/userdata', options );
  }
  public saveUserData(data){
    return this.http.post<any>(`${environment.apiUrl}/userdata`, { } )
    .pipe(map(user => {
      user = user.data;
      if (user.token) {
        localStorage.setItem('userToken', user.token);
        this.currentUserSubject.next(user.token);
      }
      return user;
    }));
  }


  public getLSToken(){
   return localStorage.getItem('userToken') || null;
  }

  public getUserMenues(){
    let userToken = this.getLSToken();
    let option = this.getRequestOpions();
    return this.http.get( environment.apiUrl + '/admin/menu',option); 
    
  }

  public getRequestOpions(hasFile = false){
    
    let token = this.getLSToken();
    let headers :any;

    if(hasFile){
       headers = new HttpHeaders({
      'Authorization': 'Bearer '+ token
    });
    }
   
    else {
       headers = new HttpHeaders({
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json' 
    });
    }
    
      
    return  { headers: headers };
  }


  public handdleAuthErrors(error) {
    // 401 is login but no access to  resource
    // expired 401
    
    console.log('status:',error['status'])
    if(error['status'] >= 401 && error['status'] < 404 ){
      //user in not authorized
      this.toaster.clear();
      // this.toaster.error('شما از سیستم خارج شدید.');
      // console.log('شما از سیستم خارج شدید.');
      this.logout();
    }
    else if(error['status'] == 500){
      this.toaster.clear();
      this.router.navigate(['500']);
    }
    else if(error['status'] == 422){
      this.toaster.clear();
      this.toaster.warning('اطلاعات ارسالی صحیح نمی باشد');
    }
    else if(error['status'] == 404){
      this.toaster.clear();
      this.toaster.success('این بخش در ورژن های بعدی ارائه خواهد شد...');
    }

    
  }

}
