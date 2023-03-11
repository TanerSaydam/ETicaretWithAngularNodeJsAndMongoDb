import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SharedModule } from 'src/app/commons/modules/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login(form: NgForm){

  }

  showOrHidePassword(password: HTMLInputElement){
    if(password.type == "password")
      password.type = "text"
    else{
      password.type = "password"
    }
  }
}
