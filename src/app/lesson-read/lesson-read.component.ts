import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-read',
  templateUrl: './lesson-read.component.html',
  styleUrls: ['./lesson-read.component.scss']
})
export class LessonReadComponent implements OnInit {
  @Input() lessonContent: string = '';
  @Output() takeQuizClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  takeQuiz() {
    this.takeQuizClick.emit();
  }

}
