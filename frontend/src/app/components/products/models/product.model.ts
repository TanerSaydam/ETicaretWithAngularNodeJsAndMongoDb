import { CategoryModel } from "../../categories/models/category.model";

export class ProductModel{
    _id: string = "";
    name: string = "";
    description: string = "";
    imageUrls: any = [];
    categories: CategoryModel[] = [];
    stock: number = 0;
    price: number = 0;
    isActive: boolean = true;
    createdDate: string = "";
}