import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageResultModel } from 'src/app/commons/models/message-result.model';
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

  googleLogin(model: any){
    this._http.post<AuthModel>("auth/googleLogin",model,res=>{
      localStorage.setItem("accessToken", 
      this._crypto.encryption(res.token));
      localStorage.setItem("user",
      this._crypto.encryption(JSON.stringify(res.user)));
      this._router.navigateByUrl("/");
      this._toastr.success("Başarıyla giriş yapıldı!");
    });
  }

  register(model: any){
    this._http.post<MessageResultModel>("auth/register",model, res=>{
      this._toastr.success(res.message);
      this._router.navigateByUrl("/login");
    })
  }

  logout(){
    localStorage.clear();
    window.location.href = "/login"
    //this._router.navigateByUrl("/login");
    this._toastr.info("Başarıyla çıkış yapıldı!");
  }

  sendConfirmMail(value: string){
    let model = {emailOrUserName: value}
    this._http.post<MessageResultModel>("auth/sendConfirmMail",model,res=>{
      this._toastr.info(res.message);
      let element = document.getElementById("confirmEmailModalCloseBtn");
      element.click();
    });
  }

  sendForgotPasswordMail(value: string){
    let model = {emailOrUserName: value}
    this._http.post<any>("auth/sendForgotPassword",model,res=>{
      this._toastr.info("Şifre yenileme için mailiniz başarıyla gönderildi");
      this._router.navigateByUrl(`/forgot-password/${res._id}`);
      let element = document.getElementById("sendForgotPasswordEmailModalCloseBtn");
      element.click();
    })
  }

  refreshPassword(model: any){
    this._http.post<MessageResultModel>("auth/refreshPassword", model, res=>{
      this._toastr.info(res.message);
      this._router.navigateByUrl("/login");
    });
  }

  confirmMail(code: string, callBack: (res:MessageResultModel)=>void){
    let model = {code: code}
    this._http.post<MessageResultModel>("auth/confirm-mail",model, res=>{
      callBack(res);
    });
  }

  isLogged(){
    let token = localStorage.getItem("accessToken");
    if(token != null && token != undefined){
      return true;
    }

    this._router.navigateByUrl("/login");
    return false;    
  } 
}
