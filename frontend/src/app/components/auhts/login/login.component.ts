import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SharedModule } from 'src/app/commons/modules/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private _auth: AuthService,
    private authService: SocialAuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this._auth.googleLogin(this.user);
    });
  }

  login(form: NgForm) {
    if (form.valid) {
      this._auth.login(form.value);
    }
  }

  showOrHidePassword(password: HTMLInputElement) {
    if (password.type == "password")
      password.type = "text"
    else {
      password.type = "password"
    }
  }

  sendConfirmMail(form: NgForm) {
    if (form.valid)
      this._auth.sendConfirmMail(form.controls["emailOrUserNameForConfirmEmail"].value);
  }

  sendForgotPasswordMail(form: NgForm) {
    if (form.valid) {
      this._auth.sendForgotPasswordMail(form.controls["emailOrUserNameForForgotPassword"].value);
    }
  }
}
