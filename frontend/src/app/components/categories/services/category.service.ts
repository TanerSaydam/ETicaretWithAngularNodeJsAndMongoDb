import { Injectable } from '@angular/core';
import { MessageResultModel } from 'src/app/commons/models/message-result.model';
import { GenericHttpService } from 'src/app/commons/services/generic-http.service';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(callBack: (res: CategoryModel[]) => void){
    this._http.get<CategoryModel[]>("categories/getAll", res=>{
      callBack(res);
    });
  }

  add(model: any, callBack: (res:MessageResultModel) => void){
    this._http.post<MessageResultModel>("categories/add",model, res=>{
      callBack(res);
    });
  }

  update(model: any, callBack: (res: MessageResultModel) => void){
    this._http.post<MessageResultModel>("categories/update", model, res=>{
      callBack(res);
    })
  }

  removeById(model: any, callBack: (res:MessageResultModel) => void){
    this._http.post<MessageResultModel>("categories/removeById",model, res=>{
      callBack(res);
    });
  }
}
