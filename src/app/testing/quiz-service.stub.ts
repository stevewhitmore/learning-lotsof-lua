import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuizAnswerModel } from '../shared/models';

@Injectable()
export class QuizServiceStub {

    getQuizContent(path: string) {
        return of('some quiz content');
    }

    passAlongAnswer(answer: QuizAnswerModel) { }
}
