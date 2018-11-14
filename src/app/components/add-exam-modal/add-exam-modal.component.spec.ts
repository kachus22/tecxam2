import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamModalComponent } from './add-exam-modal.component';

describe('AddExamModalComponent', () => {
  let component: AddExamModalComponent;
  let fixture: ComponentFixture<AddExamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
