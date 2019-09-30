import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsBillsComponent } from './groups-bills.component';

describe('GroupsBillsComponent', () => {
  let component: GroupsBillsComponent;
  let fixture: ComponentFixture<GroupsBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
