import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovaButtonComponent } from './components/nova-button/nova-button.component';
import { NovaCheckboxComponent } from './components/nova-checkbox/nova-checkbox.component';
import { NovaDatepickerComponent } from './components/nova-datepicker/nova-datepicker.component';
import { NovaDropdownComponent } from './components/nova-dropdown/nova-dropdown.component';
import { NovaFieldComponent } from './components/nova-field/nova-field.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
    NovaDropdownComponent,
    NovaFieldComponent,
  ],
  declarations: [
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
    NovaDropdownComponent,
    NovaFieldComponent,
  ],
})
export class NovaComponentsModule {}
