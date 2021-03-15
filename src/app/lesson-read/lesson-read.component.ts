import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lesson-read',
  templateUrl: './lesson-read.component.html',
  styleUrls: ['./lesson-read.component.scss']
})
export class LessonReadComponent implements OnChanges {
  @Input() lessonContent: string = '';
  @Output() takeQuizClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
  }

  takeQuiz() {
    this.takeQuizClick.emit();
  }

}
