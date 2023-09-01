import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDropdownInputComponent } from './ds-dropdown-input.component';

describe('DsDropdownInputComponent', () => {
  let component: DsDropdownInputComponent;
  let fixture: ComponentFixture<DsDropdownInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsDropdownInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDropdownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
