import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { QuizAnswerModel } from '../shared/models';
import { LessonService, QuizService } from '../shared/services';
import { ActivatedRouteStub } from '../testing/activated-route.stub';
import { LessonServiceStub } from '../testing/lesson-service.stub';
import { QuizServiceStub } from '../testing/quiz-service.stub';

import { LessonComponent } from './lesson.component';

const activatedRouteSub = new ActivatedRouteStub();
const lessonServiceStub = new LessonServiceStub();
const quizServiceStub = new QuizServiceStub();

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSub },
        { provide: LessonService, useValue: lessonServiceStub },
        { provide: QuizService, useValue: quizServiceStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    });

    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    flush();
  }));

  describe('getLessonContent()', () => {
    it('should call lessonService.getLessonContent if a path is captured', fakeAsync(() => {
      const spy = spyOn(lessonServiceStub, 'getLessonContent').and.callThrough();

      component.getLessonContent();
      component.lessonContent$.subscribe();
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should assign the captured path to a class property', fakeAsync(() => {
      component.getLessonContent();
      component.lessonContent$.subscribe();
      tick();

      expect(component.path).toBeTruthy();
    }));

    // it('shoud return a generic message if no path is present for some reason', fakeAsync(() => {
    //   activatedRouteSub.routeChangeObject = {
    //     get: () => ''
    //   };

    //   component.getLessonContent();
    //   component.lessonContent$.subscribe(response => expect(response).toBe('No content found'));
    //   tick();
    // }));

    it('should trigger onCancelQuizClick()', fakeAsync(() => {
      const spy = spyOn(component, 'onCancelQuizClick').and.callThrough();

      component.getLessonContent();
      component.lessonContent$.subscribe();
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
    }));
  }); // getLessonContent()

  describe('getQuizContent()', () => {
    it('should call quizService.getQuizContent()', fakeAsync(() => {
      const spy = spyOn(quizServiceStub, 'getQuizContent').and.callThrough();

      component.getQuizContent();
      component.quizContent$.subscribe();
      tick();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(component.path);
    }));

    it('should assign the quizMode class property to "true"', () => {
      component.quizMode = false;

      component.getLessonContent();

      expect(component.quizMode).toBe(false);
    });
  }); // getQuizContent()

  describe('onTakeQuizClick()', () => {
    it('should call getQuizContent()', () => {
      const spy = spyOn(component, 'getQuizContent');

      component.onTakeQuizClick();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  }); // onTakeQuizClick()

  describe('onAnswerSubmission()', () => {
    it('should call quizService.passAlongAnswer()', fakeAsync(() => {
      const spy = spyOn(quizServiceStub, 'passAlongAnswer').and.callThrough();
      const answer: QuizAnswerModel = {
        id: '1',
        givenAnswer: 'foo',
        correct: true,
        lessonPath: 'bar',
      };

      component.onAnswerSubmission(answer);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(answer);
    }));
  }); // onAnswerSubmission()

  describe('onCancelQuizClick()', () => {
    it('should set "quizMode" to false', () => {
      component.quizMode = true;

      component.onCancelQuizClick();

      expect(component.quizMode).toBe(false);
    });
  }); // onCancelQuizClick()
});
