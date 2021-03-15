import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-read',
  templateUrl: './lesson-read.component.html',
  styleUrls: ['./lesson-read.component.scss']
})
export class LessonReadComponent {
  @Input() lessonContent = '';
  @Output() takeQuizClick: EventEmitter<any> = new EventEmitter();

  takeQuiz() {
    this.takeQuizClick.emit();
  }

}
