import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { environment } from '../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebService  {
  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {}

  public getExtensionsAndGroups() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/reports/departments", options);
  }


  public getNumbers(data){
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/reports/departments/filteritems/getnumbers",
      data,
      options
    );
  }

}
