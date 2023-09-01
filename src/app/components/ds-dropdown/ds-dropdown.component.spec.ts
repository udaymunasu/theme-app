import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDropdownComponent } from './ds-dropdown.component';

describe('DsDropdownComponent', () => {
  let component: DsDropdownComponent;
  let fixture: ComponentFixture<DsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
