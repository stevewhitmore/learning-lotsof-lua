import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-quiz',
  templateUrl: './lesson-quiz.component.html',
  styleUrls: ['./lesson-quiz.component.scss']
})
export class LessonQuizComponent implements OnInit {
  @Input() quizContent: string = '';
  @Output() cancelQuizClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancelQuiz() {
    this.cancelQuizClick.emit();
  }

}
