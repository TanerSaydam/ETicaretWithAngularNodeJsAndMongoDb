import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { AuthService } from '../../auhts/services/auth.service';
import { SwalService } from 'src/app/commons/services/swal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(
  public _auth: AuthService,
  private _swal: SwalService
){}

logout(){
  this._swal.callSwal("Çıkış yapmak istiyor musunuz?","Çıkış Yap",()=>{
    this._auth.logout();
  });
}
}
