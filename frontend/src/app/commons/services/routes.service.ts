import { Injectable } from '@angular/core';
import { RoutesModel } from '../components/blank/models/routes.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor() { }

  getRoutes(routes: RoutesModel[]){
    let newRoutes: RoutesModel[] = [
      {
        name: "Ana Sayfa",
        class: "",
        link: "/"
      }
    ];

    newRoutes.push(...routes);

    return newRoutes;
  }
}
