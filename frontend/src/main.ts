import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from '@angular/common/http'
import { RouterModule } from "@angular/router";
import { routes } from "./app/router";
import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./app/commons/components/loading-button/states/loading-reducer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(routes),
      StoreModule.forRoot({isLoading: loadingReducer}),
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        closeButton: true,
        progressBar: true,
        timeOut: 3000,
        preventDuplicates: true
      }),
      SweetAlert2Module.forRoot()
    )
  ]
})