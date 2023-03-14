import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { AuthService } from '../../auhts/services/auth.service';
import { SwalService } from 'src/app/commons/services/swal.service';
import { CryptoService } from 'src/app/commons/services/crypto.service';
import { UserModel } from '../../users/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: UserModel = new UserModel();
constructor(
  public _auth: AuthService,
  private _swal: SwalService,
  private _crypto: CryptoService
){
 this.user = JSON.parse(this._crypto.decryption(localStorage.getItem("user")))  
}

logout(){
  this._swal.callSwal("Çıkış yapmak istiyor musunuz?","Çıkış Yap",()=>{
    this._auth.logout();
  });
}
}
