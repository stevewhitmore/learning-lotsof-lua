import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonReadComponent } from './lesson-read.component';

describe('LessonReadComponent', () => {
  let component: LessonReadComponent;
  let fixture: ComponentFixture<LessonReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonReadComponent ]
    });

    fixture = TestBed.createComponent(LessonReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('takeQuiz()', () => {
    it('should emit nothing', () => {
      const spy = spyOn(component.takeQuizClick, 'emit').and.callThrough();

      component.takeQuiz();
      
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();
    });
  });
});
