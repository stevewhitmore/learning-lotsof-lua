import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private answeredQuestionsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('luaQuizAnswers') || '[]'));
  answeredQuestions$: Observable<any> = this.answeredQuestionsSubject.asObservable();
  quizContent$: Observable<any> = this.http.get('assets/quiz-content.json');
  
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

  updateNavIndicator(answers: any) {
    this.answeredQuestionsSubject.next(answers);
  }
}
