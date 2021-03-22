import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NavModel } from '../shared/models/nav.model';
import { LessonService } from '../shared/services/lesson.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navData$ = this.lessonService.navigationTree$;
  quizData$ = this.quizService.answeredQuestions$;
  allNavData$: Observable<NavModel[]> | undefined;

  constructor(private lessonService: LessonService,
              private quizService: QuizService) {}

  ngOnInit() {
    this.mergeIncomingObservables();
  }

  mergeIncomingObservables() {
    this.allNavData$ = combineLatest([this.navData$, this.quizData$])
    .pipe(
      mergeMap(([navData, quizData]) => {
        const navWithQuizResults = navData.map((n: any) => {
          const quizResult = quizData.find((q: any) => q.lessonPath === n.path);
          const correct = quizResult && quizResult.correct;
          return {
            ...n,
            correct,
          };
        });
        return of(navWithQuizResults);
      }),
    );
  }

  resetQuizProgress() {
    this.quizService.clearLocalStorage();
  }

}
