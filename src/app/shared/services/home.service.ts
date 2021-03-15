import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  homeContent$ = this.http.get('assets/README.md', {responseType: 'text'});

  constructor(private http: HttpClient) {}
}
