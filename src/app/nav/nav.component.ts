import { Component, OnInit } from '@angular/core';
import { LessonService } from '../shared/services/lesson.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  navData$ = this.lessonService.navigationTree$;

  constructor(private lessonService: LessonService) {}

}
