import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaFieldComponent } from './nova-field.component';

describe('NovaFieldComponent', () => {
  let component: NovaFieldComponent;
  let fixture: ComponentFixture<NovaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
