import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpintickComponent } from './spintick.component';

describe('SpintickComponent', () => {
  let component: SpintickComponent;
  let fixture: ComponentFixture<SpintickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpintickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpintickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
