import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lesson-quiz',
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss']
})
export class LessonQuizComponent implements OnChanges {
  @Input() quizContent: any;
  @Output() cancelQuizClick: EventEmitter<any> = new EventEmitter();
  latestQuizContent: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.latestQuizContent = changes['quizContent'].currentValue;

    console.log('latestQuizContent:', this.latestQuizContent)
  }

  cancelQuiz() {
    this.cancelQuizClick.emit();
  }

}
