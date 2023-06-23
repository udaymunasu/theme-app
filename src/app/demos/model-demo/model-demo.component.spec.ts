import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDemoComponent } from './model-demo.component';

describe('ModelDemoComponent', () => {
  let component: ModelDemoComponent;
  let fixture: ComponentFixture<ModelDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
