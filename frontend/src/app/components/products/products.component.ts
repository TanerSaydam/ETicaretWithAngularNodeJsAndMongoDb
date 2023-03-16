import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModel } from './models/product.model';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { ProductPipe } from './pipes/product.pipe';
import { ProductService } from './services/product.service';
import { CryptoService } from 'src/app/commons/services/crypto.service';
import { UserModel } from '../users/models/user.model';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/commons/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { RoutesModel } from 'src/app/commons/components/blank/models/routes.model';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule, ProductPipe, MatSlideToggleModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  products: ProductModel[] = [];
  search: string = "";
  user: UserModel = new UserModel();
  product: ProductModel = new ProductModel();
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

  getAll(){
    this._product.getAll(res=>{
      this.products = res;
    })
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

}