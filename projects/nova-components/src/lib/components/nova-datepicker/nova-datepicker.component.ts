import {
  Input,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  forwardRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
} from '@angular/forms';

import { DateLogic, CalendarDateType } from '../common/datelogics/datelogics';
import { Mixin } from '../common/mixin/mixin';
import { Floater, FloaterPosition } from '../common/floater/floater';

@Component({
  providers: [
    DateLogic,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaDatepickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NovaDatepickerComponent),
      multi: true,
    },
  ],
  selector: 'nova-datepicker',
  templateUrl: './nova-datepicker.component.html',
  styleUrls: [
    './nova-datepicker.component.scss',
    '../common/floater/floater.scss',
  ],
})
export class NovaDatepickerComponent
  implements OnInit, ControlValueAccessor, Floater {
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

  public datelogic: DateLogic;

  @Input()
  public set value(value: any) {
    this.datelogic.value = value;
  }

  public get value(): any {
    return this.datelogic.value;
  }

  public get label(): string {
    return this.datelogic.label;
  }

  @Input()
  public placeholder: string = 'Pick a date';

  @Input()
  public datesDisabled: Array<Date> = [];

  @Input()
  public dateMin: Date = new Date(2017, 0, 1);

  @Input()
  public dateMax: Date = new Date(2021, 0, 1);

  @Input()
  public dateValueType: CalendarDateType = 'internal';

  @Input()
  public dateLabelType: CalendarDateType = 'string-local';

  @Output()
  public changed: EventEmitter<Date> = new EventEmitter<Date>();

  public bottomSlideShown: boolean = false;

  private _onTouchedCallback: (value: Date) => void = () => {};
  private _onChangeCallback: (value: Date) => void = () => {};

  public writeValue(value: Date): void {
    if (value) {
      this.value = value;
    }
  }

  public selectDate(date: Date): void {
    this.value = date;
    this._onChangeCallback(this.value);
    this._onTouchedCallback(this.value);
    this.changed.emit(date);
    this.collapseBodyAfterItemSelected();
  }

  public clearDate(event: any): void {
    if (this.value) {
      this.selectDate(null);
      event.stopPropagation();
    }
  }

  public registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {}

  onChange: any = () => {};
  onTouched: any = () => {};

  public constructor() {
    this.datelogic = new DateLogic();
    this.datelogic.init(
      this.value,
      'Year',
      'Month',
      'Date',
      'Date',
      'Today',
      'Current',
      'Current',
      'Choose a date',
      [0, 6],
      1,
      this.datesDisabled,
      this.dateMin,
      this.dateMax,
      this.dateValueType,
      this.dateLabelType
    );
  }

  public ngOnInit(): void {
    Mixin.Apply(NovaDatepickerComponent, [Floater]);
    this.initAsFloater();
  }

  public monthPrev() {
    this.datelogic.guiUpdateMonthPrev();
  }

  public monthSet(value: number) {
    this.datelogic.guiUpdateMonthSet(value);
  }

  public monthNext() {
    this.datelogic.guiUpdateMonthNext();
  }

  public yearPrev() {
    this.datelogic.guiUpdateYearPrev();
  }

  public yearSet(value: number) {
    this.datelogic.guiUpdateYearSet(value);
  }

  public yearNext() {
    this.datelogic.guiUpdateYearNext();
  }

  public validate(formControl: FormControl): boolean {
    return formControl.value !== this.value;
  }
}
