import { Component, Input } from '@angular/core';

@Component({
  selector: 'nova-menu-item',
  templateUrl: './nova-menu-item.component.html',
  styleUrls: ['./nova-menu-item.component.scss'],
})
export class NovaMenuItemComponent {
  @Input() direction: string = 'left';
  @Input() href: string = null;

  constructor() {}
}
