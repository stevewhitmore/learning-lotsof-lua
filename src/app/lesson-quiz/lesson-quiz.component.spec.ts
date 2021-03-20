import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonQuizComponent } from './lesson-quiz.component';

fdescribe('LessonQuizComponent', () => {
  let component: LessonQuizComponent;
  let fixture: ComponentFixture<LessonQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonQuizComponent ]
    });

    fixture = TestBed.createComponent(LessonQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('setQuizState()', () => {
    expect(component).toBeTruthy();
  }); // setQuizState()
});
