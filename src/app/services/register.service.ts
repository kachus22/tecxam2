import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public base: BaseService) { }

  register(postBody: any) {
    return this.base.postResponse('signup', postBody);
  }
}
