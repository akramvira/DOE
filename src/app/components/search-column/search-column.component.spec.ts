import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchColumnComponent } from './search-column.component';

describe('SearchColumnComponent', () => {
  let component: SearchColumnComponent;
  let fixture: ComponentFixture<SearchColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
