import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent {
@Input() form: NgForm;
@Input() btnName: string = "";
@Input() btnClassName: string = "btn-outline-primary w-100";
@Input() btnLoadingClassName: string = "btn-outline-primary w-100";
@Input() btnLoadingName: string = "";
@Input() iconClassName:string = "";
@Input() iconLoadingClassName: string = ""

isLoading$: Observable<boolean>

constructor(
  private store: Store<{isLoading: boolean}>
){
  this.isLoading$ = store.select("isLoading");
} 
}
