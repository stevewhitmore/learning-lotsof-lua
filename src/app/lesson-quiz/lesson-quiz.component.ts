import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lesson-quiz',
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss']
})
export class LessonQuizComponent implements OnChanges {
  @Input() quizContent: any;
  @Output() cancelQuizClick: EventEmitter<any> = new EventEmitter();
  latestQuizContent: any;
  answerField = new FormControl();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.latestQuizContent = changes['quizContent'].currentValue;
    console.log(this.latestQuizContent)
  }

  cancelQuiz() {
    this.cancelQuizClick.emit();
  }

  submitAnswer() {
    console.log(this.answerField.value)
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const storageArray = JSON.parse(localStorage.getItem('luaQuizAnswers')) || [];
    localStorage.setItem(this.latestQuizContent.id, this.answerField.value)
  }

}
