import { Component } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LessonService } from '../shared/services/lesson.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  navData$ = this.lessonService.navigationTree$;
  quizData$ = this.quizService.answeredQuestions$;

  allNavData$ = combineLatest([this.navData$, this.quizData$])
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

  constructor(private lessonService: LessonService,
              private quizService: QuizService) {}

  resetQuizProgress() {
    this.quizService.clearLocalStorage();
  }

}
