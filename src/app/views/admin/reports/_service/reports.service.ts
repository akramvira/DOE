import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { AuthenticationService } from "../../../../_services/authentication.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ReportsService {
  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {}

  public getExtensionsAndGroups() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/reports", options);
  }

  public getGroupPerformance(data) {
    let options = this.authServ.getRequestOpions();

    if (data.time != "choosely")
      return this.http.get(
        environment.apiUrl + "/admin/reports/group/" + data.time,
        options
      );
    else
      return this.http.post(
        environment.apiUrl + "/admin/reports/group/choosely",
        data,
        options
      );
  }

  public getCompareGroupsPeformance(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/reports/group/compare/chart/performance",
      options
    );

    if (data.time != "choosely")
    return this.http.get(
      environment.apiUrl + "/admin/reports/group/" + data.time,
      options
    );
  else
    return this.http.post(
      environment.apiUrl + "/admin/reports/group/choosely",
      data,
      options
    );
  }

  public getCompareGroupsCalls(data) {
    let options = this.authServ.getRequestOpions();

    return this.http.get(
      environment.apiUrl + "/admin/reports/group/compare/chart/calls",
      options
    );
  }

  public getGroupsCallsData(data) {
    let options = this.authServ.getRequestOpions();

    debugger;
    if (data.time != "choosely")
      return this.http.get(
        environment.apiUrl + "/admin/reports/group/" + data.time,
        options
      );
    else
      return this.http.post(
        environment.apiUrl + "/admin/reports/group/choosely",
        data,
        options
      );
  }

  public getGroupsPerformance(data) {
    let options = this.authServ.getRequestOpions();

    return this.http.post(
      environment.apiUrl + "/admin/reports/group/compare/chart/performance",
      data,
      options
    );
  }
  public getSystemPerformance() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/reports/system/performance",
      options
    );
  }
  public getGroupsBills(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/reports/bill/groups",
      data,
      options
    );
  }

  //calls details
  public getCallsDetails() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/reports/cdr", options);
  }
  public filterCallsDetails(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/reports/cdr",
      data,
      options
    );
  }

  //operator
  public getAllOperator() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/report/operators",
      options
    );
  }
  public getOperatorData(id) {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/report/operators/" + id,
      options
    );
  }
  public getOperatorPefrormance(id) {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/report/operators/performance/" + id,
      options
    );
  }

  public getOperatorPefrormanceWithDate(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl +
        "/admin/report/operators/performance/todate/" +
        data.id,
      data,
      options
    );
  }
  public getOperatorMonthlyPefrormance(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl +
        "/admin/report/operators/performance/month/" +
        data.id,
      options
    );
  }

  //queues
  public getQueuesData() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/reports/queues", options);
  }
  public getQueuesServicelevel() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/reports/queues/chart/servicelevel",
      options
    );
  }

  public getQueuesChartCalls() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/reports/queues/chart/calls",
      options
    );
  }

  public getQueuesCharTime() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(
      environment.apiUrl + "/admin/reports/queues/chart/time",
      options
    );
  }

  //groups performance

  //groups bills

  //lnes performance

  //lnes blls
}
