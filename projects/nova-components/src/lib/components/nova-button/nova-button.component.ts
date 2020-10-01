import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'nova-button',
  templateUrl: './nova-button.component.html',
  styleUrls: ['./nova-button.component.scss'],
})
export class NovaButtonComponent {
  @Input()
  public href: string = null;

  @Input()
  public target: string = null;

  @Input()
  public disabled: boolean = false;

  @HostBinding('attr.disabled')
  public get _attrDisabled(): boolean {
    return this.disabled ? true : null;
  }
}
