import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonQuizComponent } from './lesson-quiz.component';

describe('LessonQuizComponent', () => {
  let component: LessonQuizComponent;
  let fixture: ComponentFixture<LessonQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonQuizComponent ]
    });

    fixture = TestBed.createComponent(LessonQuizComponent);
    component = fixture.componentInstance;

    const currentValue = {
      answer: 'bar',
      answeredCorrectly: true,
      givenAnswer: 'bar',
      id: 1,
      options: [ 'foo', 'bar', 'baz' ],
      previouslyAnswered: true,
      question: 'something something?',
      questionType: 'multiple-choice',
    };
  
    const changesObj: SimpleChanges = {
      quizContent: new SimpleChange(null, currentValue, true),
    };

    component.ngOnChanges(changesObj);
    fixture.detectChanges();
  });

  describe('setQuizState()', () => {
    it('should set the "answered" property to true if incoming data indicates so', () => {
      expect(component.answered).toBe(true);
    });

    it('should set the answerField value to whatever the givenAnswer is', () => {
      expect(component.answerField.value).toBe('bar');
    });

    it('should set "answeredCorrectly" if the givenAnswer lines up with the answer', () => {
      expect(component.answeredCorrectly).toBe(true);
    });
  }); // setQuizState()

  describe('submitAnswer()', () => {
    it('should set "answered" to true', () => {
      component.answered = false;

      component.submitAnswer();

      expect(component.answered).toBe(true);
    });

    it('should set "answeredCorrectly" if the answerField value matches with the answer', () => {
      component.latestQuizContent.answer = 'baz';
      component.answerField.setValue('foo');

      component.submitAnswer();

      expect(component.answeredCorrectly).toBe(false);
    });

    it('should create a updatedAnswer object and emit it up on submission', () => {      
      const spy = spyOn(component.answerSubmittion, 'emit').and.callThrough();
      const expected = {
        id: 3,
        givenAnswer: 'foo',
        correct: false,
        lessonPath: 'moocows',
      };
      component.latestQuizContent.answer = 'baz';
      component.answerField.setValue('foo');
      component.latestQuizContent.id = 3;
      component.lessonPath = 'moocows';
      
      component.submitAnswer();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expected);
    });
  }); // submitAnswer()

  describe('cancelQuiz()', () => {
    it('should emit nothing', () => {
      const spy = spyOn(component.cancelQuizClick, 'emit').and.callThrough();

      component.cancelQuiz();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();
    });
  }); // cancelQuiz()
});
