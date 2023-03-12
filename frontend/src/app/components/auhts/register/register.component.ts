import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SharedModule } from 'src/app/commons/modules/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private _auth: AuthService
  ){}

  register(form: NgForm){
    if(form.valid){
      this._auth.register(form.value);
    }
  }

  showOrHidePassword(password: HTMLInputElement){
    if(password.type == "password")
      password.type = "text"
    else{
      password.type = "password"
    }
  }
}
