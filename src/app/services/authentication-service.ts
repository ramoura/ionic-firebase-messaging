import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
      public ngFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  SignOut() {
    return this.ngFireAuth.signOut();
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }


}
