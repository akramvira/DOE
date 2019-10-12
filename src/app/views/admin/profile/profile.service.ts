import { Injectable } from '@angular/core';
import {  environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../../_services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,
    private authServ :AuthenticationService
    ) { }

  public getProfiledata(){
    debugger;
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/profile',options );
  }
  public setProfileData(data){

    let options = this.authServ.getRequestOpions();
    return this.http.post<any>(`${environment.apiUrl}/admin/profile`, data ,options )
    .pipe(map(data => {
      console.log(data);
      return data;
    }));
  }

}
