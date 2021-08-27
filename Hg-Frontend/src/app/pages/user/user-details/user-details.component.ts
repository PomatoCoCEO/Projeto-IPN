import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';
import { ManagerStats } from 'src/app/shared/manager';
import { ProgrammerStats } from 'src/app/shared/programmer';
import { SignUpViewModel } from 'src/app/shared/signup';
import { UserStats } from 'src/app/shared/user';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetails implements OnInit, OnChanges {
  public user = new UserStats();
  public str: string | null = '';
  constructor(public http: HttpService, private acRoute: ActivatedRoute) {}

  public roleString(): string {
    let ans = '';
    for (let i = 0; i < this.user.info.roleNames.length; i++) {
      ans += this.user.info.roleNames[i];
      if (i != this.user.info.roleNames.length - 1) ans += ', ';
    }
    return ans;
  }

  ngOnInit(): void {
    this.str = this.acRoute.snapshot.paramMap.get('username');
    if (this.str != null)
      this.http.getUserDetails(this.str).subscribe(
        () => {
          this.user = this.http.userSearchDetails;
          // alert('User Details: ' + JSON.stringify(this.user));
        },
        (error) => {
          alert('Error: ' + error.error);
        }
      );
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}
