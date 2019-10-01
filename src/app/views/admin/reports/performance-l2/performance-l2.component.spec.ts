import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceL2Component } from './performance-l2.component';

describe('PerformanceL2Component', () => {
  let component: PerformanceL2Component;
  let fixture: ComponentFixture<PerformanceL2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceL2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
