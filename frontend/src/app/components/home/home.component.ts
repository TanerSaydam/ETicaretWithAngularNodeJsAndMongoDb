import { Component, OnInit } from '@angular/core';
import { RoutesModel } from 'src/app/commons/components/blank/models/routes.model';
import { PaginationResponseModel } from 'src/app/commons/models/pagination-response.model';
import { RequestModel } from 'src/app/commons/models/request.model';

import { SharedModule } from 'src/app/commons/modules/shared.module';
import { TrCurrencyPipe } from 'tr-currency';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryPipe } from '../categories/pipes/category.pipe';
import { CategoryService } from '../categories/services/category.service';
import { ProductModel } from '../products/models/product.model';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, CategoryPipe, TrCurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  routes: RoutesModel[] = [
    {
      name: "Ana Sayfa",
      link: "/",
      class: "active",
    },   
  ]
  categories: CategoryModel[] = [];
  search: string = "";
  selectedCategory: string = "Tümü";
  result: PaginationResponseModel<ProductModel[]> = new PaginationResponseModel<ProductModel[]>();
  request: RequestModel = new RequestModel();

  constructor(
    private _categories: CategoryService,
    private _product: ProductService
  ){
    this.request.pageSize = 9;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(){
    this._categories.getAll(res=> this.categories = res);
  }

  getProducts(categoryId: string = ""){
    if(categoryId == ""){
      this._product.getAll(this.request,res=> this.result = res);
    }else{
      this.request.categoryId = categoryId;
      this._product.getAllByHomePage(this.request, res=> this.result = res);
    }    
  }

  changeCategory(_id: string = "", name: string = ""){
    this.selectedCategory = name;    
    this.getProducts(_id);
  }
}
