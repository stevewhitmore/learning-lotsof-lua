import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class LessonServiceStub {

    getLessonContent(path: string) {
        return of('some lesson content');
    }
}
