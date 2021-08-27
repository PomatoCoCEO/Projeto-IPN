import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';
import { LoginViewModel } from 'src/app/shared/login';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public login: LoginViewModel = {
    username: '',
    password: '',
    rememberMe: false,
  };
  public errorMessage: string = '';

  constructor(private http: HttpService, private router: Router) {}

  onLogin(): void {
    this.http.login(this.login).subscribe(
      () => {
        // this.router.navigate(['home']);
        // alert('Successfully logged in');
        /*alert(
          'Login info: ' +
            JSON.stringify(this.http.token) +
            ', ' +
            this.http.expiration
        );*/
        this.router.navigate(['/']);
        // alert('Navigated');
      },
      (error) => {
        // alert('Login unsuccessful: ' + error.error);
        this.errorMessage = error.error;
        // console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
