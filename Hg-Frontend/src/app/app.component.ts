import { Component } from '@angular/core';
import { HttpService } from './services/httpService/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public http: HttpService) {}
  title = 'Hg-Frontend';
}
