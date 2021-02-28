import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

export interface TopicModel {
  name: string;
  path: string;
}

export interface LessonModel extends TopicModel {
  content: string;
  quiz: string;
}

export interface CategoryModel extends TopicModel {
  lessons: LessonModel[];
}

export interface NavigationModel {
  
}

@Injectable()
export class LessonService {

  lessonData$: Observable<CategoryModel[]> = <Observable<CategoryModel[]>>this.http.get('assets/lesson-data.json');

  navigationTree$: Observable<any[]> = this.lessonData$.pipe(
    map((d: CategoryModel[]) => {
      return d.map(x => {
        return {
          name: x.name,
          path: x.path,
          lessons: x.lessons.map((a: TopicModel) => {
            return {
              name: a.name,
              path: a.path,
            }
          })
        }
      })
    })
  )

  constructor(private http: HttpClient) {}

}