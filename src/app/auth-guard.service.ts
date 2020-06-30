import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './services/authentication-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
      public authFire: AuthenticationService,
      public router: Router
  ) {
  }

  canActivate() {
    console.log('Check isLoggedIn', this.authFire.isLoggedIn);
    if (!this.authFire.isLoggedIn) {
      this.router.navigate(['tabs/tab1']);
      return false;
    }
    return true;
  }
}
