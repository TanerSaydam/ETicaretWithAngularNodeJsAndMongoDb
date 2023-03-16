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

  add(model:FormData, callBack: (res: MessageResultModel)=> void){
    this._http.post<MessageResultModel>("products/add",model, res=>{
      callBack(res);
    })
  }

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

  changeActiveStatus(_id: string, callBack: (res: MessageResultModel)=> void){
    let model = {_id: _id};
    this._http.post<MessageResultModel>("products/changeActiveStatus",model, res=> {
      callBack(res);
    });
  }
}
