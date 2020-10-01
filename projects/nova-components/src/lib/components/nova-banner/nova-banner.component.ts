import { Component, Input, HostBinding } from '@angular/core';

/*
 * NovaBannerComponent
 *
 * How to Use:
 *
 *   1. In parent component, create the following markup:
 *
 *       <nova-banner #novaBanner>Text to display</nova-banner>
 *
 *   2. Next, add the @ViewChild:
 *
 *       @ViewChild('novaBanner') novaBanner: NovaBannerComponent;
 *
 *   3. Now you can trigger the banner by using this.novaBanner.expand()
 *      from parent component markup or code.
 */

@Component({
  selector: 'nova-banner',
  templateUrl: './nova-banner.component.html',
  styleUrls: ['./nova-banner.component.scss'],
})
export class NovaBannerComponent {
  private _expanded: boolean = false;
  private _timeoutRunning: boolean = false;

  @Input()
  public timeout: number = 2000;

  @HostBinding('class.expanded')
  public get classExpanded(): boolean {
    return this._expanded;
  }

  public expand(): void {
    if (!this._timeoutRunning) {
      this._expanded = true;

      setTimeout(() => {
        this._expanded = false;
      }, this.timeout);
    }
  }
}
