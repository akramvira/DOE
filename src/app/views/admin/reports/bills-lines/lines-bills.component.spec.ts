import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesBillsComponent } from './lines-bills.component';

describe('LinesBillsComponent', () => {
  let component: LinesBillsComponent;
  let fixture: ComponentFixture<LinesBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
