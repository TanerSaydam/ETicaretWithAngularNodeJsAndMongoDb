import { inject } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthService } from "./components/auhts/services/auth.service";

export const routes: Routes = [
    {
      path: "login",
      loadComponent: ()=> import("./components/auhts/login/login.component").then(c=> c.LoginComponent)
    },
    {
        path: "confirmMail/:value",
        loadComponent: ()=> import("./components/auhts/confirm-mail/confirm-mail.component").then(c=> c.ConfirmMailComponent)
    },
    {
        path: "forgot-password/:value",
        loadComponent: ()=> import("./components/auhts/forgot-password/forgot-password.component").then(c=> c.ForgotPasswordComponent)
    },
    {
        path: "forgot-password/:value/:code",
        loadComponent: ()=> import("./components/auhts/forgot-password/forgot-password.component").then(c=> c.ForgotPasswordComponent)
    },
    {
        path: "register",
        loadComponent:()=> import("./components/auhts/register/register.component").then(c=> c.RegisterComponent)
    },
    {
        path: "",
        loadComponent: ()=> import("./components/layouts/layouts.component").then(c=> c.LayoutsComponent),
        canActivateChild: [()=> inject(AuthService).isLogged()],
        children: [
            {
                path: "",
                loadComponent: ()=> import("./components/home/home.component").then(c=> c.HomeComponent)
            },
            {
                path: "admin",
                children: [
                    {
                        path: "categories",
                        loadComponent: ()=> import("./components/categories/categories.component").then(c=> c.CategoriesComponent)
                    },
                    {
                        path: "products",
                        children: [
                            {
                                path:"",
                                loadComponent: ()=> import("./components/products/components/products/products.component").then(c=> c.ProductsComponent)
                            },
                            {
                                path: "add",
                                loadComponent: ()=> import("./components/products/components/product-add/product-add.component").then(c=> c.ProductAddComponent)
                            },
                            {
                                path: "update/:value",
                                loadComponent: ()=> import("./components/products/components/product-update/product-update.component").then(c=> c.ProductUpdateComponent)
                            }
                        ]
                    }
                ]
            },
            {
                path: "baskets",
                loadComponent: ()=> import("./components/baskets/baskets.component").then(c=> c.BasketsComponent)
            },
            {
                path: "**",
                loadComponent:()=> import("./components/not-found/not-found.component").then(c=> c.NotFoundComponent)
            }
        ]
    }    
]