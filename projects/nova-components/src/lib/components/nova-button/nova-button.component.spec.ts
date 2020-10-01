import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaButtonComponent } from './nova-button.component';

describe('NovaButtonComponent', () => {
  let component: NovaButtonComponent;
  let fixture: ComponentFixture<NovaButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
