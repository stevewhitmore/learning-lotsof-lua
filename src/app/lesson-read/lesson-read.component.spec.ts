import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonReadComponent } from './lesson-read.component';

describe('LessonReadComponent', () => {
  let component: LessonReadComponent;
  let fixture: ComponentFixture<LessonReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
