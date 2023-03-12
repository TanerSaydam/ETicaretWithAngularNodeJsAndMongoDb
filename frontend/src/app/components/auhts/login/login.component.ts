import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SharedModule } from 'src/app/commons/modules/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private _auth: AuthService
  ){}
  login(form: NgForm){
    if(form.valid){
      this._auth.login(form.value);
    }
  }

  showOrHidePassword(password: HTMLInputElement){
    if(password.type == "password")
      password.type = "text"
    else{
      password.type = "password"
    }
  }

  sendConfirmMail(form: NgForm){
    if(form.valid)
      this._auth.sendConfirmMail(form.controls["emailOrUserNameForConfirmEmail"].value);
  }

  sendForgotPasswordMail(form: NgForm){
    if(form.valid){
      this._auth.sendForgotPasswordMail(form.controls["emailOrUserNameForForgotPassword"].value);
    }
  }
}
