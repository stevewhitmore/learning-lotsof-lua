import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LessonService } from '../shared/services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lessonContent$: Observable<any> = new Observable();
  quizContent$: Observable<any> = new Observable();
  quizMode = false;

  constructor(private route: ActivatedRoute,
              private lessonService: LessonService) {}

  ngOnInit() {
    this.getLessonContent();
  }

  getLessonContent() {
    this.lessonContent$ = this.route.paramMap.pipe(
      switchMap(params => {
        const path = params.get('path');
        if (path) {
          return this.lessonService.getLessonContent(path);
        }
        return of()
      }),
    );
  }

  onTakeQuizClick() {
    this.quizMode = true;
  }

  onCancelQuizClick() {
    this.quizMode = false;
  }
}
