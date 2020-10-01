import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaFiledropComponent } from './nova-filedrop.component';
import { NovaButtonComponent } from '../nova-button/nova-button.component';

describe('NovaFiledropComponent', () => {
  let component: NovaFiledropComponent;
  let fixture: ComponentFixture<NovaFiledropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaFiledropComponent, NovaButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaFiledropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
