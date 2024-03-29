import { Injectable } from '@angular/core';
import {  environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../../../_services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http:HttpClient,
    private authServ :AuthenticationService
    ) { }

  public getSettingsdata(){
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/setting',options );
  }
  public getOtherData(){
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/setting/otherdata',options );
  }

  public setOtherData(data){

    let options = this.authServ.getRequestOpions();
    return this.http.post<any>(`${environment.apiUrl}/admin/setting/otherdata`, data ,options )
    .pipe(map(data => {
      console.log(data);
      return data;
    }));
  }

  public setSettingsData(data){

    let options = this.authServ.getRequestOpions();
    return this.http.post<any>(`${environment.apiUrl}/admin/setting/save`, data ,options )
    .pipe(map(data => {
      console.log(data);
      return data;
    }));
  }

  public updateType(data){
    
    let options = this.authServ.getRequestOpions();
    return this.http.post<any>(`${environment.apiUrl}/admin/setting/type`, data, options )
      .pipe(map(result => {
        if (result) {
          console.log(result);
        }
        return result;
      }));
  }


  public setSettingsRouteData(data){
    let options = this.authServ.getRequestOpions();
    return this.http.post<any>(`${environment.apiUrl}/admin/setting/route/save`, data, options )
      .pipe(map(result => {
        if (result) {
          console.log(result);
        }
        return result;
      }));
  }



  public getLincenseData(){
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/setting/license', options);
  }

  public getBillsData(){
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/setting/bill', options);
  }
  public setBillsData(data){
    let options = this.authServ.getRequestOpions();
    return this.http.post(environment.apiUrl + '/admin/setting/bill',data, options);
  }

  public setLincenseData(data){
    let options = this.authServ.getRequestOpions(true);
    return this.http.post(environment.apiUrl + '/admin/setting/license',data, options);
  }



  public pingAmi(data){
    let options = this.authServ.getRequestOpions(true);
    return this.http.post(environment.apiUrl + '/admin/setting/connection',data, options);
  }


  public uploadfile(data, filetype ) {
  
    let options = this.authServ.getRequestOpions(true);
    options['reportProgress'] = true;
    options['observe'] =  'events';

    if(filetype == 0)
    return this.http.post(environment.apiUrl + '/admin/setting/uploadfile',data, options);
    else 
    return this.http.post(environment.apiUrl + '/admin/setting/queuefile',data, options);

  }

  public removeLastFileData(){
    let options = this.authServ.getRequestOpions(true);
    return this.http.get(environment.apiUrl + '/admin/setting/deleteall', options);
  }

  public removeLastQFileData(){
    let options = this.authServ.getRequestOpions(true);
    return this.http.get(environment.apiUrl + '/admin/setting/deletequeue', options);
  }


}
