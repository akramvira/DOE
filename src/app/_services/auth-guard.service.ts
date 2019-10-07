import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import { ConstantPool } from '@angular/compiler';
import { map ,catchError} from 'rxjs/operators';
import { Globals } from './globals';
import { Observable, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  loading = false;

  menues :any ;
  constructor(
            private authService: AuthenticationService,
            private router : Router,
            private gl :Globals
              ) {
               
              }

              
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {

   
    this.loading =true;
    return this.authService.getUserMenues()
    .pipe(
      map(data=>{
        
      let res = data['data'].includes(next.data.accessName);
      
      if(res ){
        return true;
      }
      else this.router.navigate(['/403']);
    })
    ,catchError(error => {
      
     this.authService.handdleAuthErrors(error);
      return of(null);

    
    })
    );
    
     
    

  }

}
