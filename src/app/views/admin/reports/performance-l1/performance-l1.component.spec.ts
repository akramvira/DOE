import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceL1Component } from './performance-l1.component';

describe('PerformanceL1Component', () => {
  let component: PerformanceL1Component;
  let fixture: ComponentFixture<PerformanceL1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceL1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
