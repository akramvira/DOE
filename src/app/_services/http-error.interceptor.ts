import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, observable } from "rxjs";
import { retry, catchError, share, map, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { StoreService } from './store.service';
//import { ToastService } from "src/app/shared/jbComponents/toast/toast.service";

// import { ApiService } from "../api-service/api.service";
// import { GeneralFacade } from "src/app/staff-dashboard/general.facade";
// import { StoreService } from "../store/store.service";
// import { ILogin } from "src/app/model/interfaces";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastService: ToastrService,
    // private api: ApiService,
     private storeService: StoreService
  ) {}

  logedOut = false;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObs: Observable<HttpEvent<any>> = new Observable();

      
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          console.log("client side error");
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          console.log("server side error");

          if (error.status === 401) {
            
            // this.api
            //   .login(GeneralFacade.userEmail, GeneralFacade.userPassword)
            //   .then((result: ILogin) => {
            //     if (result.Status)
            //       this.storeService.setAccessToken(result.access_token);
            //     else {
            //       if(this.router.url != '/login')
            //         this.router.navigate(["login"]);
            //       return errorObs;
            //     }
            //   });
            this.storeService.clear();

            

          } else if (error.status == 500) {
            this.toastService.warning(
              "System Message",
              error.error["Message"]
            );
          } else if (error.status == 0)
            this.toastService.warning(
              "Error",
              "Your network connection seems to be disabled. Please check and retry."
            );
          else
            this.toastService.warning(
              "System Message",
              error.error["Message"]
            );
        }

        //errorObs =  throwError(error.error['Message']);

        return errorObs;
      })
    );
  }


refreshToken(){
  
}

}
