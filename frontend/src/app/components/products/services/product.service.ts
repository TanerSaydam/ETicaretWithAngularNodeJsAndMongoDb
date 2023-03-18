import { Injectable } from '@angular/core';
import { MessageResultModel } from 'src/app/commons/models/message-result.model';
import { PaginationResponseModel } from 'src/app/commons/models/pagination-response.model';
import { RequestModel } from 'src/app/commons/models/request.model';
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

  update(model:FormData, callBack: (res: MessageResultModel)=> void){
    this._http.post<MessageResultModel>("products/update",model, res=>{
      callBack(res);
    })
  }

  getAll(model: RequestModel,callBack: (res: PaginationResponseModel<ProductModel[]>)=> void){
    this._http.post<PaginationResponseModel<ProductModel[]>>("products",model, res=>{
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

  getById(id: string, callBack: (res:ProductModel)=> void){
    let model = {_id: id};
    this._http.post<ProductModel>("products/getById", model, res=>{
      callBack(res);
    });
  }

  removeImageByProductIdAndIndex(_id: string, index: number, callBack: (res:MessageResultModel)=> void){
    let model = {_id: _id, index: index};
    this._http.post<MessageResultModel>("products/removeImageByProductIdAndIndex",model,res=>{
      callBack(res);
    });
  }

  getAllByHomePage(model: RequestModel, callBack: (res: PaginationResponseModel<ProductModel[]>) => void){
    this._http.post<PaginationResponseModel<ProductModel[]>>("products/getAllByHomePage",model,res=>{
      callBack(res);
    })
  }
}
