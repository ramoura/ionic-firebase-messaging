import {Component} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  loading = false;

  constructor(
      public authService: AuthenticationService,
      public router: Router) {
  }


  async onSubmit() {
    if (!this.emailFormControl.invalid && !this.passwordFormControl.invalid) {
      this.loading = true;
      this.authService.SignIn(this.emailFormControl.value, this.passwordFormControl.value)
          .then((res) => {
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            window.alert(error.message);
          });
    }
  }

  logout() {
    this.authService.SignOut();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
