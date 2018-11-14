import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(public base: BaseService) { }

  fill(id: string){
    return this.base.get(`courses/${id}/exams`);
  }

  add(id:string, postBody: any){
    return this.base.post(`courses/${id}/exams`, postBody);
  }

  delete(cid: string, eid: string){
    return this.base.delete(`courses/${cid}/exams/${eid}`, null);
  }

  update(cid: string, eid: string, postBody: any){
    return this.base.patch(`courses/${cid}/exams/${eid}`, postBody);
  }

  get(cid: string, eid: string){
    return this.base.get(`courses/${cid}/exams/${eid}/`);
  }
}
