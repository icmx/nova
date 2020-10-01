import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaBannerComponent } from './nova-banner.component';

describe('NovaBannerComponent', () => {
  let component: NovaBannerComponent;
  let fixture: ComponentFixture<NovaBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovaBannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
