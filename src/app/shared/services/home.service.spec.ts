import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeService } from '.';

fdescribe('HomeService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let homeService: HomeService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    homeService = new HomeService(httpClientSpy as any);
  });

  it('should capture the contents of the README.md file (HttpClient called once)', fakeAsync(() => {
    const expectedContent = 'Some text content from the README';

    httpClientSpy.get.and.returnValue(of(expectedContent));

    homeService.homeContent$.subscribe(
        content => expect(content).toEqual(expectedContent, 'expected content'),
        fail
    );
    tick();

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));
});
