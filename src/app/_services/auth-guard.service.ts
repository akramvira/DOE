import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";
import { ConstantPool } from "@angular/compiler";
import { map, catchError } from "rxjs/operators";
import { Globals } from "./globals";
import { Observable, of } from "rxjs";
import { setTime } from "ngx-bootstrap/chronos/utils/date-setters";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  loading = false;

  menues: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private gl: Globals
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this.loading = true;

    return Observable.create(observer => {
      let menu = JSON.parse(localStorage.getItem("menu"));

      if (menu) {
        let res = menu.includes(next.data.accessName);
        if (res) {
          observer.next(true);
        } else {
          this.router.navigate(["/403"]);
          observer.next(false);
        }
      } else {
        this.authService.getUserMenues().subscribe(
          data => {
            localStorage.setItem("menu", JSON.stringify(data["data"]));
            menu = data['data'];
            let res = menu.includes(next.data.accessName);
            if (res) {
              observer.next(true);
            } else {
              this.router.navigate(["/403"]);
              observer.next(false);
            }

          },
          error => {
            this.authService.handdleAuthErrors(error);
            this.router.navigate(["/403"]);
            observer.next(false);
          }
        );
      }
    });
  }
}
