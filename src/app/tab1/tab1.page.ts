import {Component, OnInit} from '@angular/core';
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

  constructor(
      public authService: AuthenticationService,
      public router: Router) {
  }


  async onSubmit() {
    if (!this.emailFormControl.invalid && !this.passwordFormControl.invalid) {
      this.authService.SignIn(this.emailFormControl.value, this.passwordFormControl.value)
          .then((res) => {
            this.router.navigate(['tabs/tab2']);
          })
          .catch((error) => {
            window.alert(error.message);
          });
    }
  }

  logout() {
    this.authService.SignOut();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
