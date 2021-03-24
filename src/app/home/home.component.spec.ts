import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { HomeService } from '../shared/services';
import { HomeServiceStub } from '../testing/home-service.stub';

import { HomeComponent } from './home.component';

const homeServiceStub = new HomeServiceStub();

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: HomeService, useValue: homeServiceStub}
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get the homeContent$ value from HomeService', fakeAsync(() => {
    component.homeContent$
      .pipe(take(1))
      .subscribe(data => expect(data).toBe('foo'));

    tick();
  }));
});
