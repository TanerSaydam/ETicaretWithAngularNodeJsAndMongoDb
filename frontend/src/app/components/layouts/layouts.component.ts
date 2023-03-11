import { Component } from '@angular/core';

import { SharedModule } from 'src/app/commons/modules/shared.module';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent {

}
