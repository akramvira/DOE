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
    let token = this.authServ.getLSToken();

    return this.http.get(environment.apiUrl + '/admin/setting',{params:{token:token}});
  }
  public setSettingsData(data){

    let options = this.authServ.getRequestOpions();
    return this.http.put<any>(`${environment.apiUrl}/admin/setting/save`, data ,options )
    .pipe(map(data => {
      console.log(data);
      return data;
    }));

      // .pipe(map(result => {

      //   console.log('return result', result);
      //   console.log(result);
        
      //   return result;
      // }));
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
    let token = this.authServ.getLSToken();
    return this.http.get(environment.apiUrl + '/admin/setting/license',{params:{token: token}});
  }
  public setLincenseData(data){
    let options = this.authServ.getRequestOpions(true);
    return this.http.post(environment.apiUrl + '/admin/setting/license',data, options);
  }



  public pingAmi(data){
    let options = this.authServ.getRequestOpions(true);
    return this.http.post(environment.apiUrl + '/admin/setting/license',data, options);
  }


}
