
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
@Injectable()
export class Globals{
  public userMenues :any ;
constructor(private authServ : AuthenticationService
){

}
}


