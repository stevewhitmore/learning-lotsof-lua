import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonComponent } from './lesson.component';

fdescribe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonComponent ]
    });

    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
