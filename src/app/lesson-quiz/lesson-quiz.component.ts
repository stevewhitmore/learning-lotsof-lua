import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizService } from '../shared/services/quiz.service';

interface QuizAnswerModel {
  id: string;
  givenAnswer: string;
  correct: boolean;
  lessonPath: string;
}

@Component({
  selector: 'app-lesson-quiz',
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss'],
})
export class LessonQuizComponent implements OnChanges {
  @Input() quizContent: any;
  @Input() lessonPath: string = '';
  @Output() cancelQuizClick: EventEmitter<any> = new EventEmitter();
  latestQuizContent: any;
  answerField = new FormControl();
  answeredCorrectly: boolean = false;
  answered: boolean = false;
  storageKey: string = 'luaQuizAnswers';
  storageArray: QuizAnswerModel[] = [];
  previouslyAnswered: QuizAnswerModel | undefined;

  constructor(private quizService: QuizService) {}

  ngOnChanges(changes: SimpleChanges) {
    const changedQuizContent = changes.quizContent;
    if (changedQuizContent) {
      this.latestQuizContent = changedQuizContent.currentValue;
    }

    if (this.latestQuizContent) {
      this.getLocalStorageArray();
      this.checkForPreviousAnswer();
    }
  }

  checkForPreviousAnswer() {
    this.previouslyAnswered = this.storageArray.find((a: any) => a.id === this.latestQuizContent.id);
    this.answered = !!this.previouslyAnswered;
    if (this.answered && this.previouslyAnswered) {
      this.answerField.setValue(this.previouslyAnswered.givenAnswer);
      this.answeredCorrectly = this.answerField.value === this.latestQuizContent.answer;
    }
  }

  cancelQuiz() {
    this.cancelQuizClick.emit();
  }

  clearAnswer() {

  }

  submitAnswer() {
    this.answered = true;
    this.answeredCorrectly = this.answerField.value === this.latestQuizContent.answer;

    const updatedAnswer: QuizAnswerModel = {
      id: this.latestQuizContent.id,
      givenAnswer: this.answerField.value,
      correct: this.answeredCorrectly,
      lessonPath: this.lessonPath,
    };

    this.updateLocalStorage(updatedAnswer);
    this.quizService.updateNavIndicator(this.storageArray);
  }

  updateLocalStorage(updatedStorageObject: QuizAnswerModel) {

    if (!this.storageArray.some((quizResult: QuizAnswerModel) => quizResult.id === updatedStorageObject.id)) {
      this.storageArray.unshift(updatedStorageObject);
    }

    const updatedStorageArray = this.storageArray.map((quizResult: QuizAnswerModel) => {
      return quizResult.id === updatedStorageObject.id
                                ? {
                                    ...quizResult,
                                    givenAnswer: updatedStorageObject.givenAnswer,
                                    correct: updatedStorageObject.correct,
                                  }
                                : quizResult;
    });

    localStorage.setItem(this.storageKey, JSON.stringify(updatedStorageArray));
    this.getLocalStorageArray();
  }

  getLocalStorageArray() {
    this.storageArray = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}
