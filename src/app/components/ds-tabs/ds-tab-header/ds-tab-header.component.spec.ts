import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsTabHeaderComponent } from './ds-tab-header.component';

describe('DsTabHeaderComponent', () => {
  let component: DsTabHeaderComponent;
  let fixture: ComponentFixture<DsTabHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsTabHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
