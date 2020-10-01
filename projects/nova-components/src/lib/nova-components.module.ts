import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovaButtonComponent } from './components/nova-button/nova-button.component';
import { NovaCheckboxComponent } from './components/nova-checkbox/nova-checkbox.component';
import { NovaDatepickerComponent } from './components/nova-datepicker/nova-datepicker.component';
import { NovaDropdownComponent } from './components/nova-dropdown/nova-dropdown.component';
import { NovaFieldComponent } from './components/nova-field/nova-field.component';
import { NovaFiledropComponent } from './components/nova-filedrop/nova-filedrop.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
    NovaDropdownComponent,
    NovaFieldComponent,
    NovaFiledropComponent,
  ],
  declarations: [
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
    NovaDropdownComponent,
    NovaFieldComponent,
    NovaFiledropComponent,
  ],
})
export class NovaComponentsModule {}
