import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(public base: BaseService) { }

  get(cid: string, eid: string){
    return this.base.getResponse(`courses/${cid}/exams/${eid}/export`);
  }

  getAns(cid: string, eid: string){
    return this.base.getResponse(`courses/${cid}/exams/${eid}/answer_key`);
  }
}
