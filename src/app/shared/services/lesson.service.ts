import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';

export interface TopicModel {
  name: string;
  path: string;
}

export interface LessonModel extends TopicModel {
  content: string;
  quiz: string;
}

@Injectable({
  providedIn: 'root',
})
export class LessonService {

  lessonData$: Observable<LessonModel[]> = <Observable<LessonModel[]>>this.http.get('assets/lesson-data.json');

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