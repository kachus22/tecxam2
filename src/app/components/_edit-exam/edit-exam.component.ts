import { Component, OnInit } from '@angular/core';
import { ExamsService } from 'src/app/services/exams.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { AnswersService } from 'src/app/services/answers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionModalComponent } from '../add-question-modal/add-question-modal.component';
import { AddAnswerModalComponent } from '../add-answer-modal/add-answer-modal.component';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.sass']
})
export class EditExamComponent implements OnInit {
  courseEdit: any;
  examEdit: any;
  questionEdit: any;
  editQuestion: boolean = false;
  answerEdit: any;
  editAnswer: boolean = false;
  variables = [];
  checkAnswers: boolean = false;

  courseID: string;
  examName: string;
  examID: string;

  rows = [];
  rows2 = [];

  columns = [
    { prop: 'name' },
    { prop: 'points' },
  ];

  columns2 = [
    { prop: 'name' },
    { prop: 'correct' },
  ];

  selected = [];
  selectedAns = [];

  temp = [];

  constructor(public examService: ExamsService, public questionsService: QuestionsService,
              public answersService: AnswersService,
              private modalService: NgbModal, private _scrollToService: ScrollToService) { }

  ngOnInit() {
    let ids = window.location.pathname.match(/\d+/g);
    this.courseID = ids[0];
    this.examID = ids[1];
    this.loadExam();
    this.load();
  }

  loadExam(){
    this.examService.get(this.courseID, this.examID)
      .subscribe(
        (result) => {
          this.examEdit = JSON.parse(JSON.stringify(result));
          this.examName = this.examEdit.name;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  load(){
    this.questionsService.fill(this.courseID, this.examID)
      .subscribe(
        (result) => {
          this.rows = [];
          for(var i in result){
            let row = { id: result[i].id, name: result[i].name,
                        tags: result[i].tags, created_at: result[i].created_at,
                        updated_at: result[i].updated_at, user_id: result[i].user_id,
                        category: result[i].category, points: result[i].points };
            this.rows.push(row);
          }
          this.rows = [...this.rows];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadAnswers(id: string){
    this.answersService.fill(id)
      .subscribe(
        (result) => {
          this.rows2 = [];
          for(var i in result){
            let row = { id: result[i].id, name: result[i].name,
                        question_id: result[i].question_id, created_at: result[i].created_at,
                        updated_at: result[i].updated_at, correct: result[i].correct,
                        variables: result[i].variables };
            this.rows2.push(row);
          }
          this.rows2 = [...this.rows2];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  updateExam(){
    let exam = {
      exam: {
        name: this.examEdit.name,
        date: this.examEdit.date,
        time_limit: this.examEdit.time_limit,
        description: this.examEdit.description,
      }
    }
    this.examService.update(this.courseID, this.examID, exam)
      .subscribe(
        (result) => {
          console.log(result);
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  updateQuestion(){
    let question = {
      question: {
        name: this.questionEdit.name,
        points: this.questionEdit.points,
        tags: this.questionEdit.tags
      }
    }
    this.questionsService.update(this.courseID, this.examID, this.questionEdit.id, question)
      .subscribe(
        (result) => {
          this.questionEdit = null;
          this.editQuestion = false;
          this.editAnswer = false;
          this.load();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  updateAnswer(){
    let answer = {
      answer: {
        name: this.answerEdit.name,
        correct: this.answerEdit.correct,
        variables: {}
      }
    };
    for(let v in this.variables){
      answer.answer.variables[this.variables[v][0]] = this.variables[v][1];
    }
    this.answersService.update(this.questionEdit.id, this.answerEdit.id, answer)
      .subscribe(
        (result) => {
          this.answerEdit = null;
          this.editAnswer = false;
          this.loadAnswers(this.questionEdit.id);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onDelete(){
    this.questionsService.delete(this.courseID, this.examID, this.questionEdit.id)
        .subscribe(
          (result) => {
            this.editQuestion = false;
            this.editAnswer = false;
            this.load();
          },
          (error) => {
            console.error(error);
          }
        );
  }

  onDeleteAns(){
    this.answersService.delete(this.questionEdit.id, this.answerEdit.id)
        .subscribe(
          (result) => {
            this.editAnswer = false;
            this.loadAnswers(this.questionEdit.id);
          },
          (error) => {
            console.error(error);
          }
        );
  }

  onSelect({ selected }) {
    if(selected[0] != null){
      this.questionEdit = JSON.parse(JSON.stringify(selected[0]));
      this.editQuestion = true;
      this.editAnswer = false;
      if(selected[0].category == 'multiple_choice' || selected[0].category == 'checkbox' || selected[0].category == 'radio'){
        this.checkAnswers = true;
      }
      else{
        this.checkAnswers = false;
      }
      this.loadAnswers(selected[0].id);
      this.triggerScrollTo();
    }
    else{
      this.editAnswer = false;
      this.editQuestion = false;
    }
  }

  onSelectAnswer({ selected }) {
    if(selected[0] != null){
      this.answerEdit =JSON.parse(JSON.stringify(selected[0]));
      console.log(this.answerEdit);
      this.editAnswer = true;
      this.variables = [];
      for (let [key, value] of Object.entries(this.answerEdit.variables)) {
        let vals = String(value).replace(/[[\]" ]+/g, '').split(',');
        console.log(vals);
        this.variables.push([key, vals]);
      }
      console.log(this.variables);
      this.triggerScrollTo();
    }
    else{
      this.editAnswer = false;
    }
  }

  singleSelectCheck (row:any) {
     return this.selected.indexOf(row) === -1;
  }

  onChangeVar(index, value){
    this.variables[index][0] = value;
  }

  onChangeValue(index, value){
    this.variables[index][1] = value;
    console.log(this.variables[index]);
  }

  addVar(){
    this.variables.push([null, null]);
  }

  open(){
    this.modalService.open(
        AddQuestionModalComponent,
        { centered: true, windowClass: 'add-modal' }
        ).result.then((result) => {
      let question = { question: result };
      this.add(question);

    }, (reason) => {
      console.log('Closed');
    });
  }

  add(postBody: any){
    this.questionsService.add(this.courseID, this.examID, postBody)
      .subscribe(
        (result) => {
          this.load();
          this.openAns2(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  openAns(){
    this.modalService.open(
        AddAnswerModalComponent,
        { centered: true, windowClass: 'add-modal' }
        ).result.then((result) => {
      let answer = { answer: result };
      this.addAns(answer);
    }, (reason) => {
      console.log('Closed');
    });
  }

  addAns(postBody: any){
    this.answersService.add(this.selected[0].id, postBody)
      .subscribe(
        (result) => {
          this.loadAnswers(this.selected[0].id);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  openAns2(res: any){
    let id = res.id;
    this.modalService.open(
        AddAnswerModalComponent,
        { centered: true, windowClass: 'add-modal' }
        ).result.then((result) => {
          let answer = { answer: result };
          this.addAns2(id, answer);
    }, (reason) => {
      console.log('Closed');
    });
  }

  addAns2(id: string, postBody: any){
    this.answersService.add(id, postBody)
      .subscribe(
        (result) => {
        },
        (error) => {
          console.error(error);
        }
      );
  }

  triggerScrollTo(){
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };
    this._scrollToService.scrollTo(config);
  }
}
