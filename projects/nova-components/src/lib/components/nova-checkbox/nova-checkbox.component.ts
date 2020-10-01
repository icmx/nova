import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nova-checkbox',
  templateUrl: './nova-checkbox.component.html',
  styleUrls: ['./nova-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaCheckboxComponent),
      multi: true,
    },
  ],
})
export class NovaCheckboxComponent implements ControlValueAccessor {
  private _value: boolean;

  @Input()
  public name: string = null;

  @Input()
  public set value(value: boolean) {
    this._value = value;
    this.changed.emit(value);

    if (value === true) {
      this.checked.emit(value);
    } else {
      this.unchecked.emit(value);
    }

    this.onChange(value);
    this.onTouched(value);
  }

  public get value(): boolean {
    return this._value;
  }

  @Input()
  public disabled: boolean = false;

  @Input()
  public readonly: boolean = false;

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('attr.disabled')
  public get attrDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('attr.readonly')
  public get attrReadonly(): boolean {
    return this.readonly;
  }

  @Output()
  public unchecked: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('click')
  public click(): void {
    if (!this.disabled && !this.readonly) {
      this.value = !this.value;
    }
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(value: boolean): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
