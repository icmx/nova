import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  forwardRef,
  ElementRef,
  ViewChild,
  HostBinding,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
} from '@angular/forms';

import { Item } from '../classes/item';
import { Comparer } from '../common/comparer/comparer';
import { Floater, FloaterPosition } from '../common/floater/floater';
import { Mixin } from '../common/mixin/mixin';

@Component({
  selector: 'nova-dropdown',
  templateUrl: './nova-dropdown.component.html',
  styleUrls: [
    './nova-dropdown.component.scss',
    '../common/floater/floater.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NovaDropdownComponent),
      multi: true,
    },
  ],
})
export class NovaDropdownComponent
  implements OnInit, ControlValueAccessor, Floater, OnChanges {
  public _expanded: boolean;
  public _inside: boolean;

  @ViewChild('head', { static: false }) public head: ElementRef;
  @ViewChild('body', { static: false }) public body: ElementRef;

  public position: FloaterPosition = 'bottom';

  @HostListener('click') public _onClickInside: () => void;
  @HostListener('document:click') public _onClickOutside: () => void;

  public initAsFloater: () => void;
  public collapseBody: () => void;
  public collapseBodyAfterItemSelected: () => void;
  public expandBody: () => void;
  public toggleBody: () => void;
  public updateBodyPosition: () => void;

  @Input()
  public items: Array<Item> = [];

  @Input()
  public value: Item;

  @Input()
  public placeholder: string = '--';

  @Input()
  public disabled: boolean = false;

  @Input()
  public allowUnselected: boolean = false;

  @Input()
  public suggestionsEnabled: boolean = false;

  @Input()
  public suggestionsMax: number = -1;

  @Input()
  public stubholder: string = 'No items available';

  @Input()
  public headStyleOverrides: object = null;

  @Input()
  public bodyStyleOverrides: object = null;

  @Output()
  public changed: EventEmitter<Item> = new EventEmitter<Item>();

  @HostBinding('attr.disabled')
  public get attrDisabled(): boolean {
    return this.disabled;
  }

  public filterValue: string = '';

  public get visibleItems(): Array<Item> {
    const result: Array<Item> = [];

    // TODO:Clean this
    if (this.items) {
      if (this.suggestionsEnabled) {
        for (
          let i: number = 0;
          i < this.items.length &&
          (i < this.suggestionsMax || this.suggestionsMax === -1);
          i++
        ) {
          if (Comparer.areStringsSame(this.items[i].label, this.filterValue)) {
            result.push(this.items[i]);
          }
        }
      } else {
        for (let i: number = 0; i < this.items.length; i++) {
          result.push(this.items[i]);
        }
      }
    }

    return result;
  }

  public get label(): string {
    return this.value ? this.value.label : this.placeholder;
  }

  private _onTouchedCallback: (value: any) => void = () => {};
  private _onChangeCallback: (value: any) => void = () => {};

  public catch(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  public selectItem(item: Item): void {
    this.collapseBodyAfterItemSelected();
    this.value = item;
    this.filterValue = item ? this.label : '';

    this._onChangeCallback(this.value);
    this._onTouchedCallback(this.value);

    this.changed.emit(item);
  }

  public clearItem(event: any): void {
    if (this.value) {
      this.selectItem(null);
    } else {
      this.toggleBody();
    }

    this.filterValue = '';
  }

  public get showPlaceholder(): boolean {
    return !this.showStubholder && this.allowUnselected;
  }

  public get showStubholder(): boolean {
    return this.visibleItems.length === 0;
  }

  public get showClearButton(): boolean {
    return this.value && this.allowUnselected;
  }

  public get showDownButton(): boolean {
    return !this.value || !this.allowUnselected;
  }

  public expandBodyOnKeyUp(event: any): void {
    this.expandBody();
  }

  public ngOnInit(): void {
    Mixin.Apply(NovaDropdownComponent, [Floater]);
    this.initAsFloater();
  }

  public writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public validate(formControl: FormControl): boolean {
    return this.allowUnselected || formControl.value !== this.value;
  }

  // TODO: fix this, now reacts to all changes, even those at first caused inside the component.
  // This fix only responds to deletion of value, I think, need to respond to any change.
  public ngOnChanges(changes: SimpleChanges) {
    if (
      changes['value'] &&
      !changes['value'].currentValue &&
      changes['value'].previousValue
    ) {
      this.filterValue = '';
    }
  }
}
