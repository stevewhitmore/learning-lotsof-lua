import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuizAnswerModel } from '../models';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private answeredQuestionsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('luaQuizAnswers') || '[]'));
  answeredQuestions$: Observable<any> = this.answeredQuestionsSubject.asObservable();
  quizContent$: Observable<any> = this.http.get('assets/quiz-content.json');
  storageKey: string = 'luaQuizAnswers';
  storageArray: QuizAnswerModel[] = [];
  
  constructor(private http: HttpClient,
              private lessonService: LessonService) {}

  getQuizContent(path: string) {
    this.getLocalStorageArray();
    return combineLatest([this.lessonService.lessonData$, this.quizContent$]).pipe(
      switchMap(([lessonData, quizContent]) => {
        const lessonMeta = lessonData.find(lesson => lesson.path === path);
        const quizId = lessonMeta ? lessonMeta.quizId : 0;
        const previouslyAnswered = this.storageArray.find((a: any) => a.id === quizId);
        const quizData = quizContent.find((quiz:any) => quiz.id === quizId)
        const currentQuiz = {
          ...quizData,
          previouslyAnswered: !!previouslyAnswered,
          givenAnswer: previouslyAnswered?.givenAnswer,
          answeredCorrectly: quizData.answer === previouslyAnswered?.givenAnswer,
        }
        return of(currentQuiz);
      }),
    );
  }

  passAlongAnswer(answer: QuizAnswerModel) {
    this.updateLocalStorage(answer);
    this.updateNavIndicator();
  }

  updateNavIndicator() {
    this.answeredQuestionsSubject.next(this.storageArray);
  }

  updateLocalStorage(updatedStorageObject: QuizAnswerModel) {
    if (!this.storageArray.some((quizResult: QuizAnswerModel) => quizResult.id === updatedStorageObject.id)) {
      this.storageArray.unshift(updatedStorageObject);
    }

    const updatedStorageArray = this.storageArray.map((quizResult: QuizAnswerModel) => {
      return quizResult.id === updatedStorageObject.id
                                ? {
                                    ...quizResult,
                                    givenAnswer: updatedStorageObject.givenAnswer,
                                    correct: updatedStorageObject.correct,
                                  }
                                : quizResult;
    });

    localStorage.setItem(this.storageKey, JSON.stringify(updatedStorageArray));
    this.getLocalStorageArray();
  }

  clearLocalStorage() {
    localStorage.removeItem(this.storageKey);
    this.answeredQuestionsSubject.next([]);
  }

  getLocalStorageArray() {
    this.storageArray = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}
