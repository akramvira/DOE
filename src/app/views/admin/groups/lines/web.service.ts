import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient, private authServ : AuthenticationService) { }

  public getAllGroups() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/groups/extensions',  options);
  }
  
  public removeGroup(groupId){
    let options = this.authServ.getRequestOpions();
    return this.http.delete(environment.apiUrl + '/admin/groups/extensions/'+groupId,  options);
  }
  public addGroup(data){
    let options = this.authServ.getRequestOpions();
    return this.http.post(environment.apiUrl + '/admin/groups/extensions', data,  options);
  }

  public updateGroup(data){
    let options = this.authServ.getRequestOpions();
    return this.http.put(environment.apiUrl + '/admin/groups/extensions/'+data['id'], data,  options);
  }
  
  public deleteGroup(id){
    let options = this.authServ.getRequestOpions();
    return this.http.delete(environment.apiUrl + '/admin/groups/extensions/'+id,  options);
  }
  





}

