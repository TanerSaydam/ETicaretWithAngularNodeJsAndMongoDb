import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValid]',
  standalone: true
})
export class ValidDirective {

  @Input() appValid: boolean = false;
  constructor(
    private _el: ElementRef<HTMLInputElement>
  ) { }

  @HostListener("keyup") keyup(){
    this._el.nativeElement.className = "";
    if(this.appValid)
      this._el.nativeElement.className = "form-control is-valid";
    else
      this._el.nativeElement.className = "form-control is-invalid";
  }

}
