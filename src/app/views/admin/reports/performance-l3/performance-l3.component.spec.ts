import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceL3Component } from './performance-l3.component';

describe('PerformanceL3Component', () => {
  let component: PerformanceL3Component;
  let fixture: ComponentFixture<PerformanceL3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceL3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceL3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
