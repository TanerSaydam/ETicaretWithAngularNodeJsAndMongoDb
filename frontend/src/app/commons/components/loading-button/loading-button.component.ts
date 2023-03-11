import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

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
}
