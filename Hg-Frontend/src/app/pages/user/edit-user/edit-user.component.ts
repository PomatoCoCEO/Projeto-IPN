import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';
import { SignUpViewModel } from 'src/app/shared/signup';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnChanges {
  constructor(public http: HttpService, private router: Router) {}
  public user = new SignUpViewModel();
  public photoFile: any = undefined;
  public currPassword: string = '';

  updateUser() {
    let u = new UserEditModel();
    u.data = new SignUpViewModel(this.user);
    u.currPassword = new String(this.currPassword).toString();
    this.http.updateUser(u).subscribe(
      () => {
        var prevUsername = this.http.userDetails.username;
        this.http.userDetails = this.user;
        this.user = new SignUpViewModel();
        this.http.token = '';
        this.router.navigate(['/login']);
        alert('Profile updated successfully! Login to see changes!');
      },
      (error) => {
        alert('Error: ' + error.error);
      }
    );
  }

  onSubmit(event: any) {
    event.preventDefault();
    var formData: FormData = new FormData();
    let f = false;
    if (event.target.elements.namedItem('photoFileUpdate').files.length > 0) {
      var file = event.target.elements.namedItem('photoFileUpdate').files[0];
      formData.append('uploadedFile', file, file.name);
      f = true;
    }
    if (f) {
      this.http.postPhoto(formData, this.http.userDetails.username).subscribe(
        () => {
          this.updateUser();
        },
        (error) => {
          alert('Error updating photo: ' + error.error);
        }
      );
    } else {
      this.updateUser();
    }
    /*
    this.http.userDetails = this.user;
    this.http.updateUser().subscribe(() => {
      alert('User updated successfully');
    });*/
    // submit stuff
  }
  ngOnInit(): void {
    this.user = new SignUpViewModel(this.http.userDetails);
  }

  ngOnChanges() {
    this.user = new SignUpViewModel(this.http.userDetails);
  }
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
}

export class UserEditModel {
  public currPassword: string = '';
  public data = new SignUpViewModel();

  constructor(...args: any[]) {
    if (args.length == 0 || args[0] == null) return;
    let u = args[0];
    this.currPassword = new String(u.currPassword).toString();
    this.data = new SignUpViewModel(u.data);
  }
}
