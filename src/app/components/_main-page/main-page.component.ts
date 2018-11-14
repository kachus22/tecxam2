import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCourseModalComponent } from '../add-course-modal/add-course-modal.component';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {
  edit = false;
  rows = [];
  courseEdit: any;
  courseEditID: any;

  columns = [
    { prop: 'acronym' },
    { prop: 'name' },
  ];

  selected = [];

  @ViewChild('table') table: any;

  constructor(public courseService: CoursesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.courseService.fill()
      .subscribe(
        (result) => {
          this.rows = [];
          for(var i in result){
            let row = { acronym: result[i].acronym, name: result[i].name,
                        description: result[i].description, created_at: result[i].created_at,
                        courseEditd_at: result[i].courseEditd_at, user_id: result[i].user_id,
                        id: result[i].id};
            this.rows.push(row);
          }
          this.rows = [...this.rows];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  add(course: any){
    this.courseService.add(course)
      .subscribe(
        (result) => {
          this.load();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    for(let s in selected){
      this.selected.push(selected[s].id);
    }
    if(this.selected.length > 1 || this.selected.length < 1){
      this.courseEdit = null;
      this.edit = false;
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDelete(){
    for(let s in this.selected){
      this.deleteCourse(this.selected[s]);
    }
  }

  deleteCourse(id: number){
    this.courseService.delete(id)
      .subscribe(
        (result) => {
          this.load();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  open(){
    this.modalService.open(AddCourseModalComponent,
                          { centered: true, windowClass: 'add-modal' }
                          ).result.then((result) => {
      let course = {
        course: {
          acronym: result.acronym,
          name: result.name,
          description: result.description
        }
      };
      this.add(course);
    }, (reason) => {
      console.log('Closed');
    });
  }

  checkSelection(id: any){
    if(this.selected.length == 1 && this.selected == id){
      console.log(this.selected);
      return true;
    }
    return false;
  }

  openEdit(){
    this.edit = true;
    for(let i in this.rows){
      if(this.rows[i].id == this.selected){
        this.courseEdit = { acronym: this.rows[i].acronym, name: this.rows[i].name,
                    description: this.rows[i].description };
        this.courseEditID = this.rows[i].id;
      }
    }
  }

  update(){
    let course = { course: this.courseEdit };
    this.courseService.update(this.courseEditID, course)
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
