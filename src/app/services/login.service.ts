import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public base: BaseService) { }

  login(postBody: any) {
    return this.base.postResponse('login', postBody);
  }

  isLogged(){
    return localStorage.getItem('authorization') != null;
  }
}
