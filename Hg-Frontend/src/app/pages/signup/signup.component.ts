import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';
import { DateDay, SignUpViewModel } from 'src/app/shared/signup';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}
  public signup = new SignUpViewModel();
  public dateAid = new DateDay();

  public photoFile: any = undefined;

  public onDateChange(d: Date) {
    this.signup.birthDate = d;
  }

  public errorMessage: string = '';

  public onSignup(event: any) {
    event.preventDefault();
    var formData: FormData = new FormData();
    let f = false;
    if (this.photoFile !== undefined || this.photoFile === '') {
      var file = event.target.elements.namedItem('photoFileSignup').files[0];
      formData.append('uploadedFile', file, file.name);
      f = true;
    }
    this.signup.birthDate = new Date(
      this.dateAid.year,
      this.dateAid.month,
      this.dateAid.day
    );
    this.http.signup(this.signup).subscribe(
      () => {
        if (f) {
          this.http.postPhoto(formData, this.signup.username).subscribe(
            () => {},
            (error) => alert('Errors adding photo: ' + error.error)
          );
        }
        alert('Successfully signed up');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Errors : ' + error.error);
        return;
      }
    );
  }

  public hasPassed(d: Date) {
    /*console.log(typeof d); // STRING!!
    let di = '' + d;
    let r = Date.parse(di);
    return r - new Date().getTime() < 0;*/
    return d < new Date();
  }

  /*
  public isDateValid(day: number, month: number, year: number): boolean {
    if (day < 0 || day > 31 || month < 0 || month > 13) return false;
    let daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let isLeap = year % 4 == 0 && (year % 400 == 0 || year % 100 != 0);
    if (isLeap && month == 2 && day == 29) return true;
    return (
      day <= daysMonths[month - 1] &&
      this.hasPassed(new Date(year, month - 1, day, 0, 0, 0))
    );
  }*/

  public isPasswordValid(password: string): boolean {
    if (password.length < 8) return false;
    let conditions = [0, 0, 0, 0];
    let tot = 0;
    for (let i = 0; i < password.length; i++) {
      let c = password.charAt(i);
      if ('0' <= c && c <= '9') {
        if (conditions[0] == 0) {
          conditions[0]++;
          tot++;
        }
      } else if ('a' <= c && c <= 'z') {
        if (conditions[1] == 0) {
          conditions[1]++;
          tot++;
        }
      } else if ('A' <= c && c <= 'Z') {
        if (conditions[2] == 0) {
          conditions[2]++;
          tot++;
        }
      } else {
        if (conditions[3] == 0) {
          conditions[3]++;
          tot++;
        }
      }
      if (tot == 4) return true;
    }
    return false;
  }

  public updateRole(role: string) {
    let g = this.signup.roleNames.findIndex((r) => r == role);
    if (g == -1) {
      this.signup.roleNames.push(role);
      return;
    }
    let last = this.signup.roleNames.length - 1;
    this.signup.roleNames[g] = this.signup.roleNames[last];
    this.signup.roleNames.pop();
  }

  ngOnInit(): void {}
}
