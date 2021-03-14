import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { switchMap, tap, mergeMap } from 'rxjs/operators';
import { QuizAnswerModel } from '../shared/models';
import { LessonService } from '../shared/services/lesson.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, OnDestroy {
  lessonContent$: Observable<any> = new Observable();
  quizContent$: Observable<any> = new Observable();
  quizMode = false;
  path: any;
  pathSub: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private lessonService: LessonService,
              private quizService: QuizService) {}

  ngOnInit() {
    this.getLessonContent();

    this.pathSub = this.route.paramMap
      .subscribe(params => {
        this.path = params.get('path');
      })
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
      tap(() => this.onCancelQuizClick()),
    );
  }

  getQuizContent() {
    this.quizContent$ = this.quizService.getQuizContent(this.path);
    this.quizMode = true;
  }

  onTakeQuizClick() {
    this.getQuizContent();
  }

  onAnswerSubmission(answer: QuizAnswerModel) {
    this.quizService.passAlongAnswer(answer);
  }

  onCancelQuizClick() {
    this.quizMode = false;
  }

  ngOnDestroy() {
    if (this.pathSub) { this.pathSub.unsubscribe(); }
  }
}
