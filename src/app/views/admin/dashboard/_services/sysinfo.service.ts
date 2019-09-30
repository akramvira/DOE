import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../../../../environments/environment";
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../../_services/authentication.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SysinfoService {

  constructor(private http:HttpClient,private authServ: AuthenticationService) {
  }

  // Uses http.get() to load data from a single API endpoint
  
  public getSysInfo() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + '/admin/dashboard',  options);
     
    
    // no token 400
    // expired 403
    // invalide 403
    // user nabashe 404
  }
}
