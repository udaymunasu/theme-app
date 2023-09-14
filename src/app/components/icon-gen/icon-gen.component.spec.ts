import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGenComponent } from './icon-gen.component';

describe('IconGenComponent', () => {
  let component: IconGenComponent;
  let fixture: ComponentFixture<IconGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
