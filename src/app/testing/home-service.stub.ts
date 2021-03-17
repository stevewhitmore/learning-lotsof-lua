import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class HomeServiceStub {
  homeContent$ = of('foo');
}
