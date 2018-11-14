import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerModalComponent } from './add-answer-modal.component';

describe('AddAnswerModalComponent', () => {
  let component: AddAnswerModalComponent;
  let fixture: ComponentFixture<AddAnswerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnswerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
