import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HomeService } from '.';

fdescribe('HomeService', () => {
    let homeService: HomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService],
    });
    homeService = TestBed.inject(HomeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should capture the contents of the README.md file (HttpClient called once)', fakeAsync(() => {
    const expectedContent = 'Some text content from the README';
    const req = httpTestingController.expectOne('assets/README.md');

    homeService.homeContent$
        .subscribe((content: string) => {
            expect(content).toEqual(expectedContent, 'expected content');
            expect(req.request.method).toBe('GET');
        },
        fail
    );
    tick();

    req.flush(expectedContent);
  }));
});
