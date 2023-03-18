import { Component } from '@angular/core';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { CryptoService } from 'src/app/commons/services/crypto.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/commons/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { RoutesModel } from 'src/app/commons/components/blank/models/routes.model';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { UserModel } from 'src/app/components/users/models/user.model';
import { ProductModel } from '../../models/product.model';
import { ProductPipe } from '../../pipes/product.pipe';
import { ProductService } from '../../services/product.service';
import { RequestModel } from 'src/app/commons/models/request.model';
import { PaginationResponseModel } from 'src/app/commons/models/pagination-response.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule, ProductPipe, MatSlideToggleModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  color: ThemePalette = 'accent';  
  disabled = false;
  product: ProductModel = new ProductModel();  
  user: UserModel = new UserModel();
  result: PaginationResponseModel<ProductModel[]> = new PaginationResponseModel<ProductModel[]>();
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  routes: RoutesModel[] = [
    {
      name: "Ana Sayfa",
      link: "/",
      class: "",
    },
    {
      name: "Ürünler",
      link: "/admin/products",
      class: "active",
    }
  ]
  
  constructor(
    private _product: ProductService,
    private _crypto: CryptoService,
    private _router: Router,
    private _swal: SwalService,
    private _toastr: ToastrService
  ){
    this.user = JSON.parse(this._crypto.decryption(localStorage.getItem("user")));
    if(!this.user.isAdmin){
      this._router.navigateByUrl("/");
    }

    this.getAll();    
  }

  getAll(pageNumber = 1){
    this.request.pageNumber = pageNumber;
    this._product.getAll(this.request,res=>{
      this.result = res;
      this.setPageNumbers();
    })
  }

  setPageNumbers(){
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  removeById(product: ProductModel){
    this._swal.callSwal(product.name + " ürünü silmek istiyor musunuz?","Sil", ()=>{
      let model = {_id: product._id};
      this._product.removeById(model, (res)=>{
        this._toastr.warning(res.message);
        this.getAll();
      })
    });    
  }

  setImageForModal(product: ProductModel){
    this.product = {...product};
  }

  changeActiveStatus(_id: string){
    this._product.changeActiveStatus(_id,res=>{
      this._toastr.info(res.message);
    })
  }

  search(){
    if(this.request.search.length >=3){
      this.getAll(1);
    }
  }

}
