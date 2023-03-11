import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CryptoService } from 'src/app/commons/services/crypto.service';
import { GenericHttpService } from 'src/app/commons/services/generic-http.service';
import { AuthModel } from '../login/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: GenericHttpService,
    private _router: Router,
    private _crypto: CryptoService,
    private _toastr: ToastrService
  ) { }

  login(model: any){
    this._http.post<AuthModel>("auth/login",model,res=>{
      localStorage.setItem("accessToken", 
      this._crypto.encryption(res.token));
      localStorage.setItem("user",
      this._crypto.encryption(JSON.stringify(res.user)));
      this._router.navigateByUrl("/");
      this._toastr.success("Başarıyla giriş yapıldı!");
    });
  }

  logout(){
    localStorage.clear();
    this._router.navigateByUrl("/login");
    this._toastr.info("Başarıyla çıkış yapıldı!");
  }
}
