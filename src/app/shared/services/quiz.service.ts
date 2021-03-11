import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {

  quizContent$: Observable<any> = this.http.get('assets/quizzes/quiz-content.json');

  constructor(private http: HttpClient,
              private lessonService: LessonService) {}

  getQuizContent(path: string) {
    return combineLatest([this.lessonService.lessonData$, this.quizContent$]).pipe(
      switchMap(([lessonData, quizContent]) => {
        const lessonMeta = lessonData.find(lesson => lesson.path === path);
        const quizId = lessonMeta ? lessonMeta.quizId : 0;
        return of(quizContent.find((quiz:any) => quiz.id === quizId));
      }),
    );
  }
}
