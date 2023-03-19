import { ProductModel } from "../../products/models/product.model";

export class BasketModel{
    _id: string = "";
    productId: string = "";
    product: ProductModel[] = [];
    quantity: number = 0;
    price: number = 0;
    userId: string = "";
}