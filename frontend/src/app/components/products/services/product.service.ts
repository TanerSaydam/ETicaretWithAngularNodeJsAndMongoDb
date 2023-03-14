import { Injectable } from '@angular/core';
import { MessageResultModel } from 'src/app/commons/models/message-result.model';
import { GenericHttpService } from 'src/app/commons/services/generic-http.service';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(callBack: (res: ProductModel[])=> void){
    this._http.get<ProductModel[]>("products", res=>{
      callBack(res);
    })
  }

  removeById(model: any, callBack: (res: MessageResultModel)=> void){
    this._http.post<MessageResultModel>("products/removeById",model, res=>{
      callBack(res);
    })
  }
}
