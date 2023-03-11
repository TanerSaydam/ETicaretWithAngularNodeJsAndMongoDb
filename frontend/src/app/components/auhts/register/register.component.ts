import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SharedModule } from 'src/app/commons/modules/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(){}

  register(form: NgForm){

  }

  showOrHidePassword(password: HTMLInputElement){
    if(password.type == "password")
      password.type = "text"
    else{
      password.type = "password"
    }
  }
}
