import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaDatepickerComponent } from './nova-datepicker.component';

describe('NovaDatepickerComponent', () => {
  let component: NovaDatepickerComponent;
  let fixture: ComponentFixture<NovaDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaDatepickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
