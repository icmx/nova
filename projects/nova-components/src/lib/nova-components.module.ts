import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NovaButtonComponent } from './components/nova-button/nova-button.component';
import { NovaCheckboxComponent } from './components/nova-checkbox/nova-checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [NovaButtonComponent, NovaCheckboxComponent],
  declarations: [NovaButtonComponent, NovaCheckboxComponent],
})
export class NovaComponentsModule {}
