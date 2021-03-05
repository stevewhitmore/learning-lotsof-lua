import { Component } from '@angular/core';
import { HomeService } from '../shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  homeContent$ = this.homeService.homeContent$;

  constructor(private homeService: HomeService) {}
}
