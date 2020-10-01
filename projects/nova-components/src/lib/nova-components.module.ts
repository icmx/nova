import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovaButtonComponent } from './components/nova-button/nova-button.component';
import { NovaCheckboxComponent } from './components/nova-checkbox/nova-checkbox.component';
import { NovaDatepickerComponent } from './components/nova-datepicker/nova-datepicker.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
  ],
  declarations: [
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
  ],
})
export class NovaComponentsModule {}
