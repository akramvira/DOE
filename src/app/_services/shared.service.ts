import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  public minMaxTime: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {
    this.minMaxTime = new BehaviorSubject<any>({
      min:'1397/01/01',
      max:'1399/01/01'
    });
  }

  setMinMaxDate() {
 
    let token = this.authServ.getLSToken();
    let headers = new HttpHeaders({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    });
   this.http.get(environment.apiUrl + "/admin/reports/date", {
      headers: headers
    }).subscribe(
      data=>{
        this.minMaxTime.next(data['data']);
      },
      error=>{
        this.authServ.handdleAuthErrors(error);
      }
    )
  }


}
