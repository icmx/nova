import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nova-radio',
  templateUrl: './nova-radio.component.html',
  styleUrls: ['./nova-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaRadioComponent),
      multi: true,
    },
  ],
})
export class NovaRadioComponent implements ControlValueAccessor {
  @Input() public name: string;
  @Input() public value: any;
  @Input() public checked: boolean;

  @Input() public disabled: boolean = false;
  @Input() public readonly: boolean = false;

  @ViewChild('radio', { static: false }) radio: ElementRef;

  @HostListener('click') click(): void {
    this.select();
  }

  @HostBinding('attr.disabled')
  public get attrDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('attr.readonly')
  public get attrReadonly(): boolean {
    return this.readonly;
  }

  public onModelChange: Function = () => {};

  public onModelTouched: Function = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.checked = value === this.value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(): void {}

  onChange(event) {
    this.select();
  }

  select() {
    this.checked = true;
    this.radio.nativeElement.checked = true;
    this.onModelChange(this.value);
  }
}
