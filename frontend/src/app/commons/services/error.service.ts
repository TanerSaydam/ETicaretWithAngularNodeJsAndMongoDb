import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private _toastr: ToastrService
  ) { }

  errorHandler(err: HttpErrorResponse){
    if(err.status == 0 || err.status == 404)
      this._toastr.error("Api adresine ulaşılamıyor!");
    else if(err.status == 500 || err.status == 400)
      this._toastr.error(err.error.message);
      
    console.log(err);
  }
}
