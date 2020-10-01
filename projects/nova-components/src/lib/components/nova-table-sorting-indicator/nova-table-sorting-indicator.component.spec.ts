import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaTableSortingIndicatorComponent } from './nova-table-sorting-indicator.component';

describe('NovaTableSortingIndicatorComponent', () => {
  let component: NovaTableSortingIndicatorComponent;
  let fixture: ComponentFixture<NovaTableSortingIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaTableSortingIndicatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaTableSortingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide right class names depending on its state', () => {
    expect(component.class).toBe('unselected undefined');

    component.selected = true;
    component.direction = true;

    expect(component.class).toBe('selected ascending');
  });
});
