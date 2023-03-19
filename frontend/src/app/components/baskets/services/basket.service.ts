import { Injectable } from '@angular/core';
import { MessageResultModel } from 'src/app/commons/models/message-result.model';
import { ResponseModel } from 'src/app/commons/models/response.model';
import { GenericHttpService } from 'src/app/commons/services/generic-http.service';
import { BasketModel } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  count: number = 0;

  constructor(
    private _http: GenericHttpService
  ) { }

  add(model: any, callBack: (res: MessageResultModel) => void){
    this._http.post<MessageResultModel>("baskets/add", model, res=> {
      callBack(res);
      this.count += 1;
    })
  }

  getBasketCount(userId: string){
    let model = {userId: userId};
    this._http.post<ResponseModel<number>>("baskets/getCount",model, res=>{
      this.count = res.data;
    });
  }

  getAll(userId: string, callBack: (res: ResponseModel<BasketModel[]>)=> void){
    let model = {userId: userId};
    this._http.post<ResponseModel<BasketModel[]>>("baskets/getAll",model, res=>{
      callBack(res);
    });
  }

  changeQuantity(_id: string, quantity: number, callBack: (res: MessageResultModel)=> void){
    let model = {_id: _id, quantity: quantity};
    this._http.post<MessageResultModel>("baskets/changeQuantity", model, res=>{
      callBack(res);
    });
  }

  removeById(_id: string, callBack: (res: MessageResultModel)=> void){
    let model = {_id: _id};
    this._http.post<MessageResultModel>("baskets/removeById", model, res=>{
      callBack(res);
      this.count -= 1;
    });
  }
}
