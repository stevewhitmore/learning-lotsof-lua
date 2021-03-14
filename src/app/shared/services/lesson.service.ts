import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { LessonModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LessonService {

  private pathChangeSubject = new Subject();
  pathChange$: Observable<any> = this.pathChangeSubject.asObservable();

  lessonData$: Observable<LessonModel[]> = <Observable<LessonModel[]>>this.http.get('assets/lessons-meta.json');

  navigationTree$: Observable<any[]> = this.lessonData$.pipe(
    map((lessonData) => {
      return lessonData.map(lesson => {
        return {
          name: lesson.name,
          path: lesson.path,
        }
      });
    }),
  );

  constructor(private http: HttpClient) {}

  getLessonContent(path: string) {
    return this.http.get(`assets/lessons/${path}.md`, {responseType: 'text'});
  }

}