import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(text: string,confirmBtnName: string, callBack:()=> void,type: SweetAlertIcon = "question"){
    Swal.fire({
      text: text,
      showConfirmButton:true,
      confirmButtonText: confirmBtnName,
      showCancelButton: true,
      cancelButtonText: "Vazgeç",
      icon: type,      
    }).then(res=>{
      if(res.isConfirmed)
        callBack();
    });
  }
}
