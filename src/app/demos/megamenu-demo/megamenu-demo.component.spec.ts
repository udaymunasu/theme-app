import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegamenuDemoComponent } from './megamenu-demo.component';

describe('MegamenuDemoComponent', () => {
  let component: MegamenuDemoComponent;
  let fixture: ComponentFixture<MegamenuDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegamenuDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MegamenuDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
