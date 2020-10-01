import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'nova-table-sorting-indicator',
  templateUrl: './nova-table-sorting-indicator.component.html',
  styleUrls: ['./nova-table-sorting-indicator.component.scss'],
})
export class NovaTableSortingIndicatorComponent {
  /**
   * Selection state to define selected column in table.
   */
  @Input()
  public selected: boolean = false;

  /**
   * Sorting direction: `true` for ASCENDING and `false` for DESCENDING.
   */
  @Input()
  public direction: boolean = false;

  @HostBinding('class')
  public get class(): string {
    let result: string = null;

    if (this.selected) {
      result = `selected ${this.direction ? 'ascending' : 'descending'}`;
    } else {
      result = `unselected undefined`;
    }

    return result;
  }
}
