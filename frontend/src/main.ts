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

import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider  
} from '@abacritt/angularx-social-login';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(routes),
      StoreModule.forRoot({isLoading: loadingReducer}),
      BrowserAnimationsModule,   
      SocialLoginModule,
      GoogleSigninButtonModule,         
      ToastrModule.forRoot({
        closeButton: true,
        progressBar: true,
        timeOut: 3000,
        preventDuplicates: true
      }),
      SweetAlert2Module.forRoot()
    ), 
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '91017558654-goh5sforrt31li289kogg62prbmql2p0.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})



