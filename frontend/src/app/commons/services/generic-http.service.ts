import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeLoading } from '../components/loading-button/states/loading-actions';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api: string = "http://localhost:3000/api/";
  isLoading: boolean = false;

  constructor(
    private _http: HttpClient,
    private store: Store<{isLoading: boolean}>,
    private _err: ErrorService
  ) { 
    this.store.select("isLoading").subscribe(res=>{
      this.isLoading = res;
    })
  }

  setApiUrl(api: string, isDiffrentApi: boolean){
    if(isDiffrentApi)
      return api;
    
    return this.api + api;
  }
  //this._http.get<AuthModel>("http://localhost:2000",res=>{},true)

  get<T>(api:string, callBack:(res:T)=> void, isDiffrentApi: boolean = false,options = {}){
    this.store.dispatch(changeLoading()); //true
    this._http.get<T>(this.setApiUrl(api,isDiffrentApi), {}).subscribe({
      next: (res)=>{
        callBack(res);
        if(this.isLoading)
          this.store.dispatch(changeLoading()); //false
      },
      error: (err: HttpErrorResponse)=>{
        this._err.errorHandler(err);
        if(this.isLoading)
          this.store.dispatch(changeLoading()); //false
      }
    })
  }

  post<T>(api: string, model:any, callBack: (res:T)=>void,isDiffrentApi: boolean = false,options = {}){
    this.store.dispatch(changeLoading()); //true
    this._http.post<T>(this.setApiUrl(api,isDiffrentApi),model, {}).subscribe({
      next: (res)=>{
        callBack(res);
        if(this.isLoading)
          this.store.dispatch(changeLoading()); //false
      },
      error: (err: HttpErrorResponse)=>{
        this._err.errorHandler(err);
        if(this.isLoading)
          this.store.dispatch(changeLoading()); //false
      }
    });
  }
}
