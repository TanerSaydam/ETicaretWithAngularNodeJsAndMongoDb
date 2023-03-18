import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { RoutesModel } from 'src/app/commons/components/blank/models/routes.model';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { CategoryModel } from '../../../categories/models/category.model';
import { SwalService } from 'src/app/commons/services/swal.service';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  images: File[] = [];
  imageUrls: any[] = [];
  routes: RoutesModel[] = [
    {
      name: "Ana Sayfa",
      link: "/",
      class: "",
    },
    {
      name: "Ürünler",
      link: "/admin/products",
      class: "",
    },
    {
      name: "Ürün Ekleme",
      link: "/admin/products/add",
      class: "active",
    }
  ]
  categories: CategoryModel[] = [];


  constructor(
    private _product: ProductService,
    private _toastr: ToastrService,
    private _category: CategoryService,
    private _swal: SwalService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getImages(event: any) {
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);
    //this.imageUrls = [];
    console.log(this.images);
    for (let i = 0; i < event.target.files.length; i++) {
      const file: File = event.target.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.addImage(imageUrl, file);
      };
    }
  }

  addImage(imageUrl: string, file:File) {
    this.imageUrls.push(
      {imageUrl: imageUrl, name: file.name, size: file.size});
  }

  removeImage(name: string, size:number,index:number){    
    this._swal.callSwal("Resmi silmek istiyor musunuz?","Sil",()=>{
      this.imageUrls.splice(index,1);
    let i = this.images.findIndex(p=> p.name ==name && p.size == size);
    this.images.splice(i, 1);
  })    
  }

  getCategories() {
    this._category.getAll(res => {
      this.categories = res;
    });
  }

  add(form: NgForm) {
    if(form.value["categoriesSelect"].length == 0){
      this._toastr.error("Kategori seçimi yapmadınız!");
      return;
    }

    if (form.valid) {
      let product = form.value;
      let categories: string[] = product["categoriesSelect"];
      let price = product["price"];
      price = price.toString().replace(",", ".");
      let formData = new FormData();
      formData.append("name", product["name"]);
      formData.append("price", price);
      formData.append("stock", product["stock"]);
      for (const category of categories) {
        formData.append("categories", category);
      }
      formData.append("description", product["description"]);
      for (const image of this.images) {
        formData.append("images", image, image.name);
      }

      this._product.add(formData, res => {
        this._toastr.success(res.message);
        form.reset();
        this.imageUrls = [];
      });
    }
  }
}
