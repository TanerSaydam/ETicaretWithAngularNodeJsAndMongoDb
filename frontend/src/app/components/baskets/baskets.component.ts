import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/commons/modules/shared.module';
import { RoutesModel } from 'src/app/commons/components/blank/models/routes.model';
import { BasketModel } from './models/basket.model';
import { BasketService } from './services/basket.service';
import { CryptoService } from 'src/app/commons/services/crypto.service';
import { ProductModel } from '../products/models/product.model';
import { TrCurrencyPipe } from 'tr-currency';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/commons/services/swal.service';

@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [SharedModule, TrCurrencyPipe],
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {
  routes: RoutesModel[] = [
    {
      name: "Ana Sayfa",
      link: "/",
      class: "",
    },   
    {
      name: "Sepet",
      link: "/baskets",
      class: "active"
    }
  ]

  baskets: BasketModel[] = [];
  sum: number = 0;
  product: ProductModel = new ProductModel();
  constructor(
    private _basket: BasketService,
    private _crypto: CryptoService,
    private _toastr: ToastrService,
    private _swal: SwalService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    if(localStorage.getItem("user")){
      let userString = localStorage.getItem("user");
      let user = JSON.parse(this._crypto.decryption(userString));
      this._basket.getAll(user._id, res=> {
        this.baskets = res.data
        console.log(this.baskets);
        this.sum = 0;
        this.baskets.forEach(element=>{
          this.sum += (element.price * element.quantity);
        })
      });
    };    
  }

  setImageForModal(product: ProductModel){
    this.product = {...product};
  }

  changeQuantity(_id: string, quantity: number){
    if(quantity < 1){
      this.removeById(_id, "Ürün adedini bir azaltırsanız adet 0 olacağından dolayı sepetinizden silinecektir. Devam etmek istiyor musunuz?", "Devam")
    }else{
      this._basket.changeQuantity(_id, quantity, res=>{
        this._toastr.info(res.message);
        this.getAll();
      })
    }
  }

  removeById(_id: string, text: string = "Sepetteki ürünü silmek istiyor musunuz?", btnName: string = "Sil"){ 
    this._swal.callSwal(text,btnName, ()=>{
      this._basket.removeById(_id, res=>{
        this._toastr.warning(res.message);
        this.getAll();
      });
    });
  }

}
