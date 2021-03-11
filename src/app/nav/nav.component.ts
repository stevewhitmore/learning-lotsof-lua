import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LessonService } from '../shared/services/lesson.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  navData$ = this.lessonService.navigationTree$;

  quizData$ = this.quizService.answeredQuestions$.pipe(tap(console.log));

  allNavData$ = combineLatest([this.navData$, this.quizData$])
    .pipe(
      map(([navData, quizData]) => {
        console.log('navData:', navData)
        console.log('quizData:', quizData)
        const updated = navData.map(n => {
          const quizResult = quizData.find((q: any) => q.lessonPath === n.path);
          const correct = quizResult && quizResult.correct;
          return {
            ...n,
            correct: correct,
          }
        })
        return updated;
      }),
    ).subscribe(console.log);
  
  

  constructor(private lessonService: LessonService,
              private quizService: QuizService) {}

}
