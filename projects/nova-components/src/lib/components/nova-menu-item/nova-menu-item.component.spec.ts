import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaMenuItemComponent } from './nova-menu-item.component';

describe('NovaMenuItemComponent', () => {
  let component: NovaMenuItemComponent;
  let fixture: ComponentFixture<NovaMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaMenuItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
