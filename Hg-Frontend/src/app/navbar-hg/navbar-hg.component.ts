import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService/http.service';

@Component({
  selector: 'navbar-hg',
  templateUrl: './navbar-hg.component.html',
  styleUrls: ['./navbar-hg.component.css'],
})
export class NavbarHgComponent implements OnInit {
  // linkList: NavRoute[];
  constructor(public http: HttpService) {
    // this.linkList = [];
  }
  @Input() loginRequired: boolean = true;

  get linkList(): NavRoute[] {
    let linkList = [new NavRoute('Home', 'welcome')];
    if (this.http.loginRequired) {
      linkList.push(new NavRoute('Login', 'login'));
      linkList.push(new NavRoute('Signup', 'signup'));
    } else {
      if (this.http.userDetails.roleNames.includes('Programmer')) {
        linkList.push(new NavRoute('Tasks', 'tasks'));
      }
      if (this.http.userDetails.roleNames.includes('Manager')) {
        linkList.push(new NavRoute('Projects', 'projects'));
      }
      linkList.push(new NavRoute('Logout', 'logout'));
    }
    // this.linkList = linkList;
    return linkList;
  }

  ngOnInit(): void {
    //this.updateLinkList();
  }
}

class NavRoute {
  public name: string = '';
  public routerLink: string = '';
  public constructor(name: string, routerLink: string) {
    this.name = name;
    this.routerLink = routerLink;
  }
}
