import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModel } from './models/category.model';
import { CategoryService } from './services/category.service';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { CategoryPipe } from './pipes/category.pipe';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/commons/services/swal.service';
declare const $: any;

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, CategoryPipe],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();
  search: string = "";

  constructor(
    private _category: CategoryService,
    private _toastr: ToastrService,
    private _swal:SwalService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._category.getAll(res => this.categories = res);
  }

  add(form: NgForm){
    if(form.valid){      
      this._category.add(form.value, res=>{
        this._toastr.success(res.message);
        this.getAll();
        form.reset();
        let element = $("#addModalCloseBtn");
        element.click();
      })
    }
  }

  get(model: CategoryModel){
    this.category = {...model};
  }

  update(form: NgForm){
    if(form.valid){
      this._category.update(this.category, res=> {
        this._toastr.info(res.message);
        this.getAll();
        $("#updateModalCloseBtn").click();        
      })
    }
  }

  removeById(category: CategoryModel){
    let model = {_id: category._id};
    this._swal.callSwal(`${category.name} kategorisini silmek istiyor musunuz?`,"Sil", ()=>{
      this._category.removeById(model,res=>{
        this._toastr.warning(res.message);
        this.getAll();
      });      
    })
  }
}
