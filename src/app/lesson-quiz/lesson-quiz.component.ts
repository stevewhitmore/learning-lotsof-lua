import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

interface QuizAnswerModel {
  id: string;
  answered: string;
  correct: boolean;
}

@Component({
  selector: 'app-lesson-quiz',
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss'],
})
export class LessonQuizComponent implements OnChanges {
  @Input() quizContent: any;
  @Output() cancelQuizClick: EventEmitter<any> = new EventEmitter();
  latestQuizContent: any;
  answerField = new FormControl();
  answeredCorrectly: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.latestQuizContent = changes.quizContent.currentValue;
    console.log(this.latestQuizContent);
  }

  cancelQuiz() {
    this.cancelQuizClick.emit();
  }

  submitAnswer() {
    this.answeredCorrectly = this.answerField.value === this.latestQuizContent.answer;
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const storageKey = 'luaQuizAnswers';
    const storageArray = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedStorageObject: QuizAnswerModel = {
      id: this.latestQuizContent.id,
      answered: this.answerField.value,
      correct: this.answeredCorrectly,
    };

    if (!storageArray.some((quizResult: QuizAnswerModel) => quizResult.id === updatedStorageObject.id)) {
      storageArray.unshift(updatedStorageObject);
    }

    const updatedStorageArray = storageArray.map((quizResult: QuizAnswerModel) => {
      return quizResult.id === updatedStorageObject.id
        ? {
            ...quizResult,
            answered: updatedStorageObject.answered,
            correct: updatedStorageObject.correct,
          }
        : quizResult;
    });

    localStorage.setItem(storageKey, JSON.stringify(updatedStorageArray));
  }
}
