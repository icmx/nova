import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovaBannerComponent } from './components/nova-banner/nova-banner.component';
import { NovaButtonComponent } from './components/nova-button/nova-button.component';
import { NovaCheckboxComponent } from './components/nova-checkbox/nova-checkbox.component';
import { NovaDatepickerComponent } from './components/nova-datepicker/nova-datepicker.component';
import { NovaDropdownComponent } from './components/nova-dropdown/nova-dropdown.component';
import { NovaFieldComponent } from './components/nova-field/nova-field.component';
import { NovaFiledropComponent } from './components/nova-filedrop/nova-filedrop.component';
import { NovaMenuItemComponent } from './components/nova-menu-item/nova-menu-item.component';
import { NovaMenuComponent } from './components/nova-menu/nova-menu.component';
import { NovaRadioComponent } from './components/nova-radio/nova-radio.component';
import { NovaTableSortingIndicatorComponent } from './components/nova-table-sorting-indicator/nova-table-sorting-indicator.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [
    NovaBannerComponent,
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
    NovaDropdownComponent,
    NovaFieldComponent,
    NovaFiledropComponent,
    NovaMenuItemComponent,
    NovaMenuComponent,
    NovaRadioComponent,
    NovaTableSortingIndicatorComponent,
  ],
  declarations: [
    NovaBannerComponent,
    NovaButtonComponent,
    NovaCheckboxComponent,
    NovaDatepickerComponent,
    NovaDropdownComponent,
    NovaFieldComponent,
    NovaFiledropComponent,
    NovaMenuItemComponent,
    NovaMenuComponent,
    NovaRadioComponent,
    NovaTableSortingIndicatorComponent,
  ],
})
export class NovaComponentsModule {}
