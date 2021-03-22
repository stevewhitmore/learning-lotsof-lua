import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { LessonService, QuizService } from '../shared/services';
import { LessonServiceStub } from '../testing/lesson-service.stub';
import { QuizServiceStub } from '../testing/quiz-service.stub';

import { NavComponent } from './nav.component';

const lessonServiceStub = new LessonServiceStub();
const quizServiceStub = new QuizServiceStub();

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [
        { provide: LessonService, useValue: lessonServiceStub },
        { provide: QuizService, useValue: quizServiceStub }
      ],
    });

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    flush();
  }));

  describe('mergeIncomingObservables()', () => {
    it('should merge incoming nav and quiz data and build a useful array from it', fakeAsync(() => {
      component.navData$ = of([
        { name: 'blah', path: 'bluuh' }
      ]);

      component.quizData$ = of([
        { lessonPath: 'bluuh', correct: true }
      ]);

      component.mergeIncomingObservables();
      tick();

      component.allNavData$?.subscribe(result => {
        expect(result).toEqual([{
          name: 'blah',
          path: 'bluuh',
          correct: true,
        }]);
      });
    }));
  }); // mergeIncomingObservables()

  describe('resetQuizProgress()', () => {
    it('should call quizService.clearLocalStorage()', () => {
      const spy = spyOn(quizServiceStub, 'clearLocalStorage');

      component.resetQuizProgress();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();
    });
  }); // resetQuizProgress()
});
