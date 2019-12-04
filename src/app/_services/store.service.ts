import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  clear(){
    localStorage.clear();
  }

  getAccessToken(){
    return localStorage.getItem('userToken');
  }
}
