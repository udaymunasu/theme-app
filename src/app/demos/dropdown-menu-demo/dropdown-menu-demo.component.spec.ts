import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuDemoComponent } from './dropdown-menu-demo.component';

describe('DropdownMenuDemoComponent', () => {
  let component: DropdownMenuDemoComponent;
  let fixture: ComponentFixture<DropdownMenuDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownMenuDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
