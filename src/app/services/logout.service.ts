import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(public base: BaseService) { }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('authorization');
    // return this.base.post('association/registration', postBody);
  }
}
