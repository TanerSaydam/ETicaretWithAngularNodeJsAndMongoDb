import { Routes } from "@angular/router";
import { AuthGuard } from "./components/auhts/guards/auth.guard";

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
        path: "register",
        loadComponent:()=> import("./components/auhts/register/register.component").then(c=> c.RegisterComponent)
    },
    {
        path: "",
        loadComponent: ()=> import("./components/layouts/layouts.component").then(c=> c.LayoutsComponent),
        canActivateChild: [AuthGuard],
        children: [
            {
                path: "",
                loadComponent: ()=> import("./components/home/home.component").then(c=> c.HomeComponent)
            },
            {
                path: "**",
                loadComponent:()=> import("./components/not-found/not-found.component").then(c=> c.NotFoundComponent)
            }
        ]
    }    
]