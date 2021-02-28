import { Component, OnInit } from '@angular/core';
import { LessonService } from '../shared/lesson.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navData$ = this.lessonService.navigationTree$;

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.lessonService.navigationTree$.subscribe(console.log)
  }

}
