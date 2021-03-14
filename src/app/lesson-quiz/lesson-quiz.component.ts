import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizAnswerModel } from '../shared/models';

@Component({
  selector: 'app-lesson-quiz',
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss'],
})
export class LessonQuizComponent implements OnChanges {
  @Input() quizContent: any;
  @Input() lessonPath: string = '';
  @Output() answerSubmittion: EventEmitter<any> = new EventEmitter();
  @Output() cancelQuizClick: EventEmitter<any> = new EventEmitter();
  latestQuizContent: any;
  answerField = new FormControl();
  answeredCorrectly: boolean = false;
  answered: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    const changedQuizContent = changes.quizContent;
    if (changedQuizContent) {
      this.latestQuizContent = changedQuizContent.currentValue;      

      if (this.latestQuizContent && this.latestQuizContent.previouslyAnswered) {
        this.answered = true;
        this.answerField.setValue(this.latestQuizContent.givenAnswer);
        this.answeredCorrectly = this.latestQuizContent.givenAnswer === this.latestQuizContent.answer;
      }
    }
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

    this.answerSubmittion.emit(updatedAnswer);
  }

  cancelQuiz() {
    this.cancelQuizClick.emit();
  }
}
