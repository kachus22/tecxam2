import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(public base: BaseService) { }

  fill(cid: string, eid: string){
    return this.base.get(`courses/${cid}/exams/${eid}/questions`);
  }

  add(cid: string, eid: string, postBody: any){
    return this.base.post(`courses/${cid}/exams/${eid}/questions`, postBody);
  }

  delete(cid: string, eid: string, qid: string){
    return this.base.delete(`courses/${cid}/exams/${eid}/questions/${qid}`, null);
  }

  update(cid: string, eid: string, qid: string, postBody: any){
    return this.base.patch(`courses/${cid}/exams/${eid}/questions/${qid}`, postBody);
  }
}
