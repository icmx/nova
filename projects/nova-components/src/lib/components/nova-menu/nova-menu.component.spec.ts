import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaMenuComponent } from './nova-menu.component';

describe('NovaMenuComponent', () => {
  let component: NovaMenuComponent;
  let fixture: ComponentFixture<NovaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
