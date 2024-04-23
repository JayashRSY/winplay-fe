import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserCardComponent {
  @Input() user: any;
}
