import { Component, Input } from '@angular/core';

@Component({
  selector: 'nova-field',
  templateUrl: './nova-field.component.html',
  styleUrls: ['./nova-field.component.scss'],
})
export class NovaFieldComponent {
  @Input()
  public id: string = null;

  @Input()
  public label: string = null;

  @Input()
  public showIcon: boolean = false;
}
