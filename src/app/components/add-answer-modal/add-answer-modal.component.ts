import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
  selector: 'add-answer-modal',
  templateUrl: './add-answer-modal.component.html',
  styleUrls: ['./add-answer-modal.component.sass']
})
export class AddAnswerModalComponent implements OnInit {
  category: string = null;
  variables = [];
  answerEdit = {
    name: null,
    correct: false,
    variables: {}
  };

  constructor(private modal: NgbActiveModal, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onChangeVar(index, value){
    this.variables[index][0] = value;
  }

  onChangeValue(index, value){
    this.variables[index][1] = value;
    console.log(this.variables[index]);
  }

  onSubmit(){
    let miss = false;
    if(this.variables.length > 0){
      for(let v in this.variables){
        if(this.variables[v][0] && this.variables[v][1]){
          this.answerEdit.variables[this.variables[v][0]] = this.variables[v][1];
        }
        else{
          miss = true;
        }
      }
    }
    if(miss){
      this.showError('Llena los campos de variables');
    }
    else{
      if(this.answerEdit.name){
        this.modal.close(this.answerEdit);
      }
      else{
        this.showError('Ingresa la respuesta!');
      }
    }
  }

  addVar(){
    this.variables.push([null, null]);
  }

  delVar(){
    this.variables.pop();
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Oops!');
  }

}
