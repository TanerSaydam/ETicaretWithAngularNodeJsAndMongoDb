import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { RoutesModel } from 'src/app/commons/components/blank/models/routes.model';
import { RoutesService } from 'src/app/commons/services/routes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product.model';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/components/categories/models/category.model';
import { CategoryService } from 'src/app/components/categories/services/category.service';
import { ProductService } from '../../services/product.service';
import { SwalService } from 'src/app/commons/services/swal.service';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  routes: RoutesModel[] = [];
  productId: string = "";
  product: ProductModel = new ProductModel();
  categories: CategoryModel[] = [];
  images:any;
  constructor(
    private _routes: RoutesService,
    private _activated: ActivatedRoute,
    private _category: CategoryService,
    private _product: ProductService,
    private _router: Router,
    private _swal: SwalService
  ) {
    this._activated.params.subscribe(res => {
      if(res["value"]){
      this.productId = res["value"];
      this.getById();
      this.routes = [
        {
          name: "Ürünler",
          class: "",
          link: "/admin/products"
        },
        {
          name: "Ürün Güncelleme",
          class: "active",
          link: "/admin/products/update/" + this.productId
        }
      ]
      this.routes = this._routes.getRoutes(this.routes);
    }else{
      this._router.navigateByUrl("/");
    }
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._category.getAll(res=>{
      this.categories = res;
    });
  }

  getById(){
    this._product.getById(this.productId, res=>{
      this.product = res
    });
  }

  update(form: NgForm){

  }

  deleteImage(){
    this._swal.callSwal("Resmi silmek istiyor musunuz?","Sil",()=>{

    })
  }

  getImages(event:any){    
    this.images = event.target.files;
  }

}
