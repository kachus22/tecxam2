import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(public base: BaseService) { }

  fill(id: string){
    return this.base.get(`questions/${id}/answers`);
  }

  add(id: string, postBody: any){
    return this.base.post(`questions/${id}/answers`, postBody);
  }

  delete(qid: string, aid: string){
    return this.base.delete(`questions/${qid}/answers/${aid}`, null);
  }

  update(qid: string, aid: string, postBody: any){
    return this.base.patch(`questions/${qid}/answers/${aid}`, postBody);
  }
}
