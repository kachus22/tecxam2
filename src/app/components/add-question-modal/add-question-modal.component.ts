import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
  selector: 'add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.sass']
})
export class AddQuestionModalComponent implements OnInit {
  category: string = null;
  questionEdit = {
    name: null,
    points: null,
    tags: [],
    category: null
  };

  constructor(private modal: NgbActiveModal, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onSubmit(){
    if(!this.questionEdit.points){
      this.questionEdit.points = '0';
    }
    if(this.questionEdit.name && this.questionEdit.category){
      this.modal.close(this.questionEdit);
    }
    else{
      if(!this.questionEdit.name){
        this.showError('Ingresa la pregunta!');
      }
      if(!this.questionEdit.category){
        this.showError('Selecciona una categoría!');
      }
    }
  }

  onChange(e){
    if(e.value == 'Opción mutliple'){
      this.questionEdit.category = 'multiple_choice';
    }
    else if(e.value == 'Checkbox'){
      this.questionEdit.category = 'checkbox';
    }
    else if(e.value == 'Radio'){
      this.questionEdit.category = 'radio';
    }
    else if(e.value == 'Caja de Texto corto'){
      this.questionEdit.category = 'small_textbox';
    }
    else if(e.value == 'Caja de Texto largo'){
      this.questionEdit.category = 'big_textbox';
    }
    else if(e.value == 'Párrafo'){
      this.questionEdit.category = 'paragraph';
    }
    else if(e.value == 'Ensayo'){
      this.questionEdit.category = 'essay';
    }
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Oops!');
  }

}
