import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsTabBodyComponent } from './ds-tab-body.component';

describe('DsTabBodyComponent', () => {
  let component: DsTabBodyComponent;
  let fixture: ComponentFixture<DsTabBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsTabBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsTabBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
