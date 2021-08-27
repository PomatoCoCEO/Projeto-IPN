import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthActivator implements CanActivate {
  constructor(private http: HttpService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let ans = !this.http.loginRequired;
    if (!ans) {
      this.router.navigate(['login']);
    }
    return ans;
  }
}
