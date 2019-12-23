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
  //queues
  public getQueuesData() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/reports/queues/all", options);
  }
  public gerChartsData(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/reports/queues/charts",
      data,
      options
    );
  }
  public gerChartsDetailsData(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/reports/queues/charts/agents",
      data,
      options
    );
  }

 


}
