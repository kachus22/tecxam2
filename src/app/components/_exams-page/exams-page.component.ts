import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddExamModalComponent } from '../add-exam-modal/add-exam-modal.component';
import { ExamsService } from 'src/app/services/exams.service';
import { PdfService } from 'src/app/services/pdf.service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
  selector: 'exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.sass']
})
export class ExamsPageComponent implements OnInit {
  loading: boolean = false;
  courseID: string;
  rows = [];
  columns = [
    { prop: 'Documento' },
  ];

  selected = [];

  temp = [];

  @ViewChild('table') table: any;

  constructor(public examsService: ExamsService, public pdfService: PdfService, private modalService: NgbModal,
  public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.courseID = window.location.pathname.substr(9).match(/\d+/)[0];
    this.load();
  }

  load(){
    this.loading = true;
    this.examsService.fill(this.courseID)
      .subscribe(
        (result) => {
          this.showSuccess('Cursos cargados!');
          this.loading = false;
          this.rows = [];
          for(var i in result){
            let row = { name: result[i].name, created_at: result[i].created_at,
                        uploaded_at: result[i].updated_at, course_id: result[i].course_id,
                        id: result[i].id, random_questions: result[i].random_questions, type: 'Examen'};
            this.rows.push(row);
          }
          this.rows = [...this.rows];
        },
        (error) => {
          this.loading = false;
          this.showError('No se cargaron los datos!');
          console.error(error);
        }
      );
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    for(let s in selected){
      this.selected.push(selected[s].id);
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  toggleExpandGroup(group) {
    this.table.groupHeader.toggleExpandGroup(group);
  }

  info(group: string){
    if(group == 'Examen'){
      return 'Sección de examenes genearados';
    }
    if(group == 'Tarea'){
      return 'Sección de tareas genearados';
    }
    if(group == 'Otro'){
      return 'Sección de documentos subidos que no se pueden editar';
    }
  }

  open(){
    this.modalService.open(AddExamModalComponent,
                          { centered: true, windowClass: 'add-modal' }
                          ).result.then((result) => {
      let exam = { exam: result };
      this.add(exam);
    }, (reason) => {
      console.log('Closed');
    });
  }


  add(postBody: any){
    this.examsService.add(this.courseID, postBody)
      .subscribe(
        (result) => {
          this.showSuccess('Documento agregado!');
          this.load();
        },
        (error) => {
          this.showError('Hubo un error!');
          console.error(error);
        }
      );
  }

  onDelete(){
    for(let s in this.selected){
      this.deleteExam(this.selected[s]);
    }
  }

  deleteExam(id: string){
    this.examsService.delete(this.courseID, id)
      .subscribe(
        (result) => {
          this.showSuccess('Documento borrado!');
          this.load();
        },
        (error) => {
          this.showError('Hubo un error!');
          console.error(error);
        }
      );
  }

  getPDF(id: any){
    this.showInfo('Ya estamos haciendo el examen para ti...');
    this.pdfService.get(this.courseID, id)
      .subscribe(
        (result) => {
          this.showSuccess('Woohoo! PDF listo!');
          var fileURL = URL.createObjectURL(result.body);
          let downloadLink = document.createElement('a');
          let fileName = 'examen.pdf';
          downloadLink.href = fileURL;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        },
        (error) => {
          this.showError('Hubo un error con el PDF! :(');
          console.error(error);
        }
      );
  }

  getPDFAns(id: any){
    this.showInfo('Ya estamos haciendo la hoja de respuestas para ti...');
    this.pdfService.getAns(this.courseID, id)
      .subscribe(
        (result) => {
          this.showSuccess('Woohoo! PDF listo!');
          var fileURL = URL.createObjectURL(result.body);
          let downloadLink = document.createElement('a');
          let fileName = 'examen_answers.pdf';
          downloadLink.href = fileURL;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        },
        (error) => {
          this.showError('Hubo un error con el PDF! :(');
          console.error(error);
        }
      );
  }

  isRandom(tags: any){
    if(Object.keys(tags).length > 0){
      return true;
    }
    return false;
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Whoo!');
  }

  showInfo(msg: string) {
    this.toastr.info(msg, 'Hey!');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Oops!');
  }

}
