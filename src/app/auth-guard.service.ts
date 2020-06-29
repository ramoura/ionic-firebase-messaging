import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
      public router: Router) {
  }

  canActivate() {
    if (true) {
      this.router.navigate(['tabs/tab1']);
      return false;
    }
    return true;
  }
}
