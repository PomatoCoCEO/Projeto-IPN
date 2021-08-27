import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    alert('Logging out...');
    this.http.logout().subscribe(
      // logging out
      () => {
        this.http.token = '';

        this.router.navigate(['/']);
      },
      (error) => {
        alert('Error loggin out: ' + error.error);
      }
    );
  }
}
