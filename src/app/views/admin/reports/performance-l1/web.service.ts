import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebService {
  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {}

  public getExtensionsAndGroups() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/reports/departments", options);
  }

  public getGroupPerformance(data) {
    let options = this.authServ.getRequestOpions();
      return this.http.post(
        environment.apiUrl + "/admin/reports/chart/maingroup/filters",
        data,
        options
      );
  
  }

}
