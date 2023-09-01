import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDropdownItemComponent } from './ds-dropdown-item.component';

describe('DsDropdownItemComponent', () => {
  let component: DsDropdownItemComponent;
  let fixture: ComponentFixture<DsDropdownItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsDropdownItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
