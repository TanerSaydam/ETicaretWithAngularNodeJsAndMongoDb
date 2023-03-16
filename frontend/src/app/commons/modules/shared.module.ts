import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidDirective } from '../directives/valid.directive';
import { LoadingButtonComponent } from '../components/loading-button/loading-button.component';
import { BlankComponent } from '../components/blank/blank.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidDirective,
    LoadingButtonComponent,
    BlankComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidDirective,
    LoadingButtonComponent,
    BlankComponent
  ]
})
export class SharedModule { }
