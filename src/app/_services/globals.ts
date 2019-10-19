
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
@Injectable()
export class Globals{
  public userMenues :any ;
constructor(private authServ : AuthenticationService
){

}

static fetchData(data, keysIsId = false) {
  let finalData = [];
  for (let i in data) {
    debugger;
    if(keysIsId)
      finalData.push(i);
    else finalData.push(data[i]["id"]);
  }

  return finalData.join(",");
}
}


