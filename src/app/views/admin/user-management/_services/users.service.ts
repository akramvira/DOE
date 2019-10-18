import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { AuthenticationService } from "../../../../_services/authentication.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {}

  public getAllUsers() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/users", options);
  }

  public addUser(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/users",
      data,
      options
    );
  }
  //roles
  public getAllRoles() {
    let options = this.authServ.getRequestOpions();
    return this.http.get(environment.apiUrl + "/admin/users/roles", options);
  }

  public removeRole(roleId) {
    let options = this.authServ.getRequestOpions();
    return this.http.delete(
      environment.apiUrl + "/admin/users/roles/" + roleId,
      options
    );
  }
  public addRole(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.post(
      environment.apiUrl + "/admin/users/roles",
      data,
      options
    );
  }

  public updateRole(data) {
    let options = this.authServ.getRequestOpions();
    return this.http.put(
      environment.apiUrl + "/admin/users/roles/" + data["id"],
      data,
      options
    );
  }

  public deleteRole(id) {
    let options = this.authServ.getRequestOpions();
    return this.http.delete(
      environment.apiUrl + "/admin/users/roles/" + id,
      options
    );
  }
}
