import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class ActivatedRouteStub {

    routeChangeObject = {
        get: () => 'some path'
    };

    paramMap = of(this.routeChangeObject);
}
