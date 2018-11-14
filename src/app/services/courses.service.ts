import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public base: BaseService) { }

  fill(){
    return this.base.get('courses');
  }

  add(postBody: any){
    return this.base.post('courses', postBody);
  }

  delete(id: any){
    return this.base.delete(`courses/${id}`, null);
  }

  update(id: any, postBody: any){
    return this.base.patch(`courses/${id}`, postBody);
  }
}
